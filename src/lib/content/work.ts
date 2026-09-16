export type ProjectModel =
    | "chat"
    | "retrieval"
    | "analyst"
    | "travel"
    | "video"
    | "face"
    | "chain"
    | "token";

export type ProjectIcon =
    | "conversationalAi"
    | "documentAi"
    | "dataAnalytics"
    | "computerVision"
    | "aiAgents"
    | "blockchain"
    | "web3"
    | "aiGateway";

export const completedProjects: Array<{
    title: string;
    category: string;
    description: string;
    icon: ProjectIcon;
    model: ProjectModel;
    /** Topic image in `public/projects`. Falls back to the isometric model when absent. */
    image?: string;
}> = [
    {
        title: "AI-Driven Rasa Chatbot",
        category: "Conversational AI",
        description:
            "A production Rasa-based chatbot handling multi-turn conversations with intent recognition and CRM handoff.",
        icon: "conversationalAi",
        model: "chat",
        image: "/projects/rasa-chatbot.jpg",
    },
    {
        title: "Calander App",
        category: "Conversational AI",
        description:
            "Retrieval-augmented chatbot grounded in a private knowledge base, giving accurate, sourced answers.",
        icon: "documentAi",
        model: "retrieval",
        image: "/projects/rag-chatbot.jpg",
    },
    {
        title: "RAG Chatbot",
        category: "Conversational AI",
        description:
            "Retrieval-augmented chatbot grounded in a private knowledge base, giving accurate, sourced answers.",
        icon: "documentAi",
        model: "retrieval",
        image: "/projects/rag-chatbot.jpg",
    },
    {
        title: "Financial AI Analyst",
        category: "Data Analytics",
        description:
            "An AI analyst that reads financial documents and market data to generate structured, reviewable insights.",
        icon: "dataAnalytics",
        model: "analyst",
        image: "/projects/financial-analyst.jpg",
    },
    {
        title: "AI Travel Companion",
        category: "Conversational AI",
        description:
            "A conversational planning assistant that builds itineraries and answers travel questions in real time.",
        icon: "conversationalAi",
        model: "travel",
        image: "/projects/travel-companion.jpg",
    },
    {
        title: "Video AI Summarizer",
        category: "Computer Vision",
        description:
            "Automatically condenses long-form video into key moments and searchable text summaries.",
        icon: "computerVision",
        model: "video",
        image: "/projects/video-summarizer.jpg",
    },
    {
        title: "Canteen Management (Face Recognition)",
        category: "Computer Vision",
        description:
            "A face-recognition-based check-in and billing system for canteen management at scale.",
        icon: "computerVision",
        model: "face",
        image: "/projects/canteen-management.jpg",
    },
    {
        title: "Blockchain App Development",
        category: "Blockchain",
        description:
            "A full-stack blockchain application built for transparent, verifiable record-keeping.",
        icon: "blockchain",
        model: "chain",
        image: "/projects/blockchain-app.jpg",
    },
    {
        title: "Document Tokenization System",
        category: "Blockchain",
        description:
            "A system for tokenizing documents on-chain, giving each one a verifiable, tamper-evident identity.",
        icon: "web3",
        model: "token",
        image: "/projects/document-tokenization.jpg",
    },
];

export const experimentalProjects: Array<{
    title: string;
    description: string;
    icon: "slm" | "documentAi";
}> = [
    {
        title: "SLM using LSTM",
        description:
            "An R&D trial building a small language model on an LSTM backbone to test lightweight, low-latency inference.",
        icon: "slm",
    },
    {
        title: "AI Agent for Engineering Drawing QA",
        description:
            "An experimental agent that reviews engineering drawings against spec and flags discrepancies automatically.",
        icon: "documentAi",
    },
];

export const wipProjects: Array<{
    title: string;
    description: string;
    icon: "aiGateway";
}> = [
    {
        title: "Secure AI Gateway System",
        description:
            "A governed gateway layer for routing, auditing, and securing enterprise AI model calls — currently in active development.",
        icon: "aiGateway",
    },
];
