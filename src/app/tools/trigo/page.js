"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Compass, Orbit, Activity, Triangle as TriangleIcon, 
  Globe, Waves, BookOpen, Info, Calculator, Terminal 
} from 'lucide-react';

// --- UTILITY FUNCTIONS ---
const getFractionalRadianString = (deg) => {
  const map = {
    0: '0', 30: 'π/6', 45: 'π/4', 60: 'π/3', 90: 'π/2',
    120: '2π/3', 135: '3π/4', 150: '5π/6', 180: 'π',
    210: '7π/6', 225: '5π/4', 240: '4π/3', 270: '3π/2',
    300: '5π/3', 315: '7π/4', 330: '11π/6', 360: '2π'
  };
  return map[Math.round(deg)] || `${(deg / 180).toFixed(2)}π`;
};

// ==========================================
// TAB 1: UNIT CIRCLE EXPLORER
// ==========================================
function UnitCircleTab() {
  const [angleDeg, setAngleDeg] = useState(45);
  const svgRef = useRef(null);

  const angleRad = (angleDeg * Math.PI) / 180;
  const cx = 200, cy = 200, r = 140;
  
  const targetX = cx + r * Math.cos(angleRad);
  const targetY = cy - r * Math.sin(angleRad); // SVG Y is inverted
  
  const sinVal = Math.sin(angleRad);
  const cosVal = Math.cos(angleRad);
  const tanVal = cosVal !== 0 ? Math.tan(angleRad) : Infinity;
  const secVal = cosVal !== 0 ? 1 / cosVal : Infinity;
  const cscVal = sinVal !== 0 ? 1 / sinVal : Infinity;
  const cotVal = sinVal !== 0 ? cosVal / sinVal : Infinity;

  const largeArcFlag = angleDeg > 180 ? 1 : 0;
  const sectorPath = angleDeg > 0 
    ? `M ${cx} ${cy} L ${cx + r} ${cy} A ${r} ${r} 0 ${largeArcFlag} 0 ${targetX} ${targetY} Z`
    : `M ${cx} ${cy} L ${cx} ${cy}`;

  const getQuadrant = () => {
    if (angleDeg > 0 && angleDeg < 90) return 'Quadrant I';
    if (angleDeg > 90 && angleDeg < 180) return 'Quadrant II';
    if (angleDeg > 180 && angleDeg < 270) return 'Quadrant III';
    if (angleDeg > 270 && angleDeg < 360) return 'Quadrant IV';
    return 'Quadrantal Boundary';
  };

  const getRefAngle = () => {
    if (angleDeg > 90 && angleDeg <= 180) return 180 - angleDeg;
    if (angleDeg > 180 && angleDeg <= 270) return angleDeg - 180;
    if (angleDeg > 270 && angleDeg <= 360) return 360 - angleDeg;
    return angleDeg;
  };

  const handleDrag = useCallback((e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left) - (rect.width / 2);
    const dy = (rect.height / 2) - (e.clientY - rect.top);
    let rawAngle = Math.atan2(dy, dx) * 180 / Math.PI;
    if (rawAngle < 0) rawAngle += 360;
    setAngleDeg(rawAngle);
  }, []);

  const onMouseDown = (e) => {
    handleDrag(e);
    const onMouseMove = (moveEvent) => handleDrag(moveEvent);
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
              <Orbit className="text-indigo-500 w-5 h-5" /> Unit Circle Visualizer
            </h3>
            <p className="text-xs text-slate-400">Click or drag anywhere on the circle or adjust the sliders.</p>
          </div>
          <span className="px-2.5 py-1 text-[10px] uppercase font-bold bg-slate-800 text-indigo-400 rounded-full border border-slate-700">Basic-to-Intermediate</span>
        </div>

        <div className="flex-grow flex items-center justify-center py-6 min-h-[360px]">
          <div className="relative w-full max-w-[340px] aspect-square">
            <svg ref={svgRef} onMouseDown={onMouseDown} viewBox="0 0 400 400" className="w-full h-full select-none cursor-pointer">
              <line x1="40" y1="200" x2="360" y2="200" stroke="#334155" strokeWidth="2" />
              <line x1="200" y1="40" x2="200" y2="360" stroke="#334155" strokeWidth="2" />
              
              <text x="370" y="205" fill="#64748b" className="text-xs font-bold" textAnchor="middle">(1,0)</text>
              <text x="200" y="25" fill="#64748b" className="text-xs font-bold" textAnchor="middle">(0,1)</text>
              <text x="25" y="205" fill="#64748b" className="text-xs font-bold" textAnchor="middle">(-1,0)</text>
              <text x="200" y="385" fill="#64748b" className="text-xs font-bold" textAnchor="middle">(0,-1)</text>

              <circle cx="200" cy="200" r="140" fill="none" stroke="#475569" strokeWidth="2" />
              <circle cx="200" cy="200" r="140" fill="indigo" fillOpacity="0.02" />
              <path d={sectorPath} fill="rgba(99, 102, 241, 0.15)" />

              <line x1="200" y1="200" x2={targetX} y2="200" stroke="#ef4444" strokeWidth="3" strokeDasharray="2 2" />
              <line x1={targetX} y1="200" x2={targetX} y2={targetY} stroke="#10b981" strokeWidth="3" strokeDasharray="2 2" />
              <line x1="200" y1="200" x2={targetX} y2={targetY} stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
              
              {Math.abs(cosVal) > 0.001 && (
                <line x1={targetX} y1={targetY} x2={cx + r * (1 / cosVal)} y2={cy} stroke="#eab308" strokeWidth="2" opacity="0.8" />
              )}
              <circle cx={targetX} cy={targetY} r="7" fill="#6366f1" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className="mt-auto space-y-4 pt-4 border-t border-slate-800">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Angle in Degrees (<span className="font-bold text-slate-200">θ°</span>)</span>
              <span className="text-indigo-400 font-bold font-mono">{Math.round(angleDeg)}°</span>
            </div>
            <input type="range" min="0" max="360" value={angleDeg} onChange={(e) => setAngleDeg(parseFloat(e.target.value))} className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Angle in Radians (<span className="font-bold text-slate-200">θ rad</span>)</span>
              <span className="text-indigo-400 font-bold font-mono">{angleRad.toFixed(3)} rad ({getFractionalRadianString(angleDeg)})</span>
            </div>
            <input type="range" min="0" max="6.283" step="0.005" value={angleRad} onChange={(e) => setAngleDeg(parseFloat(e.target.value) * 180 / Math.PI)} className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Unit Circle Coordinate & Ratios</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">Coordinate point <span className="font-bold text-slate-300">P(x, y)</span></div>
              <div className="text-base font-bold text-indigo-400 mt-1 font-mono">({cosVal.toFixed(3)}, {sinVal.toFixed(3)})</div>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">Active Quadrant</div>
              <div className="text-base font-bold text-purple-400 mt-1">{getQuadrant()}</div>
            </div>
          </div>

          <div className="mt-6 space-y-3.5">
            <RatioRow label="sin(θ) = y" value={sinVal.toFixed(3)} color="emerald" />
            <RatioRow label="cos(θ) = x" value={cosVal.toFixed(3)} color="rose" />
            <RatioRow label="tan(θ) = y/x" value={Math.abs(tanVal) > 999 ? 'Undef' : tanVal.toFixed(3)} color="yellow" />
            <RatioRow label="sec(θ) = 1/x" value={Math.abs(secVal) > 999 ? 'Undef' : secVal.toFixed(3)} isPlain />
            <RatioRow label="csc(θ) = 1/y" value={Math.abs(cscVal) > 999 ? 'Undef' : cscVal.toFixed(3)} isPlain />
            <RatioRow label="cot(θ) = x/y" value={Math.abs(cotVal) > 999 ? 'Undef' : cotVal.toFixed(3)} isPlain />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-950/40 via-purple-950/40 to-slate-900 border border-indigo-900/40 rounded-2xl p-6 shadow-xl">
          <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4" /> Coordinate Mapping & Parity
          </h4>
          <p className="text-xs leading-relaxed text-slate-300 mb-4">
            Mapping right-triangle relationships onto the 2D Cartesian plane unlocks trigonometry for angles greater than 90° and negative rotations.
          </p>
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <div className="text-xs flex justify-between">
              <span className="text-slate-400">Symmetry Rule (Even/Odd):</span>
              <span className="text-emerald-400 font-medium">cos(-θ) = cos(θ)</span>
            </div>
            <div className="text-xs flex justify-between">
              <span className="text-slate-400">Active Projection:</span>
              <span className="text-indigo-300 font-mono">cos(-{Math.round(angleDeg)}°) = {cosVal.toFixed(3)}</span>
            </div>
            <div className="text-xs border-t border-slate-800 pt-2 flex justify-between">
              <span className="text-slate-400">Reference Angle:</span>
              <span className="text-yellow-400 font-bold font-mono">θ&apos; = {Math.round(getRefAngle())}°</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const RatioRow = ({ label, value, color, isPlain }) => {
  if (isPlain) {
    return (
      <div className="flex items-center justify-between p-2 border border-slate-800 rounded-lg">
        <div className="text-xs font-semibold text-slate-400">{label}</div>
        <div className="text-xs font-bold font-mono text-slate-200">{value}</div>
      </div>
    );
  }
  const colorMap = {
    emerald: 'bg-emerald-500 text-emerald-400 border-emerald-500',
    rose: 'bg-rose-500 text-rose-400 border-rose-500',
    yellow: 'bg-yellow-500 text-yellow-400 border-yellow-500',
  };
  const c = colorMap[color];
  return (
    <div className={`flex items-center justify-between p-2.5 rounded-lg border bg-opacity-5 border-opacity-20 ${c.split(' ')[0]} ${c.split(' ')[2]}`}>
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${c.split(' ')[0]}`}></span>
        <span className="text-xs font-bold text-slate-200">{label}</span>
      </div>
      <div className={`text-sm font-bold font-mono ${c.split(' ')[1]}`}>{value}</div>
    </div>
  );
};

// ==========================================
// TAB 2: SINUSOIDAL WAVES
// ==========================================
function WavesTab() {
  const [amp, setAmp] = useState(1.5);
  const [freq, setFreq] = useState(2.0);
  const [phase, setPhase] = useState(0.0);
  const [vert, setVert] = useState(0.0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set proper canvas resolution
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerY = canvas.height / 2;

    // Grid
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();

    ctx.strokeStyle = '#1e293b';
    for (let x = 0; x < canvas.width; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
    for (let y = 0; y < canvas.height; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }

    // Wave
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const scaleX = 40, scaleY = 40;

    for (let px = 0; px < canvas.width; px++) {
      const x = (px - canvas.width / 2) / scaleX;
      const y = amp * Math.sin(freq * (x + phase)) + vert;
      const py = centerY - (y * scaleY);
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    const handleResize = () => setAmp((a) => a); // trigger re-render hack
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [amp, freq, phase, vert]);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
      <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
              <Activity className="text-indigo-500 w-5 h-5" /> Wave Mechanics Simulator
            </h3>
            <p className="text-xs text-slate-400">Plotting general sinusoidal parameters: <span className="font-bold text-indigo-400">y = R sin(ω(x + c)) + k</span></p>
          </div>
        </div>

        <div className="relative bg-slate-950 border border-slate-800 rounded-xl p-2 flex-grow overflow-hidden min-h-[340px]">
          <canvas ref={canvasRef} className="w-full h-full block min-h-[300px]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-800">
          <SliderControl label="Amplitude" symbol="R" value={amp} min={0.1} max={4.0} step={0.1} setter={setAmp} color="emerald" />
          <SliderControl label="Angular Freq" symbol="ω" value={freq} min={0.2} max={10.0} step={0.1} setter={setFreq} color="indigo" />
          <SliderControl label="Phase Shift" symbol="c" value={phase} min={-3.14} max={3.14} step={0.05} setter={setPhase} color="amber" />
          <SliderControl label="Vertical Shift" symbol="k" value={vert} min={-2.0} max={2.0} step={0.1} setter={setVert} color="rose" />
        </div>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Oscillation Metrics</h4>
          <div className="space-y-4">
            <MetricCard title="Wave Period (T = 2π/ω)" desc="Duration of one complete cycle" value={`${(2 * Math.PI / freq).toFixed(2)}s`} color="indigo" />
            <MetricCard title="Maximum Extent (k + R)" desc="Peak displacement from center" value={(vert + amp).toFixed(2)} color="emerald" />
            <MetricCard title="Minimum Extent (k - R)" desc="Lowest displacement valley" value={(vert - amp).toFixed(2)} color="rose" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-950/40 via-purple-950/40 to-slate-900 border border-indigo-900/40 rounded-2xl p-6 shadow-xl">
          <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2 mb-3">
            <Info className="w-4 h-4" /> Mechanical Vibration Linkage
          </h4>
          <p className="text-xs leading-relaxed text-slate-300 mb-3">Un-damped mass-spring vibrations conform to:</p>
          <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 text-xs text-center font-bold text-indigo-400 font-mono mb-3">
            u(t) = R cos(ω₀ t - δ)
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Adjusting parameters mirrors changes in spring mass (frequency) or deflections (phase shift).
          </p>
        </div>
      </div>
    </section>
  );
}

const SliderControl = ({ label, symbol, value, min, max, step, setter, color }) => (
  <div>
    <div className="flex justify-between text-xs mb-1">
      <span className="text-slate-400 flex items-center gap-1">{label} (<span className={`font-bold text-${color}-400`}>{symbol}</span>)</span>
      <span className={`text-${color}-400 font-bold font-mono`}>{value.toFixed(2)}</span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setter(parseFloat(e.target.value))} className={`w-full accent-${color}-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer`} />
  </div>
);

const MetricCard = ({ title, desc, value, color }) => (
  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
    <div>
      <span className="text-xs text-slate-400 block font-medium">{title}</span>
      <span className="text-xs text-slate-500 block">{desc}</span>
    </div>
    <span className={`text-sm font-bold font-mono text-${color}-400`}>{value}</span>
  </div>
);

// ==========================================
// TAB 3: OBLIQUE TRIANGLES (SSA)
// ==========================================
function TrianglesTab() {
  const [a, setA] = useState(6.0);
  const [b, setB] = useState(8.0);
  const [angleA, setAngleA] = useState(40);

  const angleARad = (angleA * Math.PI) / 180;
  const h = b * Math.sin(angleARad);
  const isAcute = angleA < 90;
  let solutions = [];

  if (isAcute) {
    if (Math.abs(a - h) < 0.001) {
      solutions.push({ B: 90, C: 180 - angleA - 90, c: b * Math.cos(angleARad) });
    } else if (a >= b) {
      const B_rad = Math.asin((b * Math.sin(angleARad)) / a);
      const B_deg = (B_rad * 180) / Math.PI;
      const C_deg = 180 - angleA - B_deg;
      solutions.push({ B: B_deg, C: C_deg, c: (a * Math.sin((C_deg * Math.PI) / 180)) / Math.sin(angleARad) });
    } else if (a > h && a < b) {
      const B1_rad = Math.asin((b * Math.sin(angleARad)) / a);
      const B1_deg = (B1_rad * 180) / Math.PI;
      const C1_deg = 180 - angleA - B1_deg;
      solutions.push({ B: B1_deg, C: C1_deg, c: (a * Math.sin((C1_deg * Math.PI) / 180)) / Math.sin(angleARad) });

      const B2_deg = 180 - B1_deg;
      const C2_deg = 180 - angleA - B2_deg;
      solutions.push({ B: B2_deg, C: C2_deg, c: (a * Math.sin((C2_deg * Math.PI) / 180)) / Math.sin(angleARad) });
    }
  } else if (a > b) {
    const B_rad = Math.asin((b * Math.sin(angleARad)) / a);
    const B_deg = (B_rad * 180) / Math.PI;
    const C_deg = 180 - angleA - B_deg;
    solutions.push({ B: B_deg, C: C_deg, c: (a * Math.sin((C_deg * Math.PI) / 180)) / Math.sin(angleARad) });
  }

  const scale = 14, startX = 80, startY = 270;
  const Cx = startX + b * Math.cos(angleARad) * scale;
  const Cy = startY - b * Math.sin(angleARad) * scale;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
      <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
              <TriangleIcon className="text-indigo-500 w-5 h-5" /> Triangle Solver & SSA
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Enter SSA Properties</h4>
            <SliderControl label="Known Side a" symbol="" value={a} min={1} max={20} step={0.2} setter={setA} color="indigo" />
            <SliderControl label="Adjacent Side b" symbol="" value={b} min={1} max={20} step={0.2} setter={setB} color="purple" />
            <SliderControl label="Angle A (deg)" symbol="" value={angleA} min={5} max={175} step={1} setter={setAngleA} color="emerald" />
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wide mb-3">Classification Details</h4>
            {solutions.length === 0 ? (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-3 bg-rose-500/15 text-rose-400 border border-rose-500/30">No Valid Triangle Formed</div>
            ) : solutions.length === 1 ? (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-3 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Unique Solution Exists</div>
            ) : (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-3 bg-amber-500/15 text-amber-400 border border-amber-500/30">Ambiguous Case: 2 Solutions</div>
            )}

            <div className="space-y-3.5 text-xs text-slate-300">
               {solutions.length === 0 && <p className="text-slate-500 italic">No possible triangles. The side length "a" is too short.</p>}
               {solutions.length === 1 && (
                 <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1.5">
                   <div>Angle B: <span className="font-bold font-mono">{solutions[0].B.toFixed(1)}°</span></div>
                   <div>Angle C: <span className="font-bold font-mono">{solutions[0].C.toFixed(1)}°</span></div>
                   <div>Base Side c: <span className="font-bold font-mono text-indigo-300">{solutions[0].c.toFixed(2)}</span></div>
                 </div>
               )}
               {solutions.length === 2 && (
                 <div className="grid grid-cols-2 gap-3">
                   {solutions.map((s, idx) => (
                     <div key={idx} className={`bg-${idx===0?'indigo':'purple'}-950/20 p-2.5 rounded-lg border border-${idx===0?'indigo':'purple'}-900/30 space-y-1`}>
                       <div className={`font-bold text-${idx===0?'indigo':'purple'}-400`}>Option {idx + 1}</div>
                       <div>Angle B: <span className="font-semibold font-mono">{s.B.toFixed(1)}°</span></div>
                       <div>Angle C: <span className="font-semibold font-mono">{s.C.toFixed(1)}°</span></div>
                       <div>Side c: <span className="font-bold text-slate-200 font-mono">{s.c.toFixed(1)}</span></div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-xl">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Dynamic Layout</h4>
          <span className="text-xs text-indigo-400 font-bold">Height (h = b sin(A)): {h.toFixed(2)}</span>
        </div>
        
        <div className="flex-grow bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center p-4 min-h-[360px]">
          <svg viewBox="0 0 500 350" className="w-full h-full select-none">
            <path d="M 0 300 L 500 300" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="100" y1="50" x2="100" y2="300" stroke="#1e293b" strokeDasharray="2 2" />
            
            <line x1="40" y1={startY} x2="460" y2={startY} stroke="#334155" strokeWidth="2" />
            <text x="40" y={startY + 20} fill="#475569" className="text-[10px]">Baseline x-axis</text>

            <circle cx={startX} cy={startY} r="5" fill="#10b981" />
            <text x={startX - 15} y={startY + 20} fill="#10b981" className="text-xs font-bold">A</text>

            <circle cx={Cx} cy={Cy} r="5" fill="#a855f7" />
            <text x={Cx} y={Cy - 12} fill="#a855f7" className="text-xs font-bold" textAnchor="middle">C</text>

            <line x1={startX} y1={startY} x2={Cx} y2={Cy} stroke="#a855f7" strokeWidth="3" />
            <text x={(startX + Cx)/2 - 10} y={(startY + Cy)/2 - 10} fill="#c084fc" className="text-xs font-semibold">b = {b}</text>

            {solutions.length > 0 ? solutions.map((sol, idx) => {
              const B_x = startX + sol.c * scale;
              const color = idx === 0 ? '#6366f1' : '#ec4899';
              const dash = idx === 1 ? '4 4' : 'none';
              return (
                <g key={idx}>
                  <line x1={Cx} y1={Cy} x2={B_x} y2={startY} stroke={color} strokeWidth="3" strokeDasharray={dash} />
                  <circle cx={B_x} cy={startY} r="5" fill={color} />
                  <text x={B_x} y={startY + 20} fill={color} className="text-xs font-bold" textAnchor="middle">B{idx + 1}</text>
                  <line x1={startX} y1={startY} x2={B_x} y2={startY} stroke={color} strokeWidth="2.5" opacity="0.6" strokeDasharray={dash} />
                </g>
              );
            }) : (
              <g>
                <line x1={Cx} y1={Cy} x2={Cx} y2={startY} stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                <text x={Cx + 8} y={(Cy + startY)/2} fill="#ef4444" className="text-[10px] font-bold">h</text>
              </g>
            )}
          </svg>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// TAB 4: SPHERICAL GEODESICS
// ==========================================
function GeodesicTab() {
  const [lat1, setLat1] = useState(-33.0);
  const [lon1, setLon1] = useState(-71.6);
  const [lat2, setLat2] = useState(31.4);
  const [lon2, setLon2] = useState(121.8);
  const [calcData, setCalcData] = useState(null);

  const compute = useCallback(() => {
    const R = 6371;
    const phi1 = lat1 * Math.PI / 180, phi2 = lat2 * Math.PI / 180;
    const lam1 = lon1 * Math.PI / 180, lam2 = lon2 * Math.PI / 180;
    const dlam = lam2 - lam1;

    const cosAngle = Math.sin(phi1)*Math.sin(phi2) + Math.cos(phi1)*Math.cos(phi2)*Math.cos(dlam);
    const centralAngleCos = Math.acos(Math.max(-1, Math.min(1, cosAngle)));
    const d_slc = R * centralAngleCos;

    const dphi = phi2 - phi1;
    const a_hav = Math.pow(Math.sin(dphi/2), 2) + Math.cos(phi1)*Math.cos(phi2)*Math.pow(Math.sin(dlam/2), 2);
    const centralAngleHav = 2 * Math.asin(Math.sqrt(a_hav));
    const d_hav = R * centralAngleHav;

    setCalcData({ phi1, phi2, lam1, lam2, dlam, cosAngle, centralAngleCos, d_slc, a_hav, centralAngleHav, d_hav });
  }, [lat1, lon1, lat2, lon2]);

  useEffect(() => { compute(); }, [compute]);

  const loadPreset = (e) => {
    const presets = {
      'valparaiso-shanghai': [-33.0, -71.6, 31.4, 121.8],
      'tokyo-nyc': [35.7, 139.7, 40.7, -74.0],
      'london-capetown': [51.5, -0.1, -33.9, 18.4]
    };
    const [l1, ln1, l2, ln2] = presets[e.target.value];
    setLat1(l1); setLon1(ln1); setLat2(l2); setLon2(ln2);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
      <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            <Globe className="text-indigo-500 w-5 h-5" /> Spherical Navigation
          </h3>
        </div>

        <div className="mb-4">
          <label className="text-xs font-bold text-slate-400 block mb-2">Voyage Presets</label>
          <select onChange={loadPreset} className="w-full bg-slate-950 text-slate-300 text-xs border border-slate-800 rounded-lg p-2.5 outline-none">
            <option value="valparaiso-shanghai">Valparaíso, Chile to Shanghai, China</option>
            <option value="tokyo-nyc">Tokyo, Japan to New York, USA</option>
            <option value="london-capetown">London, UK to Cape Town, South Africa</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-indigo-400">Departing Point (1)</h4>
            <InputGeo label="Latitude (°)" val={lat1} set={setLat1} />
            <InputGeo label="Longitude (°)" val={lon1} set={setLon1} />
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-purple-400">Destination Point (2)</h4>
            <InputGeo label="Latitude (°)" val={lat2} set={setLat2} />
            <InputGeo label="Longitude (°)" val={lon2} set={setLon2} />
          </div>
        </div>

        <button onClick={compute} className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all">
          <Calculator className="w-4 h-4" /> Compute Track
        </button>
      </div>

      {calcData && (
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-xl">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Great-Circle Derivation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Spherical Law of Cosines</span>
              <div className="text-base font-bold text-indigo-400 font-mono">{Math.round(calcData.d_slc).toLocaleString()} km</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Haversine Method</span>
              <div className="text-base font-bold text-purple-400 font-mono">{Math.round(calcData.d_hav).toLocaleString()} km</div>
            </div>
          </div>

          <div className="flex-grow bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-400 overflow-y-auto space-y-2">
            <div className="text-indigo-400 font-bold border-b border-slate-800 pb-1 flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5" /> Execution Steps
            </div>
            <p>&gt; Lat1: {calcData.phi1.toFixed(4)} rad, Lon1: {calcData.lam1.toFixed(4)} rad | Lat2: {calcData.phi2.toFixed(4)} rad, Lon2: {calcData.lam2.toFixed(4)} rad</p>
            <p>&gt; delta longitude (Δλ) computed: {calcData.dlam.toFixed(4)} rad</p>
            <p>&gt; Law of Cosines: cos(σ) = {calcData.cosAngle.toFixed(5)} =&gt; Central Angle: {calcData.centralAngleCos.toFixed(4)} rad</p>
            <p>&gt; Haversine Method: a = {calcData.a_hav.toFixed(5)} =&gt; Central Angle: {calcData.centralAngleHav.toFixed(4)} rad</p>
            <p className="text-emerald-400 font-medium">&gt; Optimal Routing completed!</p>
          </div>
        </div>
      )}
    </section>
  );
}

const InputGeo = ({ label, val, set }) => (
  <div>
    <label className="text-[10px] text-slate-400 block">{label}</label>
    <input type="number" step="0.1" value={val} onChange={(e) => set(parseFloat(e.target.value))} className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded p-1.5 outline-none" />
  </div>
);

// ==========================================
// TAB 5: FOURIER SYNTHESIS
// ==========================================
function FourierTab() {
  const [type, setType] = useState('square');
  const [terms, setTerms] = useState(4);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerY = canvas.height / 2;
    const scaleX = 40, scaleY = 60;

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();

    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let px = 0; px < canvas.width; px++) {
      const t = (px - canvas.width / 2) / scaleX;
      let sum = 0;

      if (type === 'square') {
        for (let i = 0; i < terms; i++) {
          const n = 2 * i + 1;
          sum += Math.sin(n * t) / n;
        }
        sum *= (4 / Math.PI);
      } else {
        for (let n = 1; n <= terms; n++) {
          const coeff = (n % 2 === 0) ? -1 : 1;
          sum += coeff * Math.sin(n * t) / n;
        }
        sum *= (2 / Math.PI);
      }

      const py = centerY - (sum * scaleY);
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    const handleResize = () => setTerms((t) => t);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [type, terms]);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            <Waves className="text-indigo-500 w-5 h-5" /> Signal Synthesizer
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-2">Target Waveform Profile</label>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setType('square')} className={`p-2.5 text-xs font-bold rounded-lg transition-all ${type === 'square' ? 'border-indigo-600 bg-indigo-950/40 text-indigo-400 border' : 'border-slate-800 bg-slate-950 text-slate-400 border hover:border-slate-700'}`}>Square Wave</button>
              <button onClick={() => setType('sawtooth')} className={`p-2.5 text-xs font-bold rounded-lg transition-all ${type === 'sawtooth' ? 'border-indigo-600 bg-indigo-950/40 text-indigo-400 border' : 'border-slate-800 bg-slate-950 text-slate-400 border hover:border-slate-700'}`}>Sawtooth Wave</button>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Harmonics Summed (N)</span>
              <span className="text-indigo-400 font-bold font-mono">{terms} terms</span>
            </div>
            <input type="range" min="1" max="50" value={terms} onChange={(e) => setTerms(parseInt(e.target.value))} className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Fourier Formula</h4>
            <p className="text-xs text-slate-300 italic font-mono">
              {type === 'square' ? 'f(t) = (4/π) * [sin(t) + sin(3t)/3 + ...]' : 'f(t) = (2/π) * [sin(t) - sin(2t)/2 + ...]'}
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-xl">
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Live Fourier Series Wave Convergence</h4>
        <div className="relative bg-slate-950 border border-slate-800 rounded-xl p-2 flex-grow overflow-hidden min-h-[340px]">
          <canvas ref={canvasRef} className="w-full h-full block min-h-[300px]" />
        </div>
      </div>
    </section>
  );
}

// ==========================================
// MAIN PAGE LAYOUT
// ==========================================
export default function TrigonometryPlayground() {
  const [activeTab, setActiveTab] = useState('unit-circle');

  const tabs = [
    { id: 'unit-circle', icon: Orbit, label: 'Unit Circle' },
    { id: 'waves', icon: Activity, label: 'Wave Mechanics' },
    { id: 'triangles', icon: TriangleIcon, label: 'Oblique Triangles' },
    { id: 'geodesic', icon: Globe, label: 'Spherical Trig' },
    { id: 'fourier', icon: Waves, label: 'Fourier Synthesis' },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 text-white">
              <Compass className="w-6 h-6 animate-[spin_4s_linear_infinite]" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Trigonometry Sandbox
              </h1>
              <p className="text-xs text-slate-400 font-medium">An Interactive Analytical & Computational Guide</p>
            </div>
          </div>
          
          <nav className="flex flex-wrap bg-slate-950/60 p-1.5 rounded-xl border border-slate-800 gap-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${isActive ? 'text-indigo-400 bg-indigo-950/40 border border-indigo-900/50' : 'text-slate-400 hover:text-white border border-transparent'}`}
                >
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 gap-6">
        {activeTab === 'unit-circle' && <UnitCircleTab />}
        {activeTab === 'waves' && <WavesTab />}
        {activeTab === 'triangles' && <TrianglesTab />}
        {activeTab === 'geodesic' && <GeodesicTab />}
        {activeTab === 'fourier' && <FourierTab />}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-6 px-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Trigonometry Sandbox (Next.js Port).</p>
          <div className="flex gap-4">
            <span className="hover:text-indigo-400 transition-colors cursor-pointer">Analytical Rules</span>
            <span className="hover:text-indigo-400 transition-colors cursor-pointer">Power-Reduction Proofs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}