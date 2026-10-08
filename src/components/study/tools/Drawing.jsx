import { useRef, useState } from "react";

const PALETTE = ["#16233f", "#e53935", "#fb8c00", "#fdd835", "#43a047", "#1e88e5", "#8e24aa", "#6d4c41"];
const W = 1000;
const H = 600;

// Drawing board: works with mouse, finger and pen.
export default function Drawing() {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const [color, setColor] = useState(PALETTE[1]);
  const [size, setSize] = useState(8);
  const [eraser, setEraser] = useState(false);
  const [bg, setBg] = useState("#ffffff");

  function point(e) {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: ((e.clientX - r.left) * W) / r.width, y: ((e.clientY - r.top) * H) / r.height };
  }

  function stroke(a, b) {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    ctx.globalCompositeOperation = eraser ? "destination-out" : "source-over";
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  function onDown(e) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = point(e);
    stroke(last.current, last.current); // a tap makes a dot
  }

  function onMove(e) {
    if (!drawing.current) return;
    const p = point(e);
    stroke(last.current, p);
    last.current = p;
  }

  function onUp() {
    drawing.current = false;
  }

  function clear() {
    canvasRef.current.getContext("2d").clearRect(0, 0, W, H);
  }

  function save() {
    const out = document.createElement("canvas");
    out.width = W;
    out.height = H;
    const ctx = out.getContext("2d");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    ctx.drawImage(canvasRef.current, 0, 0);
    out.toBlob((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "my-drawing.png";
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4 rounded-2xl border border-navy-900/10 bg-paper-100 p-4">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Colours">
          {PALETTE.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => { setColor(c); setEraser(false); }}
              aria-label={`Colour ${c}`}
              aria-pressed={!eraser && color === c}
              className={`h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 ${!eraser && color === c ? "border-saffron-600 ring-2 ring-saffron-500" : "border-navy-900/30"}`}
              style={{ backgroundColor: c }}
            />
          ))}
          <label className="flex items-center gap-2 text-sm text-ink-900/70">
            <input type="color" value={color} onChange={(e) => { setColor(e.target.value); setEraser(false); }} className="h-9 w-12 cursor-pointer rounded" aria-label="Pick any colour" />
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm text-ink-900/70">
          Brush
          <input type="range" min="2" max="40" value={size} onChange={(e) => setSize(Number(e.target.value))} className="accent-saffron-600" />
          <span className="w-6 text-right tabular-nums">{size}</span>
        </label>

        <label className="flex items-center gap-2 text-sm text-ink-900/70">
          Background
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-9 w-12 cursor-pointer rounded" />
        </label>

        <div className="ml-auto flex gap-2">
          <button type="button" onClick={() => setEraser((v) => !v)} aria-pressed={eraser} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${eraser ? "bg-saffron-500 text-navy-950" : "bg-paper-50 text-navy-900 hover:bg-saffron-100"}`}>
            🧽 Eraser
          </button>
          <button type="button" onClick={clear} className="rounded-full bg-paper-50 px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-saffron-100">
            Clear
          </button>
          <button type="button" onClick={save} className="rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-paper-50 transition-colors hover:bg-saffron-600">
            Save
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="w-full cursor-crosshair touch-none rounded-2xl border-2 border-navy-900/15 shadow-inner"
        style={{ backgroundColor: bg, aspectRatio: `${W} / ${H}` }}
        aria-label="Drawing area"
      />
    </div>
  );
}
