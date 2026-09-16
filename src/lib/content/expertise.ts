export interface ExpertiseArea {
  slug: string;
  icon: "aiMl" | "blockchain" | "llm" | "slm" | "dataAnalytics";
  title: string;
  summary: string;
  description: string;
}

export const expertiseAreas: ExpertiseArea[] = [
  {
    slug: "ai-ml",
    icon: "aiMl",
    title: "AI / Machine Learning",
    summary: "Custom models that learn from your data and get sharper over time.",
    description:
      "We design, train, and deploy machine learning systems tailored to your data and business logic — from predictive models to recommendation engines — built to run reliably in production, not just in a notebook.",
  },
  {
    slug: "blockchain",
    icon: "blockchain",
    title: "Blockchain",
    summary: "Transparent, tamper-proof systems for records, assets, and trust.",
    description:
      "We build blockchain applications and smart contracts for organizations that need verifiable records, asset tokenization, or decentralized trust — from architecture through audit-ready deployment.",
  },
  {
    slug: "llms",
    icon: "llm",
    title: "Large Language Models (LLMs)",
    summary: "Conversational and reasoning systems grounded in your knowledge base.",
    description:
      "We integrate and fine-tune large language models for chat, retrieval-augmented generation, and document intelligence — connecting them securely to your own data so answers stay accurate and on-brand.",
  },
  {
    slug: "data-analytics",
    icon: "dataAnalytics",
    title: "Data Analytics",
    summary: "Dashboards and pipelines that turn raw data into decisions.",
    description:
      "We build the pipelines, warehouses, and BI dashboards that turn scattered operational data into a single source of truth your team can actually act on.",
  },
];
