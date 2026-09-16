import type { ProjectModel } from "@/lib/content/work";

/**
 * Isometric project models, one per project heading, drawn as flat SVG.
 *
 * Deliberately not WebGL: `PROJECT-STATE.md` sandboxes three.js to `HeroScene`
 * because a single canvas costs ~430ms of main thread, and eight of these are
 * on screen at once. True isometric projection plus per-face gradients, edge
 * highlights and a contact shadow read as 3D for nothing at runtime, and these
 * stay Server Components.
 *
 * Axes are true isometric: +x runs right-down, +z left-down, +y straight up.
 * Compose new models from `Cuboid` so the projection stays consistent.
 */

const COS = 0.866;

type Tone = "light" | "accent" | "dim";

/**
 * Glass tones. Faces are translucent so the card's own gradient shows through
 * and the model reads as lit from inside the card rather than pasted on it;
 * the luminous edge is what gives the form away. Edges are drawn as a wide
 * low-opacity stroke under a thin bright one — a fake bloom that costs nothing,
 * where an SVG blur filter would cost real paint time across eight models.
 */
const TONES: Record<Tone, { t: string; l: string; r: string; edge: string }> = {
  light: {
    t: "rgba(186,230,253,.34)",
    l: "rgba(125,190,235,.20)",
    r: "rgba(90,150,205,.13)",
    edge: "#BAE6FD",
  },
  accent: {
    t: "rgba(21,216,179,.42)",
    l: "rgba(16,180,150,.26)",
    r: "rgba(10,140,118,.17)",
    edge: "#5CF2D6",
  },
  dim: {
    t: "rgba(148,197,235,.22)",
    l: "rgba(100,150,200,.14)",
    r: "rgba(70,110,160,.09)",
    edge: "#93C5FD",
  },
};

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <radialGradient id={`${id}-shadow`}>
        <stop offset="0%" stopColor="#041020" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#041020" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function Cuboid({
  cx,
  cy,
  w,
  d,
  h,
  tone = "light",
}: {
  id?: string;
  cx: number;
  cy: number;
  w: number;
  d: number;
  h: number;
  tone?: Tone;
}) {
  const p0: [number, number] = [cx, cy];
  const p1: [number, number] = [cx + COS * w, cy + w / 2];
  const p2: [number, number] = [cx + COS * w - COS * d, cy + w / 2 + d / 2];
  const p3: [number, number] = [cx - COS * d, cy + d / 2];
  const c = TONES[tone];

  const top = [p0, p1, p2, p3].map((p) => p.join(",")).join(" ");
  const left = `${p3[0]},${p3[1]} ${p2[0]},${p2[1]} ${p2[0]},${p2[1] + h} ${p3[0]},${p3[1] + h}`;
  const right = `${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p2[0]},${p2[1] + h} ${p1[0]},${p1[1] + h}`;
  const edges =
    `M${p0[0]},${p0[1]} L${p1[0]},${p1[1]} L${p2[0]},${p2[1]} L${p3[0]},${p3[1]} Z` +
    `M${p1[0]},${p1[1]} L${p1[0]},${p1[1] + h}` +
    `M${p2[0]},${p2[1]} L${p2[0]},${p2[1] + h}` +
    `M${p3[0]},${p3[1]} L${p3[0]},${p3[1] + h}` +
    `M${p3[0]},${p3[1] + h} L${p2[0]},${p2[1] + h} L${p1[0]},${p1[1] + h}`;

  return (
    <g>
      <polygon points={top} fill={c.t} />
      <polygon points={left} fill={c.l} />
      <polygon points={right} fill={c.r} />
      <path
        d={edges}
        fill="none"
        stroke={c.edge}
        strokeOpacity="0.22"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={edges}
        fill="none"
        stroke={c.edge}
        strokeOpacity="0.95"
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </g>
  );
}

/**
 * Per-model framing. Each model is authored at whatever coordinates suit its
 * shape, then `fit` recentres and rescales it so all eight sit at the same
 * optical size and centre — without it they crop unevenly against the card
 * corner. Values are the measured bounding box of each model's geometry:
 * `cx`/`cy` its centre, `span` its largest dimension, `base` its lowest point,
 * `halfW` half its width (for the shadow).
 */
type Fit = { cx: number; cy: number; span: number; base: number; halfW: number };

const TARGET = 150;
const CENTRE = 108;

function Frame({
  id,
  fit,
  children,
}: {
  id: string;
  fit: Fit;
  children: React.ReactNode;
}) {
  const scale = TARGET / fit.span;

  return (
    <svg viewBox="0 0 220 220" className="h-full w-full" aria-hidden="true">
      <Defs id={id} />
      <g
        transform={`translate(${CENTRE} ${CENTRE}) scale(${scale.toFixed(3)}) translate(${-fit.cx} ${-fit.cy})`}
      >
        <ellipse
          cx={fit.cx}
          cy={fit.base - 4}
          rx={fit.halfW * 0.95}
          ry={fit.halfW * 0.26}
          fill={`url(#${id}-shadow)`}
        />
        {children}
      </g>
    </svg>
  );
}

