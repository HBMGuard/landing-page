"use client"

import { useEffect } from "react"

/**
 * Fades sections in as they scroll into view and counts stat numbers up.
 * Content is fully visible without JavaScript and for visitors who prefer reduced motion:
 * only elements that start below the fold are held back, and only until they appear.
 */
export function Reveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"))
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"))
      return
    }

    const countUp = (root: HTMLElement) => {
      root.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => {
        const to = Number(n.dataset.count)
        const dec = Number(n.dataset.dec || 0)
        const t0 = performance.now()
        const dur = 1100
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / dur)
          n.textContent = (to * (1 - Math.pow(1 - k, 3))).toFixed(dec)
          if (k < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      })
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          if (el.classList.contains("pending")) countUp(el)
          el.classList.remove("pending")
          el.classList.add("in")
          io.unobserve(el)
        })
      },
      { threshold: 0.18 },
    )

    els.forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add("pending")
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return null
}
