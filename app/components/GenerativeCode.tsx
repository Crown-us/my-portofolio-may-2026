"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface CanvasTileProps {
  id: string;
  title: string;
  type: "deform" | "wave" | "quadtree" | "matrix" | "tiles" | "noise";
  tag: string;
}

function InteractiveCanvas({ type }: { type: CanvasTileProps["type"] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (type === "deform") {
        // 1. Type Deformation Grid (Bold White Skewed Text)
        ctx.fillStyle = "white";
        ctx.font = "900 24px 'Syne', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const angle = -0.2 + Math.sin(frame * 0.03) * 0.08;
        const skew = Math.sin(frame * 0.04) * 0.15;

        ctx.save();
        ctx.translate(w / 2, h / 2);
        ctx.rotate(angle);
        ctx.transform(1, skew, 0, 1, 0, 0);
        ctx.fillText("2xA // CODE", 0, 0);
        ctx.restore();
      } else if (type === "wave") {
        // 2. Wave Displacement Mesh (Neon Sine Lines)
        ctx.strokeStyle = "#ccff00";
        ctx.lineWidth = 2;
        const lines = 7;
        const spacing = h / (lines + 1);

        for (let i = 1; i <= lines; i++) {
          const y = i * spacing;
          ctx.beginPath();
          for (let x = 0; x <= w; x += 6) {
            const dy = Math.sin(x * 0.02 + frame * 0.04 + i * 0.5) * 14;
            if (x === 0) ctx.moveTo(x, y + dy);
            else ctx.lineTo(x, y + dy);
          }
          ctx.stroke();
        }
      } else if (type === "quadtree") {
        // 3. Generative Quadtree Split (Dark Lime Rectangles Stepping)
        ctx.fillStyle = "#3f4d00";
        const cols = 5;
        const rows = 4;
        const cellW = w / cols;
        const cellH = h / rows;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const isStep = (c - r + Math.floor(frame / 25)) % 4 === 0;
            if (isStep) {
              ctx.fillRect(c * cellW + 2, r * cellH + 2, cellW - 4, cellH - 4);
            }
          }
        }
      } else if (type === "matrix") {
        // 4. Glyph Stream Matrix (Digital Rain Cipher)
        ctx.fillStyle = "#ccff00";
        ctx.font = "bold 11px monospace";
        const chars = "A B C D E F T G K 1 2 3 7 9";

        for (let i = 0; i < 18; i++) {
          const char = chars[(i * 3 + Math.floor(frame / 8)) % chars.length];
          const x = (i * 24 + 10) % w;
          const y = ((frame * 1.5 + i * 40) % (h + 30)) - 15;
          ctx.fillText(char, x, y);
        }
      } else if (type === "tiles") {
        // 5. Dynamic Tile Scaling (Scaling Neon Squares)
        ctx.fillStyle = "#ccff00";
        const cols = 14;
        const rows = 6;
        const cellW = w / cols;
        const cellH = h / rows;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const factor = 1 - c / cols;
            const size = Math.max(2, cellW * factor * 0.75 + Math.sin(frame * 0.05 + c * 0.2) * 2);
            ctx.fillRect(
              c * cellW + (cellW - size) / 2,
              r * cellH + (cellH - size) / 2,
              size,
              size
            );
          }
        }
      } else {
        // 6. Noise Glitch Buffer (Dark Rect Glitches)
        ctx.fillStyle = "#1e1e1e";
        const numBlocks = 6;
        for (let i = 0; i < numBlocks; i++) {
          const rx = ((frame * (i + 1) * 3) % (w + 100)) - 50;
          const ry = (i * 25 + Math.sin(frame * 0.02 + i) * 15) % h;
          const rw = 60 + (i % 3) * 30;
          const rh = 20;
          ctx.fillRect(rx, ry, rw, rh);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [type]);

  return <canvas ref={canvasRef} className="w-full h-full block bg-black" />;
}

const experiments: CanvasTileProps[] = [
  { id: "EXP_01", title: "TYPE DEFORMATION GRID", type: "deform", tag: "Algorithmic Typography" },
  { id: "EXP_02", title: "WAVE DISPLACEMENT MESH", type: "wave", tag: "Sine Oscillation System" },
  { id: "EXP_03", title: "GENERATIVE QUADTREE SPLIT", type: "quadtree", tag: "Recursive Space Partitioning" },
  { id: "EXP_04", title: "GLYPH STREAM MATRIX", type: "matrix", tag: "Digital Rain Cipher" },
  { id: "EXP_05", title: "DYNAMIC TILE SCALING", type: "tiles", tag: "2D Array Transformations" },
  { id: "EXP_06", title: "NOISE GLITCH BUFFER", type: "noise", tag: "Procedural Noise Shaders" },
];

export default function GenerativeCode() {
  return (
    <section className="py-20 bg-[#0a0a0a] text-white border-t border-white/10 font-mono select-none">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-8 mb-10 border-b border-white/10 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00] bg-[#1a1a1a] border border-[#ccff00]/30 px-2.5 py-1 font-bold mb-3 inline-block">
              GENERATIVE CODE EXPLORATIONS
            </span>
            <h2 className="font-display text-3xl md:text-6xl font-extrabold tracking-tighter uppercase text-white">
              CODE &amp; REALTIME SYSTEMS
            </h2>
          </div>
          <div className="text-right font-mono text-xs text-white/50">
            ENGINE: <span className="font-bold text-[#ccff00]">HTML5 CANVAS / 60 FPS</span>
          </div>
        </div>

        {/* 6 Experiments Grid (Matching Screenshot Exactly) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="group border border-white/10 bg-[#0f0f11] hover:border-white/30 transition-all p-4 flex flex-col justify-between"
            >
              {/* Header inside Card */}
              <div className="flex justify-between items-center pb-3 mb-3 text-xs">
                {/* Green Pill Badge */}
                <span className="font-mono text-[10px] font-bold text-black bg-[#ccff00] px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  {exp.id}
                </span>
                {/* Right Tag */}
                <span className="text-white/60 text-[11px] font-mono">{exp.tag}</span>
              </div>

              {/* Viewport Box */}
              <div className="relative w-full h-44 bg-black border border-white/10 overflow-hidden mb-4">
                <InteractiveCanvas type={exp.type} />
                {/* 60 FPS Badge */}
                <div className="absolute top-2.5 right-3 text-[9px] text-[#ccff00] font-mono font-bold tracking-wider opacity-90">
                  60 FPS
                </div>
              </div>

              {/* Bottom Card Title & Arrow */}
              <div className="flex justify-between items-center text-xs pt-1">
                <h3 className="font-display font-black text-sm md:text-base uppercase text-white tracking-wider group-hover:text-[#ccff00] transition-colors">
                  {exp.title}
                </h3>
                <ArrowUpRight size={14} className="text-white/40 group-hover:text-[#ccff00] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
