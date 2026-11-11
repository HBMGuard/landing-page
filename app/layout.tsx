import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Bzichimem | Measured flexibility for AI data centers",
  description:
    "We measure how far GPU power can drop, and how fast, while AI services keep their response-time targets, then model how much load a data center can shed during a grid limit and how much backup it still needs.",
  openGraph: {
    title: "Bzichimem | Measured flexibility for AI data centers",
    description:
      "On one NVIDIA H100, a language-model server kept 93% of its throughput with 21% less power. Site models for grid connection, curtailment and backup.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bzichimem | Measured flexibility for AI data centers",
    description:
      "On one NVIDIA H100, a language-model server kept 93% of its throughput with 21% less power. Site models for grid connection, curtailment and backup.",
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
