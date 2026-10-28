const GOLD = "var(--accent)";
const DIM = "var(--text-dim)";

export type ServiceArtKind =
  | "machine-learning-consulting"
  | "custom-ai-development"
  | "ai-automation"
  | "mlops-consulting";

/** Line-art illustration for each service, drawn with the theme tokens so it
 * follows light and dark mode. Decorative: the page copy carries the meaning. */
export default function ServiceArt({
  kind,
  className = "service-art",
  crop = false,
}: {
  kind: ServiceArtKind;
  className?: string;
  /** Fill a wider box by trimming the top and bottom margins instead of
   * letterboxing. Every drawing keeps its content inside y 40-260 for this. */
  crop?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      preserveAspectRatio={crop ? "xMidYMid slice" : "xMidYMid meet"}
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {kind === "ai-automation" && <Automation />}
      {kind === "custom-ai-development" && <CustomModel />}
      {kind === "machine-learning-consulting" && <Consulting />}
      {kind === "mlops-consulting" && <MlOps />}
      <path
        d="M0 252 C 80 218, 160 218, 230 242 C 290 263, 340 252, 400 230 L400 300 L0 300 Z"
        fill="var(--accent-soft)"
      />
    </svg>
  );
}

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g stroke={DIM} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x1} ${y} H${x2}`} />
      <path d={`M${x2 - 6} ${y - 5} L${x2} ${y} L${x2 - 6} ${y + 5}`} />
    </g>
  );
}

/* Messy paperwork in, a gear in the middle, a checked-off list out. */
function Automation() {
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <>
      {[-14, 8, -3].map((angle, i) => (
        <g key={angle} transform={`rotate(${angle} 82 130)`}>
          <rect
            x="54"
            y="94"
            width="56"
            height="72"
            rx="4"
            fill="var(--bg)"
            stroke={i === 2 ? GOLD : DIM}
            strokeOpacity={i === 2 ? 1 : 0.6}
            strokeWidth="1.8"
          />
          {i === 2 &&
            [110, 122, 134, 146].map((y) => (
              <path key={y} d={`M64 ${y} H${y === 146 ? 86 : 100}`} stroke={DIM} strokeWidth="1.6" strokeLinecap="round" />
            ))}
        </g>
      ))}
      <Arrow x1={128} x2={160} y={130} />
      <g>
        {teeth.map((a) => (
          <rect key={a} x="195" y="98" width="10" height="12" rx="2" fill={GOLD} transform={`rotate(${a} 200 130)`} />
        ))}
        <circle cx="200" cy="130" r="24" fill="var(--bg)" stroke={GOLD} strokeWidth="2.2" />
        <circle cx="200" cy="130" r="8" stroke={GOLD} strokeWidth="2" />
      </g>
      <Arrow x1={240} x2={272} y={130} />
      {[98, 120, 142, 164].map((y) => (
        <g key={y} strokeLinecap="round" strokeLinejoin="round">
          <rect x="284" y={y - 6} width="12" height="12" rx="2.5" stroke={GOLD} strokeWidth="1.8" />
          <path d={`M287 ${y} L289.5 ${y + 2.5} L293.5 ${y - 2.5}`} stroke={GOLD} strokeWidth="1.8" />
          <path d={`M306 ${y} H350`} stroke={DIM} strokeWidth="1.6" />
        </g>
      ))}
    </>
  );
}

/* Your data, a small network shaped to it, a target it hits. */
function CustomModel() {
  const layers = [
    { x: 180, ys: [100, 135, 170] },
    { x: 230, ys: [88, 118, 152, 182] },
    { x: 280, ys: [115, 155] },
  ];
  return (
    <>
      <g stroke={GOLD} strokeWidth="2">
        <ellipse cx="80" cy="100" rx="30" ry="9" fill="var(--bg)" />
        <path d="M50 100 V164 A30 9 0 0 0 110 164 V100" />
        <path d="M50 122 A30 9 0 0 0 110 122" />
        <path d="M50 143 A30 9 0 0 0 110 143" />
      </g>
      <Arrow x1={124} x2={156} y={135} />
      <g stroke={DIM} strokeOpacity="0.45" strokeWidth="1">
        {layers.slice(1).map((layer, li) =>
          layer.ys.flatMap((y2) =>
            layers[li].ys.map((y1) => (
              <path key={`${li}-${y1}-${y2}`} d={`M${layers[li].x} ${y1} L${layer.x} ${y2}`} />
            ))
          )
        )}
      </g>
      {layers.flatMap((layer) =>
        layer.ys.map((y) => (
          <circle key={`${layer.x}-${y}`} cx={layer.x} cy={y} r="6.5" fill="var(--bg)" stroke={GOLD} strokeWidth="1.8" />
        ))
      )}
      <Arrow x1={296} x2={318} y={135} />
      <g stroke={GOLD} strokeWidth="2">
        <circle cx="348" cy="135" r="20" />
        <circle cx="348" cy="135" r="11" />
      </g>
      <circle cx="348" cy="135" r="4" fill={GOLD} />
    </>
  );
}

/* A scatter, the simplest line that explains it, and a close look first. */
function Consulting() {
  const points = [
    [92, 177], [104, 183], [117, 167], [130, 172], [145, 157], [158, 164],
    [171, 148], [186, 153], [199, 139], [213, 146], [227, 128], [240, 135],
    [254, 120], [268, 126], [282, 110], [296, 112], [309, 97],
  ];
  return (
    <>
      <path d="M70 66 V204 H334" stroke={DIM} strokeOpacity="0.6" strokeWidth="1.6" strokeLinecap="round" />
      {points.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.4" fill={DIM} fillOpacity="0.7" />
      ))}
      <path d="M82 185 L320 86" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="252" cy="122" r="31" fill="var(--accent-soft)" stroke={GOLD} strokeWidth="2.2" />
      <path d="M274 144 L300 170" stroke={GOLD} strokeWidth="6" strokeLinecap="round" />
    </>
  );
}

/* Train, deploy, monitor, retrain: a loop around a metric held in its band. */
function MlOps() {
  const nodes = [
    { x: 200, y: 65, label: "train", lx: 222, ly: 58, anchor: "start" },
    { x: 270, y: 135, label: "deploy", lx: 294, ly: 139, anchor: "start" },
    { x: 200, y: 205, label: "monitor", lx: 200, ly: 240, anchor: "middle" },
    { x: 130, y: 135, label: "retrain", lx: 106, ly: 139, anchor: "end" },
  ] as const;
  const chevrons = [
    { x: 249.5, y: 85.5, r: 45 },
    { x: 249.5, y: 184.5, r: 135 },
    { x: 150.5, y: 184.5, r: 225 },
    { x: 150.5, y: 85.5, r: 315 },
  ];
  return (
    <>
      <circle cx="200" cy="135" r="70" stroke={DIM} strokeOpacity="0.5" strokeWidth="1.6" />
      {chevrons.map((c) => (
        <path
          key={c.r}
          d="M-5 -6 L4 0 L-5 6"
          transform={`translate(${c.x} ${c.y}) rotate(${c.r})`}
          stroke={GOLD}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {nodes.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="15" fill="var(--bg)" stroke={GOLD} strokeWidth="2" />
          <circle cx={n.x} cy={n.y} r="4" fill={GOLD} />
          <text
            x={n.lx}
            y={n.ly}
            textAnchor={n.anchor}
            fill={DIM}
            style={{ font: "500 11px var(--mono)", letterSpacing: "0.08em" }}
          >
            {n.label}
          </text>
        </g>
      ))}
      <rect x="166" y="118" width="68" height="34" rx="3" stroke={DIM} strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="3 3" />
      <path
        d="M168 140 L179 131 L190 139 L201 128 L212 135 L223 127 L232 133"
        stroke={GOLD}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}
