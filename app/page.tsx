import { ContactForm } from "./contact-form"

export default function Page() {
  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <a className="logo" href="#">
            HBMGuard<span>_</span>
          </a>
          <div className="nav-links">
            <a className="nav-link" href="#problem">
              Problem
            </a>
            <a className="nav-link" href="#how">
              How it works
            </a>
            <a className="nav-link" href="#arch">
              Architecture
            </a>
            <a className="btn-nav" href="#contact">
              Request Pilot
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="container">
          <p className="eyebrow">Runtime GPU Telemetry · Closed-Loop Power Management</p>
          <h1>
            <span className="strike">Wake up an engineer.</span>
            <br />
            Let the cluster <em>heal itself.</em>
          </h1>
          <p className="hero-sub">
            HBMGuard is a bare-metal C++ agent that detects GPU thermal throttling in real-time, cuts power draw by
            hundreds of watts, and automatically drains &amp; restores Slurm nodes — without touching your application
            code.
          </p>
          <div className="hero-ctas">
            <a className="btn-primary" href="#contact">
              Request a Pilot
            </a>
            <a className="btn-secondary" href="#how">
              See how it works
            </a>
          </div>

          {/* Terminal */}
          <div className="terminal-strip">
            <div className="terminal-bar">
              <div className="dot dot-r" />
              <div className="dot dot-y" />
              <div className="dot dot-g" />
              <span className="term-title">hbmguard_agent · node-a100-01 · live</span>
            </div>
            <div className="terminal-body">
              <div>
                <span className="t-dim">[2026-06-18 08:41:03]</span>{" "}
                <span className="t-white">HBMGuard v0.9 — DCGM Profiling API connected</span>
              </div>
              <div>
                <span className="t-dim">[08:41:05]</span>{" "}
                <span className="t-white">SM_CLOCK: 1410 MHz  DRAM_ACTIVE: 94%  PWR: 398W</span>{" "}
                <span className="t-amber">⚠ Memory Wall detected</span>
              </div>
              <div>
                <span className="t-dim">[08:41:05]</span>{" "}
                <span className="t-red">ECO_CTRL: cutting power limit → 150W</span>
              </div>
              <div>
                <span className="t-dim">[08:41:08]</span>{" "}
                <span className="t-amber">SM_CLOCK degraded (sample 1/3): 812 MHz</span>
              </div>
              <div>
                <span className="t-dim">[08:41:11]</span>{" "}
                <span className="t-amber">SM_CLOCK degraded (sample 2/3): 798 MHz</span>
              </div>
              <div>
                <span className="t-dim">[08:41:14]</span>{" "}
                <span className="t-amber">SM_CLOCK degraded (sample 3/3): 805 MHz  → threshold crossed</span>
              </div>
              <div>
                <span className="t-dim">[08:41:14]</span>{" "}
                <span className="t-red">
                  SLURM: scontrol update node=a100-01 state=drain reason=&quot;HBMGuard:thermal_wall&quot;
                </span>
              </div>
              <div>
                <span className="t-dim">[08:42:31]</span>{" "}
                <span className="t-green">SM_CLOCK recovered (sample 3/3): 1395 MHz  → healthy</span>
              </div>
              <div>
                <span className="t-dim">[08:42:31]</span>{" "}
                <span className="t-green">SLURM: scontrol update node=a100-01 state=resume</span>
              </div>
              <div>
                <span className="t-dim">[08:42:31]</span>{" "}
                <span className="t-green">✓ Node back in pool. Elapsed: 88s. Engineers paged: 0.</span>{" "}
                <span className="blink t-dim">█</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-cell">
              <div className="stat-num">250W</div>
              <div className="stat-label">
                Typical power cut
                <br />
                during Memory Wall
              </div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">&lt;15ms</div>
              <div className="stat-label">
                Control loop latency
                <br />
                C++ bare-metal
              </div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">3-sample</div>
              <div className="stat-label">
                False-positive shield
                <br />
                before draining node
              </div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">0</div>
              <div className="stat-label">
                Application code
                <br />
                changes required
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem">
        <div className="container">
          <h2>
            Thermal throttling is a <em>silent tax</em>
            <br />
            on your GPU compute
          </h2>
          <div className="problem-grid">
            <div className="problem-card">
              <span className="tag-red">VISIBILITY</span>
              <h3>You&apos;re paying for full utilization</h3>
              <p>
                HBM thermal throttling degrades compute silently. Your dashboards show &quot;GPU busy&quot; while SM
                Clock quietly drops 30–50%. The bill doesn&apos;t change. The throughput does.
              </p>
            </div>
            <div className="problem-card">
              <span className="tag-red">TOOLING</span>
              <h3>NVML can&apos;t see what DCGM can</h3>
              <p>
                Standard monitoring tools (node_exporter, nvidia-smi) expose power and temperature. They miss the SM
                occupancy vs. DRAM_ACTIVE dissonance that defines the Memory Wall — the actual throttle trigger.
              </p>
            </div>
            <div className="problem-card">
              <span className="tag-red">OPERATIONS</span>
              <h3>Slurm doesn&apos;t know the node is struggling</h3>
              <p>
                Even with perfect local telemetry, a throttled node keeps receiving new jobs from the scheduler. The
                thermal event compounds. Eventually a human gets paged — at 2am — to run{" "}
                <code className="code-inline">scontrol drain</code>. HBMGuard closes this loop automatically, before the
                page goes out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="container">
          <h2>
            The control loop, <em>explained</em>
          </h2>
          <div className="flow-steps">
            <div className="flow-step">
              <div className="step-num">01</div>
              <div className="step-body">
                <span className="step-tag">DETECT</span>
                <h3>Memory Wall detection via DCGM Profiling API</h3>
                <p>
                  The agent samples SM occupancy, DRAM_ACTIVE bandwidth, and power draw every ~2 seconds using
                  DCGM&apos;s Profiling API — bypassing NVML&apos;s limitations. A Memory Wall condition is flagged when
                  DRAM_ACTIVE is saturated while SM efficiency collapses, creating the characteristic power-vs-work
                  dissonance.
                </p>
              </div>
            </div>
            <div className="flow-step">
              <div className="step-num">02</div>
              <div className="step-body">
                <span className="step-tag">ACT</span>
                <h3>Closed-loop power cut: 400W → 150W in milliseconds</h3>
                <p>
                  On detection, the C++ ECO Controller issues an NVML power cap command. The power cut forces the GPU to
                  operate within its thermal envelope without interrupting the running workload. This is confirmed live
                  on a GCP A100 Spot instance with Grafana validation.
                </p>
              </div>
            </div>
            <div className="flow-step">
              <div className="step-num">03</div>
              <div className="step-body">
                <span className="step-tag">CORDON</span>
                <h3>3-sample shield → Slurm DRAIN, zero false positives</h3>
                <p>
                  If SM Clock degradation persists across 3 consecutive samples, the agent issues a Slurm drain with a
                  machine-readable reason string. New jobs are blocked. The 3-sample buffer eliminates false positives
                  from transient spikes — a deliberate tradeoff tuned from live workload data.
                </p>
              </div>
            </div>
            <div className="flow-step">
              <div className="step-num">04</div>
              <div className="step-body">
                <span className="step-tag">RECOVER</span>
                <h3>Auto-RESUME the moment hardware is healthy</h3>
                <p>
                  Recovery applies the same 3-sample logic in reverse. Three consecutive healthy SM Clock readings
                  trigger an automatic <code className="code-inline">state=resume</code>. The node rejoins the cluster
                  pool without human intervention. The full IDLE → DRAIN → IDLE state machine is validated and running.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section id="arch">
        <div className="container">
          <h2>
            Built for the cluster,
            <br />
            <em>not the dashboard</em>
          </h2>
          <div className="arch-grid">
            <div className="arch-card">
              <h3>What&apos;s running today</h3>
              <div className="arch-item">
                <div className="arch-dot" />
                <div className="arch-item-body">
                  <div className="arch-item-title">C++ ECO/Power Controller</div>
                  <div className="arch-item-sub">DCGM Profiling API · NVML actuator · &lt;15ms loop</div>
                </div>
              </div>
              <div className="arch-item">
                <div className="arch-dot" />
                <div className="arch-item-body">
                  <div className="arch-item-title">Slurm Integration</div>
                  <div className="arch-item-sub">IDLE → DRAIN → IDLE state machine · drain reason strings</div>
                </div>
              </div>
              <div className="arch-item">
                <div className="arch-dot" />
                <div className="arch-item-body">
                  <div className="arch-item-title">Prometheus Exporter</div>
                  <div className="arch-item-sub">4 real metrics · flush_thread · zero hot-path overhead</div>
                </div>
              </div>
              <div className="arch-item">
                <div className="arch-dot" />
                <div className="arch-item-body">
                  <div className="arch-item-title">SQLite Telemetry Store</div>
                  <div className="arch-item-sub">WAL mode · async writer · real DCGM data confirmed</div>
                </div>
              </div>
            </div>
            <div className="arch-card">
              <h3>Architectural principles</h3>
              <div className="arch-item">
                <div className="arch-dot" />
                <div className="arch-item-body">
                  <div className="arch-item-title">C++ controls the hot path</div>
                  <div className="arch-item-sub">No network dependency for emergency power cuts</div>
                </div>
              </div>
              <div className="arch-item">
                <div className="arch-dot" />
                <div className="arch-item-body">
                  <div className="arch-item-title">Prometheus is read-only</div>
                  <div className="arch-item-sub">Observability layer never triggers control decisions</div>
                </div>
              </div>
              <div className="arch-item">
                <div className="arch-dot" />
                <div className="arch-item-body">
                  <div className="arch-item-title">Zero application changes</div>
                  <div className="arch-item-sub">Deploy as a sidecar daemon; workloads are unaware</div>
                </div>
              </div>
              <div className="arch-item">
                <div className="arch-dot" />
                <div className="arch-item-body">
                  <div className="arch-item-title">SM Clock, not temperature</div>
                  <div className="arch-item-sub">Temperature is a lagging indicator; clock degradation is the signal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="cta-box">
            <p className="eyebrow" style={{ marginBottom: 16 }}>
              Early Access · Pilot Program
            </p>
            <h2>
              Run HBMGuard on
              <br />
              <em>your</em> cluster
            </h2>
            <p>
              We&apos;re working with a small number of AI inference providers and HPC operators to validate HBMGuard on
              their GPU fleets. If you&apos;re running A100 / H100 / H200 nodes on Slurm and you&apos;re tired of thermal
              surprises, let&apos;s talk.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">HBMGuard — GPU thermal intelligence</div>
            <div className="footer-links">
              <a
                href="https://www.linkedin.com/feed/update/urn:li:activity:7472996360217280513/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href="mailto:contact@bzichimem.com">contact@bzichimem.com</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
