import type { CSSProperties } from "react"
import { SHED_CURVE, STEP_RELEASE_S, STEP_TRACE_200W } from "./h100-measurements"

const len = (n: number) => ({ "--len": n }) as CSSProperties

/** Throughput kept against GPU power drawn, both as a share of the full-power value. */
export function ShedCurveChart() {
  // x: 20%..100% of full power → 56..540 ; y: 0%..100% of throughput → 246..30
  const x = (pct: number) => 56 + (pct - 20) * 6.05
  const y = (pct: number) => 246 - pct * 2.16
  const pts = [...SHED_CURVE].sort((a, b) => a.powerPct - b.powerPct)
  const d = "M" + pts.map((p) => `${x(p.powerPct).toFixed(1)} ${y(p.throughputPct).toFixed(1)}`).join(" L")
  const lowest = pts[0]
  const marked = pts.find((p) => p.limitW === 500)!
  return (
    <svg
      className="chart chart-wide"
      viewBox="0 0 560 300"
      role="img"
      aria-label="Line chart. At 79% of full power the server kept 93% of its throughput; at 63% of power it kept 85%; at 47% it kept 60%; at 34% it kept 40%."
    >
      <g stroke="rgba(226,232,240,.07)">
        {[30, 84, 138, 192, 246].map((v) => (
          <line key={v} x1="56" x2="540" y1={v} y2={v} />
        ))}
      </g>
      <g className="tick" textAnchor="end">
        <text x="48" y="34">100%</text>
        <text x="48" y="88">75%</text>
        <text x="48" y="142">50%</text>
        <text x="48" y="196">25%</text>
        <text x="48" y="250">0%</text>
      </g>
      <g className="tick" textAnchor="middle">
        {[20, 40, 60, 80, 100].map((v) => (
          <text key={v} x={x(v)} y="268">
            {v}%
          </text>
        ))}
      </g>
      <text className="axlab" x="298" y="292" textAnchor="middle">
        GPU power drawn, share of full
      </text>
      <line x1={x(20)} y1={y(20)} x2={x(100)} y2={y(100)} stroke="rgba(226,232,240,.3)" />
      <text className="tick diag" x="250" y="150" transform="rotate(-19.6 250 150)">
        power and work falling together
      </text>
      <path className="draw-on" style={len(640)} d={d} fill="none" stroke="var(--green)" strokeWidth="2.4" strokeLinejoin="round" />
      <g fill="var(--green)" stroke="var(--bg-card)" strokeWidth="2">
        {pts.map((p) => (
          <circle key={p.limitW} cx={x(p.powerPct)} cy={y(p.throughputPct)} r={p === marked ? 6 : 4.5} />
        ))}
      </g>
      <g className="chart-note">
        <text x={x(marked.powerPct) - 8} y="30" textAnchor="end">
          {Math.round(marked.throughputPct)}% at {Math.round(marked.powerPct)}% power
        </text>
        <text x={x(lowest.powerPct) - 10} y={y(lowest.throughputPct)} textAnchor="end" dominantBaseline="middle">
          {Math.round(lowest.throughputPct)}%
        </text>
      </g>
    </svg>
  )
}

/** GPU power over time around one limit command (measured, 0.1 s samples). */
export function StepResponseChart() {
  // x: seconds → 75 + 12.5·t ; y: watts → 250 − 0.28·W
  const x = (t: number) => 75 + t * 12.5
  const y = (w: number) => 250 - w * 0.28
  const d = "M" + STEP_TRACE_200W.map(([t, w]) => `${x(t).toFixed(1)} ${y(w).toFixed(1)}`).join(" L")
  return (
    <svg
      className="chart"
      viewBox="0 0 320 300"
      role="img"
      aria-label="Line chart. Under load the GPU draws about 600 W. After a 200 W limit command its power falls to about 220 W within a quarter of a second, holds there, and returns as soon as the limit is lifted at 10 seconds."
    >
      <g stroke="rgba(226,232,240,.07)">
        {[40, 110, 180, 250].map((v) => (
          <line key={v} x1="40" x2="310" y1={v} y2={v} />
        ))}
      </g>
      <g className="tick" textAnchor="end">
        <text x="34" y="44">750</text>
        <text x="34" y="114">500</text>
        <text x="34" y="184">250</text>
        <text x="34" y="254">0 W</text>
      </g>
      <g className="tick" textAnchor="middle">
        <text x={x(0)} y="268">0 s</text>
        <text x={x(10)} y="268">10 s</text>
      </g>
      <line x1={x(0)} x2={x(0)} y1="30" y2="250" stroke="rgba(245,166,35,.55)" strokeDasharray="3 4" />
      <line x1={x(STEP_RELEASE_S)} x2={x(STEP_RELEASE_S)} y1="30" y2="250" stroke="rgba(226,232,240,.25)" strokeDasharray="3 4" />
      <path className="draw-on" style={len(1400)} d={d} fill="none" stroke="var(--green)" strokeWidth="2" strokeLinejoin="round" />
      <text className="tick" x={x(0) + 5} y="232">
        limit on
      </text>
      <text className="tick" x={x(STEP_RELEASE_S) + 4} y="232">
        lifted
      </text>
    </svg>
  )
}

