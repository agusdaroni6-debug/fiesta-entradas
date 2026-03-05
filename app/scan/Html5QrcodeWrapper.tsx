"use client"

import dynamic from "next/dynamic"

export const Html5QrcodeWrapper = dynamic(
  async () => {
    const mod = await import("html5-qrcode")
    return mod.Html5Qrcode
  },
  { ssr: false } 
)