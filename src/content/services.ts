export type Service = {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  offerings: string[];
  stack: string[];
};

export const services: Service[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    summary: "Business software built around the way your team actually works.",
    overview:
      "We design and build software that fits your processes instead of forcing you into someone else's. From internal tools to full product platforms, we take ownership from discovery through launch and long-term support.",
    offerings: [
      "Product discovery and requirements",
      "Internal tools and admin portals",
      "ERP, CRM and workflow systems",
      "Legacy system modernisation",
      "Third-party API integrations",
      "Maintenance and support retainers",
    ],
    stack: ["TypeScript", "Node.js", "Python", "Java", "PostgreSQL"],
  },
  {
    slug: "web-development",
    title: "Web Development",
    summary: "Fast, search-friendly websites and web apps that convert.",
    overview:
      "Marketing sites, customer portals and SaaS products built on modern frameworks. Every build is responsive, accessible and tuned for Core Web Vitals so it ranks well and loads fast on any device.",
    offerings: [
      "Corporate and marketing websites",
      "Web applications and dashboards",
      "E-commerce storefronts",
      "Headless CMS setups",
      "Performance and SEO tuning",
      "Accessibility audits",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Node.js", "Vercel"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    summary: "iOS and Android apps your customers keep coming back to.",
    overview:
      "Cross-platform and native mobile apps with polished interfaces, offline support and reliable backends. We handle the full release process, from design to store submission.",
    offerings: [
      "Cross-platform apps (React Native, Flutter)",
      "Native iOS and Android",
      "App backends and APIs",
      "Push notifications and analytics",
      "App Store and Play Store releases",
      "Ongoing updates and monitoring",
    ],
    stack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    summary: "Infrastructure that scales without surprising your bill.",
    overview:
      "We migrate, automate and operate cloud infrastructure so releases are routine and outages are rare. Expect infrastructure as code, CI/CD pipelines and monitoring you can read.",
    offerings: [
      "Cloud migration and architecture",
      "CI/CD pipelines",
      "Infrastructure as code",
      "Containers and Kubernetes",
      "Monitoring and alerting",
      "Cost optimisation reviews",
    ],
    stack: ["AWS", "Azure", "Google Cloud", "Docker", "Terraform"],
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    summary: "Put AI to work on the repetitive parts of your business.",
    overview:
      "Practical AI that saves hours: chat assistants trained on your knowledge base, document processing, lead qualification and workflow automation connected to the tools you already use.",
    offerings: [
      "AI chat assistants and chatbots",
      "Document extraction and processing",
      "Workflow and RPA automation",
      "Retrieval over company knowledge",
      "Data pipelines and reporting",
      "AI readiness assessment",
    ],
    stack: ["Claude", "Python", "LangGraph", "n8n", "Vector databases"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    summary: "Interfaces that are clear, consistent and easy to use.",
    overview:
      "Research-led product design that turns complex workflows into simple screens. We deliver clickable prototypes and a design system your developers can build from directly.",
    offerings: [
      "User research and journey mapping",
      "Wireframes and prototypes",
      "Visual and brand design",
      "Design systems",
      "Usability testing",
      "Design-to-code handoff",
    ],
    stack: ["Figma", "FigJam", "Framer", "Storybook"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