/** AI-Driven Rasa Chatbot — a conversation stacking up, turn by turn. */
const Chat = () => (
  <Frame id="m-chat" fit={{ cx: 113, cy: 113, span: 139, base: 180, halfW: 70 }}>
    <Cuboid cx={118} cy={46} w={74} d={54} h={12} tone="light" />
    <Cuboid cx={78} cy={96} w={52} d={40} h={10} tone="accent" />
    <Cuboid cx={132} cy={132} w={44} d={34} h={9} tone="dim" />
  </Frame>
);

/**
 * RAG Chatbot — a corpus of standing records with one retrieved, lifted clear
 * of the shelf and lit. Upright cards (small depth, tall) rather than another
 * flat stack, so it does not read as the same object as the Chat model.
 */
const Retrieval = () => (
  <Frame id="m-ret" fit={{ cx: 104, cy: 155, span: 206, base: 258, halfW: 81 }}>
    <Cuboid cx={92} cy={154} w={104} d={80} h={7} tone="dim" />
    <Cuboid cx={54} cy={108} w={30} d={8} h={36} tone="light" />
    <Cuboid cx={88} cy={126} w={30} d={8} h={36} tone="light" />
    <Cuboid cx={122} cy={144} w={30} d={8} h={36} tone="dim" />
    <Cuboid cx={156} cy={52} w={34} d={9} h={40} tone="accent" />
  </Frame>
);

/** Financial AI Analyst — a rising series read off a plate. */
const Analyst = () => (
  <Frame id="m-ana" fit={{ cx: 120, cy: 137, span: 150, base: 212, halfW: 74 }}>
    <Cuboid cx={110} cy={120} w={96} d={74} h={7} tone="dim" />
    <Cuboid cx={86} cy={104} w={20} d={20} h={26} tone="light" />
    <Cuboid cx={116} cy={86} w={20} d={20} h={46} tone="light" />
    <Cuboid cx={146} cy={62} w={20} d={20} h={66} tone="accent" />
  </Frame>
);

/** AI Travel Companion — a route crossing a map plate to a pin. */
const Travel = () => (
  <Frame id="m-trv" fit={{ cx: 120, cy: 133, span: 159, base: 204, halfW: 80 }}>
    <Cuboid cx={110} cy={104} w={104} d={80} h={8} tone="dim" />
    <Cuboid cx={84} cy={118} w={54} d={10} h={4} tone="light" />
    <Cuboid cx={122} cy={140} w={10} d={44} h={4} tone="light" />
    <Cuboid cx={140} cy={62} w={18} d={18} h={30} tone="accent" />
  </Frame>
);

/** Video AI Summarizer — a long reel condensed to one bright frame. */
const Video = () => (
  <Frame id="m-vid" fit={{ cx:  84, cy: 128, span: 200, base: 189, halfW: 100 }}>
    <Cuboid cx={64} cy={104} w={26} d={92} h={8} tone="dim" />
    <Cuboid cx={98} cy={122} w={26} d={92} h={8} tone="dim" />
    <Cuboid cx={146} cy={66} w={44} d={36} h={16} tone="accent" />
  </Frame>
);

/** Canteen Management — a face plate between scanner brackets. */
const Face = () => (
  <Frame id="m-face" fit={{ cx: 117, cy: 132, span: 146, base: 200, halfW: 73 }}>
    <Cuboid cx={110} cy={110} w={92} d={72} h={8} tone="dim" />
    <Cuboid cx={110} cy={74} w={46} d={38} h={14} tone="light" />
    <Cuboid cx={110} cy={64} w={46} d={8} h={4} tone="accent" />
    <Cuboid cx={54} cy={118} w={12} d={12} h={22} tone="light" />
    <Cuboid cx={176} cy={136} w={12} d={12} h={22} tone="light" />
  </Frame>
);

/** Blockchain App Development — blocks linked into a descending chain. */
const Chain = () => (
  <Frame id="m-chn" fit={{ cx: 131, cy: 121, span: 165, base: 185, halfW: 83 }}>
    <Cuboid cx={74} cy={56} w={36} d={30} h={24} tone="light" />
    <Cuboid cx={108} cy={76} w={14} d={12} h={8} tone="accent" />
    <Cuboid cx={128} cy={92} w={36} d={30} h={24} tone="accent" />
    <Cuboid cx={162} cy={112} w={14} d={12} h={8} tone="accent" />
    <Cuboid cx={182} cy={128} w={36} d={30} h={24} tone="dim" />
  </Frame>
);

/** Document Tokenization — a document sealed under a minted token. */
const Token = () => (
  <Frame id="m-tok" fit={{ cx: 114, cy: 129, span: 153, base: 205, halfW: 64 }}>
    <Cuboid cx={104} cy={126} w={80} d={62} h={8} tone="dim" />
    <Cuboid cx={104} cy={110} w={80} d={62} h={7} tone="light" />
    <Cuboid cx={116} cy={52} w={34} d={28} h={22} tone="accent" />
    <Cuboid cx={70} cy={84} w={14} d={12} h={9} tone="light" />
    <Cuboid cx={166} cy={84} w={14} d={12} h={9} tone="light" />
  </Frame>
);

export const isoModels: Record<ProjectModel, () => React.ReactElement> = {
  chat: Chat,
  retrieval: Retrieval,
  analyst: Analyst,
  travel: Travel,
  video: Video,
  face: Face,
  chain: Chain,
  token: Token,
};
