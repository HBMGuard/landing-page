import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "HBMGuard + ContextGuard — AI Infrastructure Efficiency",
  description:
    "HBMGuard optimizes GPU, HBM and power efficiency. ContextGuard enforces token budgets, context safety, loop protection and verifiable audit for AI agents.",
  openGraph: {
    title: "HBMGuard + ContextGuard — AI Infrastructure Efficiency",
    description:
      "Evidence-gated efficiency from GPU/HBM/power telemetry to agent context, tokens, loops and audit.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HBMGuard + ContextGuard — AI Infrastructure Efficiency",
    description:
      "Evidence-gated efficiency from GPU/HBM/power telemetry to agent context, tokens, loops and audit.",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0c0f",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
