import { IconBase, type IconProps } from "./icon-base";

/** Expertise: AI / Machine Learning — connected network nodes */
export function AiMlIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="6" cy="6" r="2.25" />
      <circle cx="18" cy="6" r="2.25" />
      <circle cx="12" cy="13" r="2.5" />
      <circle cx="6" cy="19" r="2.25" />
      <circle cx="18" cy="19" r="2.25" />
      <path d="M7.9 7.3 10 11.2M16.1 7.3 14 11.2M10.1 14.9 7.9 17.6M13.9 14.9l2.2 2.7" />
    </IconBase>
  );
}

/** Expertise / Services: Blockchain — linked blocks */
export function BlockchainIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="7" height="7" rx="1.5" />
      <rect x="14" y="4" width="7" height="7" rx="1.5" />
      <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 7.5h4M6.5 11v2.5a1.5 1.5 0 0 0 1.5 1.5h.5M17.5 11v2.5a1.5 1.5 0 0 1-1.5 1.5h-.5" />
    </IconBase>
  );
}

/** Expertise: LLMs — chat bubble generating text */
export function LlmIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9A1.5 1.5 0 0 1 18.5 16H10l-4 4v-4H5.5A1.5 1.5 0 0 1 4 14.5z" />
      <path d="M8 8.5h8M8 11.5h5" />
    </IconBase>
  );
}

/** Expertise: SLMs — compact chip / small model */
export function SlmIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9.5 7V4M14.5 7V4M9.5 20v-3M14.5 20v-3M7 9.5H4M7 14.5H4M20 9.5h-3M20 14.5h-3" />
      <circle cx="12" cy="12" r="1.75" />
    </IconBase>
  );
}

/** Expertise: Data Analytics — bar chart with trend line */
export function DataAnalyticsIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 20V10M10 20V6M16 20v-7M21 20H3" />
      <path d="M5 9.5 10 5l3.5 3L21 5" />
    </IconBase>
  );
}

/** Service: Conversational AI — chat bubble with waveform */
export function ConversationalAiIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v6a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 12.5z" />
      <path d="M8 9v3M11 7.5v6M14 8.5v4M17 9.5v2" />
    </IconBase>
  );
}

/** Service: Computer Vision — scanning eye */
export function ComputerVisionIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M4 4l2.5 2.5M20 4l-2.5 2.5" />
    </IconBase>
  );
}

/** Service: AI Agents & Automation — gear with spark */
export function AiAgentsIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="13" r="4" />
      <path d="M11 6.5V5M11 21v-1.5M5.5 13H4M18 13h-1.5M6.8 8.3 5.7 7.2M16.3 8.3l1.1-1.1" />
      <path d="M18.5 3.5 19.3 5.7 21.5 6.5 19.3 7.3 18.5 9.5 17.7 7.3 15.5 6.5 17.7 5.7Z" />
    </IconBase>
  );
}

/** Service: Document AI — scanned document */
export function DocumentAiIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path d="M14 3.5V8h4" />
      <path d="M8.5 13h7M8.5 16h4.5" />
      <circle cx="16.5" cy="16.5" r="2" />
      <path d="m19 19-1.2-1.2" />
    </IconBase>
  );
}

/** Service: AI Gateway / Security — shield with circuit */
export function AiGatewayIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3.5 19 6.5V11c0 4.5-3 7.8-7 9.5-4-1.7-7-5-7-9.5V6.5Z" />
      <path d="M9 12h1.5V9.5M12 12h3M12 12v3" />
      <circle cx="9" cy="12" r=".9" />
      <circle cx="15" cy="12" r=".9" />
      <circle cx="12" cy="15" r=".9" />
    </IconBase>
  );
}

/** Service: Blockchain & Web3 — globe with links */
export function Web3Icon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5Z" />
    </IconBase>
  );
}

export const expertiseIcons = {
  aiMl: AiMlIcon,
  blockchain: BlockchainIcon,
  llm: LlmIcon,
  slm: SlmIcon,
  dataAnalytics: DataAnalyticsIcon,
} as const;

export const serviceIcons = {
  conversationalAi: ConversationalAiIcon,
  computerVision: ComputerVisionIcon,
  aiAgents: AiAgentsIcon,
  documentAi: DocumentAiIcon,
  aiGateway: AiGatewayIcon,
  web3: Web3Icon,
} as const;
