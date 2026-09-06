"use client"

import { useState } from "react"

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [btnText, setBtnText] = useState("Request an Efficiency Pilot →")
  const [status, setStatus] = useState<{ message: string; color: string } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const originalBtnText = "Request an Efficiency Pilot →"
    setSubmitting(true)
    setBtnText("Sending...")
    setStatus(null)

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })

      if (response.ok) {
        form.reset()
        setStatus({ message: "✓ Request received — we'll be in touch shortly.", color: "var(--green)" })
        setBtnText("Sent ✓")
      } else {
        throw new Error("Submission failed")
      }
    } catch (err) {
      setStatus({
        message: "✗ Something went wrong. Email us directly at contact@bzichimem.com",
        color: "var(--red)",
      })
      setSubmitting(false)
      setBtnText(originalBtnText)
    }
  }

  return (
    <>
      <form
        className="form-row"
        id="contact-form"
        action="https://formspree.io/f/xeewbglg"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="_subject" value="New HBMGuard Pilot Request" />
        <input type="text" name="name" placeholder="Your name" required />
        <input type="email" name="email" placeholder="Work email" required />
        <input type="text" name="company" placeholder="Company / Organization" />
        <select name="setup" defaultValue="">
          <option value="" disabled>
            Your AI / GPU environment (approx.)
          </option>
          <option value="1-10">1–10 GPUs</option>
          <option value="10-100">10–100 GPUs</option>
          <option value="100-1000">100–1000 GPUs</option>
          <option value="1000+">1000+ GPUs</option>
          <option value="cloud-spot">Primarily cloud spot (GCP / AWS)</option>
        </select>
        <textarea name="message" placeholder="What AI infrastructure or agent-efficiency problem are you trying to solve? (optional)" />
        <button
          className="btn-primary"
          type="submit"
          style={{ alignSelf: "flex-start", opacity: submitting ? 0.6 : 1 }}
          disabled={submitting}
        >
          {btnText}
        </button>
        <p className="form-note">Private deployment. Evidence-gated optimization. Just a technical conversation.</p>
      </form>
      <div id="form-status" style={status ? { display: "block", color: status.color } : undefined}>
        {status?.message}
      </div>
    </>
  )
}
