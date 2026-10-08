// Draws one shape as SVG (100 x 100 box). Used by the Shapes tool.
const STROKE = "rgba(22,35,63,0.28)";

function polygonPoints(sides, r = 38) {
  return Array.from({ length: sides }, (_, i) => {
    const a = (Math.PI * 2 * i) / sides - Math.PI / 2;
    return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

// lighter / darker version of a #rrggbb colour (for the 3D look)
function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.min(255, Math.max(0, v + amount));
  return `rgb(${c(n >> 16)},${c((n >> 8) & 255)},${c(n & 255)})`;
}

export default function ShapeArt({ shape, size = 96 }) {
  const { draw, color, sides, id } = shape;
  const common = { fill: color, stroke: STROKE, strokeWidth: 1.5, strokeLinejoin: "round" };
  let body;

  switch (draw) {
    case "circle": body = <circle cx="50" cy="50" r="38" {...common} />; break;
    case "square": body = <rect x="16" y="16" width="68" height="68" rx="6" {...common} />; break;
    case "rectangle": body = <rect x="8" y="27" width="84" height="46" rx="5" {...common} />; break;
    case "triangle": body = <polygon points="50,12 90,82 10,82" {...common} />; break;
    case "oval": body = <ellipse cx="50" cy="50" rx="42" ry="27" {...common} />; break;
    case "diamond": body = <polygon points="50,8 90,50 50,92 10,50" {...common} />; break;
    case "polygon": body = <polygon points={polygonPoints(sides)} {...common} />; break;
    case "star": body = <polygon points="50,8 61,38 93,38 67,57 77,89 50,70 23,89 33,57 7,38 39,38" {...common} />; break;
    case "heart": body = <path d="M50 86S14 62 14 36a20 20 0 0 1 36-12 20 20 0 0 1 36 12c0 26-36 50-36 50Z" {...common} />; break;
    case "crescent": body = <path d="M64 10a40 40 0 1 0 0 80 31 31 0 1 1 0-80Z" {...common} />; break;
    case "parallelogram": body = <polygon points="28,25 94,25 72,75 6,75" {...common} />; break;
    case "trapezoid": body = <polygon points="28,25 72,25 92,76 8,76" {...common} />; break;
    case "cube":
      body = (
        <>
          <polygon points="18,34 40,14 86,14 64,34" fill={shade(color, 22)} stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
          <polygon points="64,34 86,14 86,60 64,82" fill={shade(color, -26)} stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="18" y="34" width="46" height="48" fill={color} stroke={STROKE} strokeWidth="1.5" />
        </>
      );
      break;
    case "cuboid":
      body = (
        <>
          <polygon points="8,38 24,22 94,22 78,38" fill={shade(color, 22)} stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
          <polygon points="78,38 94,22 94,56 78,72" fill={shade(color, -26)} stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="8" y="38" width="70" height="34" fill={color} stroke={STROKE} strokeWidth="1.5" />
        </>
      );
      break;
    case "sphere":
      body = (
        <>
          <defs>
            <radialGradient id={`g-${id}`} cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor={shade(color, 60)} />
              <stop offset="100%" stopColor={shade(color, -40)} />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="38" fill={`url(#g-${id})`} stroke={STROKE} strokeWidth="1.5" />
        </>
      );
      break;
    case "cone":
      body = (
        <>
          <polygon points="50,10 88,76 12,76" fill={color} stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
          <ellipse cx="50" cy="76" rx="38" ry="11" fill={shade(color, -26)} stroke={STROKE} strokeWidth="1.5" />
        </>
      );
      break;
    case "cylinder":
      body = (
        <>
          <path d="M22 26v48a28 11 0 0 0 56 0V26Z" fill={color} stroke={STROKE} strokeWidth="1.5" />
          <ellipse cx="50" cy="26" rx="28" ry="11" fill={shade(color, 24)} stroke={STROKE} strokeWidth="1.5" />
        </>
      );
      break;
    case "pyramid":
      body = (
        <>
          <polygon points="50,8 90,76 50,86" fill={shade(color, -24)} stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
          <polygon points="50,8 10,76 50,86" fill={color} stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
        </>
      );
      break;
    default: body = <circle cx="50" cy="50" r="38" {...common} />;
  }

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      {body}
    </svg>
  );
}