/** Illustration: a site's load over one day with a grid limit in the middle. */
export function GridLimitGraphic() {
  return (
    <div
      className="grid-card"
      role="img"
      aria-label="Illustration: a data center's load over one day. During a grid limit, flexible compute lowers the load, backup covers what is still above the grid import cap, and the load recovers afterwards."
    >
      <div className="gc-head">
        <span className="gc-title">Site load during a grid limit</span>
        <span className="gc-live">
          <i />
          illustration
        </span>
      </div>
      <svg className="gc-svg" viewBox="0 0 520 250" aria-hidden="true">
        <defs>
          <linearGradient id="gc-load" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#00ff88" stopOpacity=".3" />
            <stop offset="1" stopColor="#00ff88" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gc-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#38bdf8" stopOpacity=".55" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity=".18" />
          </linearGradient>
          <marker id="gc-arrow" viewBox="0 0 10 10" refX="5" refY="8" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M1 3 L5 8 L9 3" fill="none" stroke="#e2e8f0" strokeWidth="1.4" />
          </marker>
        </defs>
        <g stroke="rgba(226,232,240,.07)">
          {[40, 95, 150, 205].map((v) => (
            <line key={v} x1="40" x2="510" y1={v} y2={v} />
          ))}
        </g>
        <rect x="228" y="24" width="120" height="181" fill="rgba(245,166,35,.07)" stroke="rgba(245,166,35,.4)" strokeDasharray="3 4" />
        <text className="gc-label gc-amber" x="288" y="17" textAnchor="middle">
          GRID LIMIT
        </text>
        <path
          d="M40 120 C80 112 110 96 150 84 S210 60 228 62 L240 112 L336 112 L350 70 C380 66 420 82 460 96 S500 108 510 104 L510 205 L40 205 Z"
          fill="url(#gc-load)"
        />
        <rect className="gc-backup" x="240" y="112" width="96" height="38" fill="url(#gc-back)" />
        <path d="M228 62 C260 58 300 56 350 70" fill="none" stroke="rgba(226,232,240,.5)" strokeWidth="1.5" strokeDasharray="4 5" />
        <path
          className="gc-line"
          pathLength={1000}
          d="M40 120 C80 112 110 96 150 84 S210 60 228 62 L240 112 L336 112 L350 70 C380 66 420 82 460 96 S500 108 510 104"
          fill="none"
          stroke="#00ff88"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <line x1="228" x2="348" y1="150" y2="150" stroke="#f5a623" strokeWidth="1.6" />
        <path d="M296 66 V104" stroke="#e2e8f0" strokeWidth="1.2" markerEnd="url(#gc-arrow)" />
        <text className="gc-label gc-amber" x="352" y="154">
          grid import cap
        </text>
        <text className="gc-label" x="289" y="90" textAnchor="end">
          flex
        </text>
        <g className="gc-playhead">
          <line x1="40" x2="40" y1="24" y2="205" stroke="rgba(226,232,240,.4)" />
          <circle cx="40" cy="24" r="3" fill="#e2e8f0" />
        </g>
        <path d="M20 236 H500" stroke="rgba(0,255,136,.35)" strokeWidth="1.4" className="gc-flow" />
        <g className="gc-label gc-dim">
          <text x="40" y="224">00:00</text>
          <text x="275" y="224" textAnchor="middle">12:00</text>
          <text x="510" y="224" textAnchor="end">24:00</text>
        </g>
      </svg>
      <div className="gc-legend">
        <span>
          <b style={{ background: "#00ff88" }} />
          site load
        </span>
        <span>
          <b style={{ background: "rgba(226,232,240,.5)" }} />
          demand without flexibility
        </span>
        <span>
          <b style={{ background: "#38bdf8" }} />
          backup
        </span>
        <span>
          <b style={{ background: "#f5a623" }} />
          grid import cap
        </span>
      </div>
      <div className="gc-readout">
        <div>
          <small>GPU power</small>
          <strong>−30%</strong>
        </div>
        <div>
          <small>response</small>
          <strong>&lt;1 s</strong>
        </div>
        <div>
          <small>latency targets</small>
          <strong className="gc-ok">met</strong>
        </div>
      </div>
    </div>
  )
}
