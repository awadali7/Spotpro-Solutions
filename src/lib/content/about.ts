export const whoWeAre = {
  /** Single-sentence version, used for the home page's typewriter paragraph. */
  oneLine:
    "SpotPro Solutions builds applied AI, blockchain, and data intelligence systems spanning machine learning, language models, computer vision, and data engineering, designed around the problem rather than the tool and built to keep working long after launch.",
  short:
    "SpotPro Solutions is an AI, blockchain, and data intelligence studio — we design and ship systems that turn raw data and language into working products.",
  long: [
    "SpotPro Solutions builds applied AI, blockchain, and data intelligence systems for organizations that need more than a proof of concept. We work across the stack — from model selection and data pipelines to production deployment and monitoring — so what we ship keeps working after launch.",
    "Our team spans machine learning, large and small language models, computer vision, blockchain engineering, and data analytics. That breadth lets us design solutions around the problem rather than forcing every project through the same tool.",
  ],
};

export const vision =
  "A world where every organization can put trustworthy, well-governed AI and decentralized systems to work — without needing an in-house research lab to do it.";

export const mission =
  "To design and deliver AI, blockchain, and data solutions that are technically sound, ethically built, and genuinely useful in production — not just in a demo.";

export interface CoreValue {
  title: string;
  description: string;
}

export const coreValues: CoreValue[] = [
  {
    title: "Innovation",
    description: "We track and apply emerging AI and blockchain techniques deliberately, not for their own sake.",
  },
  {
    title: "Ethics",
    description: "We build systems with clear data handling, transparency, and accountability built in from day one.",
  },
  {
    title: "People-Centric Approach",
    description: "Every system we build is designed around the people who'll actually use and maintain it.",
  },
  {
    title: "Sustainability",
    description: "We favor efficient models and architectures that scale sensibly, not just impressively in a demo.",
  },
  {
    title: "Growth Mindset",
    description: "We treat every engagement as a chance to get sharper — for our team and for our clients' teams.",
  },
  {
    title: "Excellence",
    description: "We hold our own delivery to the same bar we'd expect from a system we depend on ourselves.",
  },
];
