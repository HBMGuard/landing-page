"use client"

import { useState } from "react"

const SUBMIT_TEXT = "Request a site pilot →"

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [btnText, setBtnText] = useState(SUBMIT_TEXT)
  const [status, setStatus] = useState<{ message: string; ok: boolean } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setSubmitting(true)
    setBtnText("Sending...")
    setStatus(null)

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
      if (!response.ok) throw new Error("Submission failed")
      form.reset()
      setStatus({ message: "✓ Request received. We'll reply by email.", ok: true })
      setBtnText("Sent ✓")
    } catch {
      setStatus({ message: "✗ Something went wrong. Email us at contact@bzichimem.com", ok: false })
      setSubmitting(false)
      setBtnText(SUBMIT_TEXT)
    }
  }

  return (
    <>
      <form className="pilot-form" id="contact-form" action="https://formspree.io/f/xeewbglg" method="POST" onSubmit={handleSubmit}>
        <input type="hidden" name="_subject" value="New site pilot request" />
        <div className="row2">
          <label>
            Name
            <input type="text" name="name" required autoComplete="name" />
          </label>
          <label>
            Work email
            <input type="email" name="email" required autoComplete="email" />
          </label>
        </div>
        <div className="row2">
          <label>
            Company
            <input type="text" name="company" autoComplete="organization" />
          </label>
          <label>
            Site stage
            <select name="site_stage" defaultValue="">
              <option value="" disabled>
                Choose one
              </option>
              <option value="planning">Planning</option>
              <option value="connection-commitment">Connection commitment</option>
              <option value="under-construction">Under construction</option>
              <option value="operating">Operating</option>
            </select>
          </label>
        </div>
        <label>
          Planned IT load
          <select name="it_load" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            <option value="under-10mw">Under 10 MW</option>
            <option value="10-50mw">10–50 MW</option>
            <option value="50-200mw">50–200 MW</option>
            <option value="over-200mw">Over 200 MW</option>
          </select>
        </label>
        <label>
          The power decision you need to make
          <textarea name="message" />
        </label>
        <button className="submit" type="submit" disabled={submitting} style={{ opacity: submitting ? 0.6 : 1 }}>
          {btnText}
        </button>
        <p className="form-note">We reply by email. Aggregated site data is enough for a first assessment.</p>
      </form>
      {status && (
        <div id="form-status" className={status.ok ? "ok" : "err"} role="status">
          {status.message}
        </div>
      )}
    </>
  )
}
