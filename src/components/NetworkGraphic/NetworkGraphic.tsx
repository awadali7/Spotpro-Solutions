export function NetworkGraphic({ className }: { className?: string }) {
  const nodes = [
    { x: 40, y: 60, r: 5 },
    { x: 140, y: 30, r: 7 },
    { x: 230, y: 70, r: 4 },
    { x: 90, y: 140, r: 6 },
    { x: 200, y: 160, r: 5 },
    { x: 290, y: 130, r: 8 },
    { x: 260, y: 220, r: 4 },
    { x: 120, y: 230, r: 5 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [3, 4],
    [2, 5],
    [4, 5],
    [4, 7],
    [5, 6],
    [6, 7],
  ];

  return (
    <svg
      viewBox="0 0 320 260"
      className={className}
      role="img"
      aria-label="Abstract illustration of a connected network graph"
    >
      <defs>
        <linearGradient id="ng-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--secondary)" />
          <stop offset="100%" stopColor="var(--highlight)" />
        </linearGradient>
        <radialGradient id="ng-node" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="var(--highlight)" />
          <stop offset="100%" stopColor="var(--primary)" />
        </radialGradient>
      </defs>

      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="url(#ng-line)"
          strokeWidth={1.5}
          strokeOpacity={0.5}
        />
      ))}

      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill="url(#ng-node)" />
      ))}
    </svg>
  );
}
