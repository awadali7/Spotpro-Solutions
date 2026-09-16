export interface Service {
  slug: string;
  icon: "conversationalAi" | "computerVision" | "aiAgents" | "documentAi" | "aiGateway" | "web3";
  title: string;
  summary: string;
  description: string;
  capabilities: string[];
}

export const services: Service[] = [
  {
    slug: "conversational-ai",
    icon: "conversationalAi",
    title: "Conversational AI",
    summary: "Chatbots and voice assistants that actually resolve queries.",
    description:
      "We design and deploy conversational agents — chat and voice — that understand context, hold a conversation, and hand off cleanly to a human when they should.",
    capabilities: [
      "Custom chatbot design & deployment (Rasa, RAG-based, LLM-native)",
      "Multi-turn context and memory handling",
      "Integration with CRMs, helpdesks, and internal tools",
      "Analytics on conversation quality and deflection rate",
    ],
  },
  {
    slug: "computer-vision",
    icon: "computerVision",
    title: "Computer Vision",
    summary: "Systems that see — detection, recognition, and visual QA.",
    description:
      "From face recognition to automated visual inspection, we build vision systems that turn camera and image data into real-time operational signals.",
    capabilities: [
      "Object & face detection/recognition",
      "Automated visual quality inspection",
      "Video summarization and analysis",
      "Edge and real-time inference pipelines",
    ],
  },
  {
    slug: "ai-agents-automation",
    icon: "aiAgents",
    title: "AI Agents & Automation",
    summary: "Autonomous agents that carry out multi-step work end to end.",
    description:
      "We design agentic systems that plan, use tools, and execute multi-step workflows — reducing manual handling on repetitive, judgment-light tasks.",
    capabilities: [
      "Task-planning and tool-using AI agents",
      "Workflow and back-office automation",
      "Human-in-the-loop approval flows",
      "Agent monitoring and guardrails",
    ],
  },
  {
    slug: "document-ai",
    icon: "documentAi",
    title: "Document AI",
    summary: "Extraction, classification, and QA over unstructured documents.",
    description:
      "We build systems that read, classify, and extract structured data from documents — contracts, drawings, forms — with review workflows for edge cases.",
    capabilities: [
      "Document extraction and classification",
      "Engineering drawing / technical document QA",
      "Financial document analysis",
      "Searchable, tokenized document systems",
    ],
  },
  {
    slug: "ai-gateway-security",
    icon: "aiGateway",
    title: "AI Gateway & Security",
    summary: "A secure, governed layer between your systems and AI providers.",
    description:
      "We build gateway infrastructure that governs how your organization calls AI models — auth, rate limiting, audit logging, and data-handling policy in one place.",
    capabilities: [
      "Secure AI Gateway architecture",
      "Access control, auditing, and rate limiting",
      "Data privacy & compliance guardrails",
      "Multi-provider model routing",
    ],
  },
  {
    slug: "blockchain-web3",
    icon: "web3",
    title: "Blockchain & Web3",
    summary: "Smart contracts, tokenization, and decentralized applications.",
    description:
      "We design and ship blockchain applications — from smart contracts to full dApps — for organizations that need verifiable, decentralized systems.",
    capabilities: [
      "Smart contract development & audit support",
      "Asset & document tokenization",
      "dApp architecture and deployment",
      "Wallet and identity integration",
    ],
  },
];
