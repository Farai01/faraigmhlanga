import { env } from "cloudflare:workers";

import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, _env: Env, ctx: ExecutionContext){
    const url = new URL(request.url);

    // Intercept media requests
    if (url.pathname.startsWith("/api/media/")) {
      try {
        const filename = decodeURIComponent(url.pathname.replace("/api/media/", ""));
        const bucket = (env as unknown as Env).my_media;

        if (!bucket) {
          return new Response("R2 Binding not found", { status: 500 });
        }

        const head = await bucket.head(filename);
        if (head === null) {
          return new Response("Media not found", { status: 404 });
        }

        const totalSize = head.size;
        const rangeHeader = request.headers.get("range");

        const commonHeaders = new Headers();
        head.writeHttpMetadata(commonHeaders);
        commonHeaders.set("etag", head.httpEtag);
        commonHeaders.set("accept-ranges", "bytes");

        if (!rangeHeader) {
          const object = await bucket.get(filename);
          if (object === null) {
            return new Response("Media not found", { status: 404 });
          }
          commonHeaders.set("content-length", totalSize.toString());
          return new Response(object.body, { status: 200, headers: commonHeaders });
        }

        const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
        if (!match) {
          return new Response("Malformed Range header", { status: 416 });
        }

        let start = match[1] ? parseInt(match[1], 10) : undefined;
        let end = match[2] ? parseInt(match[2], 10) : undefined;

        if (start === undefined && end === undefined) {
          return new Response("Malformed Range header", { status: 416 });
        }

        if (start === undefined) {
          start = totalSize - (end as number);
          end = totalSize - 1;
        } else if (end === undefined) {
          end = totalSize - 1;
        }

        if (start > end || start < 0 || end >= totalSize) {
          return new Response("Range not satisfiable", {
            status: 416,
            headers: { "content-range": `bytes */${totalSize}` },
          });
        }

        const object = await bucket.get(filename, {
          range: { offset: start, length: end - start + 1 },
        });

        if (object === null) {
          return new Response("Media not found", { status: 404 });
        }

        commonHeaders.set("content-range", `bytes ${start}-${end}/${totalSize}`);
        commonHeaders.set("content-length", (end - start + 1).toString());

        return new Response(object.body, { status: 206, headers: commonHeaders });
      } catch (error) {
        console.error("Media handler error:", error);
        return new Response(
          `Media handler error: ${error instanceof Error ? error.message : String(error)}`,
          { status: 500 },
        );
      }
    }

    // Fallback to TanStack Start's SSR handler
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};