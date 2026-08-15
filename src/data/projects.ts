
export type Project = {
  slug: string;
  year: string;
  title: string;
  summary: string;
  stack: string[];
  image: string;
  video?: string;
  context: string;
  overview: string;
  details: string[];
  role?: string;
  outcome?: string;
};

export const projects: Project[] = [
  {
    slug: "voice-controlled-mouse-keyboard",
    year: "2025",
    title: "Voice-Controlled Mouse & Keyboard",
    context: "University of Pretoria",
    summary:
      "An embedded system designed as a human input device that leverages real-time computer vision, voice command recognition, and USB HID emulation to replace the traditional mouse and keyboard.",
    stack: ["Embedded", "Khadas Vim 4", "DSP", "STM32","LTSpice","I2S","UART", "USB Communication Protocol","Hardware Acceleration",  "Python", "C", "C++"],
    image: "/api/media/Voice_Controlled_MK.jpeg",
    video: "/api/media/Project_Demo_Video.mp4",
    overview:
      "This embedded system was developed to replace the traditional mouse and keyboard by leveraging real-time computer vision and speech recognition. Through USB Human Interface Device (HID) emulation, the system presents itself to Windows 11 as a standard USB mouse and keyboard, enabling seamless integration with the operating system.",
    details: [
      "The system was designed as a distributed embedded platform consisting of four primary subsystems: speech recognition, computer vision, command identification, and USB HID emulation.",
      "The speech recognition subsystem was developed from first principles, beginning with a custom-designed audio interface. The hardware consisted of a hand-built microphone pre-amplifier with USB audio output, designed and validated using LTspice before implementation. The interface captured 24-bit audio and maintained real-time performance through I²S and USB Audio while incorporating fixed analogue gain, anti-aliasing filters, and configurable digital gain and filtering. Audio captured by the interface was processed using Gaussian Hidden Markov Models (GHMMs) for keyword spotting before the recognized speech was normalized and forwarded to the command identification subsystem.",
      "The command identification subsystem translated recognized speech into executable commands. To improve contextual understanding, it incorporated information from the computer vision subsystem, allowing commands to be interpreted relative to the current state of the target application's user interface.",
      "The computer vision subsystem was implemented entirely from scratch and employed a custom image-processing pipeline incorporating image resizing, edge detection, connected-component labelling, and a custom Union-Find algorithm to identify interface elements such as icons, text, and input fields. Screen data was streamed to the Khadas VIM4 over a low-latency UDP connection using the Real-time Transport Protocol (RTP), where the vision pipeline executed under Ubuntu 22.04 Linux. Custom Linux configuration and multimedia components were developed to enable reliable real-time video capture and processing.",
      "Once a command had been identified, it was transmitted to an STM32F429 Discovery board responsible for USB Human Interface Device (HID) emulation. The firmware translated high-level commands into sequences of USB HID reports, allowing Windows 11 to interpret the device as a standard mouse and keyboard while executing the requested user interactions in real time.",
      "The project was implemented across multiple programming environments. The audio interface firmware and embedded components were developed in C++, while the higher-level speech recognition, computer vision, and command identification subsystems were hosted on the Khadas VIM4 and implemented primarily in Python. LTspice was used to simulate and validate the analogue circuitry, while GitHub and Google Drive were used for version control, documentation, and project collaboration.",
    ],
    role: "Student researcher — embedded systems, computer vision, and speech recognition.",
    outcome:
        "Delivered a fully integrated embedded system combining speech recognition, computer vision, and USB HID emulation into a functional alternative human-computer interface.",
  },
  {
    slug: "marv-race-car",
    year: "2024",
    title: "MARV Race Car",
    context: "University of Pretoria",
    summary:
      "A multicolour line-following robot designed and built from first principles for autonomous navigation, featuring custom optical sensors and embedded firmware developed entirely in Assembly on a PIC18F45K22.",
    stack: ["MPLABX", "PIC18", "Fusion 360", "LTSpice", "Assembly"],
    image: "/api/media/Robot_car.png",
    video: "/api/media/Multi_colour_automnoumous_line_follwoign_robot.mp4",
    overview:
      "This project involved the end-to-end design and implementation of an autonomous line-following robot capable of identifying and tracking coloured paths using custom-built optical sensors. Every major subsystem—including the sensing hardware, analogue electronics, embedded firmware, mechanical chassis, and control system—was designed and developed from first principles, providing experience across embedded systems, robotics, electronics, control engineering, and mechanical design.",
    details: [
      "The MARV was built around a PIC18F45K22 microcontroller, with all embedded firmware developed entirely in Assembly using MPLAB X. The firmware coordinated every aspect of the robot, including sensor acquisition, colour classification, motor control, and peripheral management. Hardware peripherals such as the ADC, timers, interrupts, PWM modules, and GPIO were extensively utilised to provide deterministic, real-time control of the system.",
      "A significant portion of the project focused on developing the optical sensing system from first principles. Each of the three sensing modules consisted of three RGB LEDs and a photodiode housed within a custom-designed 3D-printed enclosure created in Fusion 360. The RGB LEDs were illuminated sequentially while the photodiode sampled the reflected light from each colour independently. These measurements were then processed to classify the colour beneath each sensor. To ensure reliable operation under varying ambient lighting conditions, a calibration routine was developed that characterised the response of every RGB LED and photodiode combination before operation. The supporting analogue circuitry, including the signal conditioning electronics, was designed, simulated in LTspice, and assembled by hand.",
      "The robot utilised three independently calibrated colour sensors to detect and track a coloured path. A proportional closed-loop controller continuously adjusted the speed of two independently driven DC motors through a TC1508A H-bridge motor driver, ensuring that the target colour remained centred beneath the middle sensor. Although the robot prioritised precision over speed, its exceptional tracking accuracy earned it a **Special Mention** during the EMK310 MARV Race.",
      "Beyond autonomous navigation, additional subsystems were integrated to enhance the platform. A Bluetooth module was interfaced with a custom analogue gain circuit that drove a pair of speakers, while the robot's chassis and sensor housings were designed from scratch in Fusion 360 and manufactured using 3D printing. The project brought together embedded firmware, analogue electronics, mechanical design, robotics, and control engineering into a single autonomous embedded platform."
    ],
    role: "Embedded systems engineer responsible for firmware development, sensor design, analogue electronics, CAD modelling, and full system integration.",
    outcome: "Successfully delivered a fully autonomous robotic platform capable of robust colour tracking across varying lighting conditions. The project received a Special Mention during the EMK310 MARV Race for its exceptional tracking accuracy.",
  },
  {
    slug: "fpga-signal-processing",
    year: "2025",
    title: "FPGA Signal Processing",
    context: "University of Pretoria",
    summary:
      "A custom FPGA-based memory subsystem implementing synchronous random access memory (RAM), a UART communication controller, and a host interface entirely from first principles on a DE0-Nano FPGA.",
    stack: ["Quartus", "UART Bridge", "Verilog", "Python"],
    image: "/api/media/FPGA.jpeg",
    video: "/api/media/FPGA_Demo_Video.mp4",
    overview:
      "A from-first-principles FPGA design that exposes on-chip memory over UART, providing a real-time bridge for host-driven signal processing experiments.",
    details: [
      "This project involved the design and implementation of a complete FPGA-based memory subsystem on a DE0-Nano using Verilog. Every major hardware component including the synchronous RAM architecture, memory controller, address decoder, and UART communication controller was developed from first principles. The design implemented 256 bytes of single-port synchronous RAM using thirty-two 8 × 8 × 1 memory blocks and supported independent read and write access to the least significant nibble, most significant nibble, or the complete 8-bit word through custom control and address decoding logic.",
      "A custom UART transmitter and receiver were implemented as finite state machines to provide serial communication with a host computer through a USB-to-UART bridge. The UART subsystem was developed and validated independently before being integrated with the memory controller, allowing the baud rate timing and communication reliability to be refined to achieve accurate and robust serial communication. Once integrated, a Python command-line interface was developed to issue interactive read and write commands over the serial connection, enabling real-time validation of memory transactions between the host computer and the FPGA.",
      "The project provided practical experience in digital logic design, RTL development, finite state machines, synchronous memory architecture, communication protocols, FPGA verification, and hardware/software integration, demonstrating the complete workflow from digital design and simulation to deployment on physical hardware."
    ],
    role: "Digital designer — RTL, verification, host tooling.",
    outcome: "Successfully implemented and verified a fully functional FPGA-based memory subsystem capable of interactive UART-controlled memory access from a host computer.",
  }, 
  {
    slug: "personal-website",
    year: "2026",
    title: "Personal Website for CV and Portfolio",
    context: "React · Node",
    summary:
      "A responsive portfolio and CV website showcasing my engineering projects through modern web technologies, interactive design, and an AI-assisted development workflow.",
    stack: ["React", "Node.js", "Lovable", "GIT"],
    image: "/api/media/Screenshot_212452.png",
    video: "/api/media/Website_Recording_Final_2.mp4",
    overview:
      "A personal portfolio and CV site built on a modern React stack, tuned for a pleasent user experience, showcasing my engineering project, a dash of my personality and a glimpse into my capabilities as an engineer. ",
    details: [
      "The website was developed using React 19, TanStack Start, Vite, and TypeScript, with a component-driven architecture that prioritises maintainability, reusability, and scalability. Reusable UI primitives and modern frontend practices were employed throughout the application to simplify future expansion while maintaining a consistent user experience across all sections.",
      "Considerable attention was given to the user experience and visual identity of the site. Custom animations, scroll-driven transitions, and a progressively evolving visual theme were implemented to create an engaging browsing experience while preserving responsiveness and accessibility across desktop and mobile devices.",
      "AI-assisted development tools, including GitHub Copilot, ChatGPT, and Lovable, were incorporated throughout the design and implementation process to accelerate prototyping, explore alternative solutions, and streamline repetitive development tasks. Every generated component and implementation was reviewed, refined, and integrated manually to ensure code quality, maintainability, and alignment with the project's architectural goals.",
      "The website continues to evolve as I explore new technologies, refine the user experience, and expand its functionality. One of my professors once remarked that if engineers are left to themselves, they will continue to refine, redesign, and optimize a system in pursuit of perfection. This project embraces that philosophy, not because perfection is attainable, but because every iteration is an opportunity to build something better."
    ],
    role: "Designer and engineer.",
    outcome: "The site you're reading right now.",
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);