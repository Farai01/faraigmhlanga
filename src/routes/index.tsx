import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Projects } from "@/components/site/Projects";
import { Experience } from "@/components/site/Experience";
import { Beyond } from "@/components/site/Beyond";
import { Community } from "@/components/site/Community";
import { Contact, Footer } from "@/components/site/Contact";
import { ScrollAtmosphere } from "@/components/site/ScrollAtmosphere";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Farai Mhlanga",
    jobTitle: "Computer Engineer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Pretoria",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pretoria",
      addressCountry: "ZA",
    },
    knowsAbout: [
      "Systems Engineering",
      "Embedded Systems",
      "Backend Engineering",
      "Cloud Engineering",
      "Digital Signal Processing",
      "FPGA",
    ],
  };

  return (
    <div className="relative min-h-screen text-foreground noise">
    <ScrollAtmosphere /> 
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Beyond />
        <Community />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </div>
  );
}
