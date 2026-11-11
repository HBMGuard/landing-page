import type { CSSProperties } from "react"
import { ContactForm } from "./contact-form"
import { GridLimitGraphic, ShedCurveChart, StepResponseChart } from "./charts"
import { Reveal } from "./reveal"

const len = (n: number) => ({ "--len": n }) as CSSProperties

const planning = [
  {
    title: "Grid connection",
    body: "Build the consumption profile a connection request needs: operating regime, ramp rates, operation during shedding hours and planned growth for each phase.",
    icon: <path className="draw" style={len(60)} d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  },
  {
    title: "Load curtailment",
    body: "Test which GPU workloads can run at lower power or wait, while priority services stay within their response-time targets.",
    icon: <path className="draw" style={len(60)} d="M3 17h4l3-8 4 10 3-6h4" />,
  },
  {
    title: "Backup power",
    body: "Size the MW and MWh backup must cover in a shedding event, up to 70% of load for six hours under the proposed rules, net of what flexible compute can shed.",
    icon: (
      <>
        <rect className="draw" style={len(60)} x="3" y="7" width="16" height="10" rx="2" />
        <path d="M21 10v4" />
        <path className="draw" style={len(20)} d="M7 12h6" />
      </>
    ),
  },
]

const steps = [
  {
    n: "01 · INPUTS",
    title: "Site inputs",
    body: "A planned or measured load profile, grid import limits, backup assumptions and the mix of priority and deferrable workloads. Aggregated data is enough to start.",
  },
  {
    n: "02 · MEASURE",
    title: "Cloud tests and site model",
    body: "Board power, response time, throughput and recovery on workloads like yours, then the effect on the whole facility using your site inputs.",
  },
  {
    n: "03 · DELIVER",
    title: "What you receive",
    body: "A demand profile, a comparison of curtailment scenarios, and an estimate of backup power and energy for your engineering team to review.",
  },
]

export default function Page() {
  return (
    <>
      <div className="bz-bg" aria-hidden="true" />
      <nav>
        <div className="container nav-inner">
          <a className="logo" href="#hero">
            BZICHIMEM<span>_</span>
          </a>
          <div className="nav-links">
            <a className="nav-link" href="#results">
              Measurements
            </a>
            <a className="nav-link" href="#planning">
              Site planning
            </a>
            <a className="nav-link" href="#pilot">
              Pilot scope
            </a>
            <a className="btn-nav" href="#contact">
              Discuss a Pilot
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section id="hero" className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">For data center developers and energy partners</p>
              <h1>
                Measured flexibility
                <br />
                for <em>AI data centers</em>
              </h1>
              <p className="hero-sub">
                We measure how far GPU power can drop, and how fast, while AI services keep their response-time
                targets. Then we turn it into a site model: how much load can be shed during a grid limit, and how much
                backup is still needed.
              </p>
              <div className="hero-ctas">
                <a className="btn-primary" href="#contact">
                  Discuss a site pilot <span aria-hidden="true">→</span>
                </a>
                <a className="btn-secondary" href="#results">
                  See the H100 results
                </a>
              </div>
            </div>
            <GridLimitGraphic />
          </div>
        </section>

        <div className="why">
          <div className="container why-inner reveal">
            <span className="why-badge">Why now</span>
            <div className="why-body">
              <p>
                Under rules proposed by Israel&apos;s Electricity Authority, from 2028 the system operator could cut a
                data center&apos;s supply to 30% of its connection, for up to 200 hours a year.{" "}
                <span>
                  Developers need to know how much of their load can flex, and how much backup is still left to build.
                </span>
              </p>
              <dl className="why-facts">
                <div>
                  <dt>
                    <span data-count="30">30</span>%
                  </dt>
                  <dd>of the connection: the lowest supply during a shedding event</dd>
                </div>
                <div>
                  <dt>
                    <span data-count="200">200</span> h
                  </dt>
                  <dd>of shedding a year at most</dd>
                </div>
                <div>
                  <dt>2–6 h</dt>
                  <dd>longest event: 2 h on under a day&apos;s notice, 6 h on 48 hours&apos; notice</dd>
                </div>
              </dl>
              <p className="why-note">
                The Authority is also weighing criteria for priority in the connection queue, and flexibility services
                to the grid are one of the options.
              </p>
            </div>
          </div>
        </div>

        <section id="results" className="section">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">Measured on one NVIDIA H100</p>
              <h2>How much power AI inference can give back</h2>
              <p className="lead">
                A language-model server under full load, with the GPU power limit stepped from 700 W down to 200 W.
                Each level was measured three times.
              </p>
            </div>
            <div className="stats">
              <div className="stat reveal">
                <div className="stat-value">
                  <span data-count="21">21</span>
                  <small>%</small>
                </div>
                <div className="stat-label">less power at 93% of throughput</div>
                <div className="stat-note">631 W → 499 W, 500 W limit</div>
              </div>
              <div className="stat reveal">
                <div className="stat-value">
                  <span data-count="30">30</span>
                  <small>%</small>
                </div>
                <div className="stat-label">less power with latency targets met</div>
                <div className="stat-note">at 60% load, 400 W limit</div>
              </div>
              <div className="stat reveal">
                <div className="stat-value">
                  <span data-count="0.6" data-dec="1">
                    0.6
                  </span>
                  <small>s</small>
                </div>
                <div className="stat-label">to reach a new power level</div>
                <div className="stat-note">90% of the drop, slowest of 5 steps</div>
              </div>
              <div className="stat reveal">
                <div className="stat-value">
                  <span data-count="0.09" data-dec="2">
                    0.09
                  </span>
                  <small>s</small>
                </div>
                <div className="stat-label">back to work after a pause</div>
                <div className="stat-note">119 W idle with the model loaded</div>
              </div>
            </div>
            <div className="chart-row">
              <div className="panel reveal">
                <h3>Throughput kept as power drops</h3>
                <p>Share of full-power throughput against share of full-power draw. Everything above the grey line is work kept.</p>
                <ShedCurveChart />
              </div>
              <div className="panel reveal">
                <h3>Power after a limit command</h3>
                <p>GPU power under load. The limit is applied at 0 s and lifted at 10 s.</p>
                <StepResponseChart />
              </div>
            </div>
            <p className="fine reveal">
              One NVIDIA H100 80 GB on Google Cloud, Qwen2.5-7B-Instruct on vLLM, 64 concurrent requests, November
              2026. Latency targets: 95% of requests get a first token within 1 s and each further token within 50 ms.
              GPU board power only: server, cooling and conversion losses are modeled per site, not measured here.
            </p>
          </div>
        </section>

        <section id="planning" className="section">
          <div className="container">
            <div className="section-head reveal">
              <h2>Plan the connection, curtailment and backup</h2>
              <p className="lead">Three decisions for each connection phase, made with measured numbers instead of nameplate assumptions.</p>
            </div>
            <div className="cards">
              {planning.map((c) => (
                <div className="card reveal" key={c.title}>
                  <div className="icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {c.icon}
                    </svg>
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pilot" className="section">
          <div className="container">
            <div className="section-head reveal">
              <h2>Pilot scope for one site</h2>
              <p className="lead">Start with one connection phase or one operating scenario, and the decision your project team needs to make.</p>
            </div>
            <div className="flow" aria-hidden="true" />
            <div className="steps">
              {steps.map((s) => (
                <div className="step reveal" key={s.title}>
                  <div className="step-num">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container contact-grid">
            <div className="reveal">
              <h2>Discuss a site pilot</h2>
              <p className="lead">
                Tell us which site or connection phase you are planning and the power decision you need to make. A short
                description is enough for the first conversation.
              </p>
            </div>
            <div className="reveal">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container foot">
          <span>
            <span className="foot-logo">BZICHIMEM</span> · Measured flexibility for AI data centers
          </span>
          <a href="mailto:contact@bzichimem.com">contact@bzichimem.com</a>
        </div>
      </footer>
      <Reveal />
    </>
  )
}
