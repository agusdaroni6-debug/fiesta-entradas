"use client"

import { useEffect, useRef, useState } from "react"
import { supabase } from "../../lib/supabase"
import { Html5QrcodeWrapper } from "./Html5QrcodeWrapper"

export default function ScanPage() {
  const scannerRef = useRef<any | null>(null)
  const [resultado, setResultado] = useState("")

  useEffect(() => {
    const startScanner = async () => {
      const Html5Qrcode = await Html5QrcodeWrapper
      const scanner = new Html5Qrcode("reader")
      scannerRef.current = scanner

      scanner
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          async (decodedText: string) => {
            const { data, error } = await supabase
              .from("entradas")
              .select("*")
              .eq("codigo", decodedText)
              .single()

            if (error || !data) {
              setResultado("QR inválido ❌")
              return
            }

            if (data.usado) {
              setResultado("Entrada ya usada ⚠️")
              return
            }

            await supabase.from("entradas").update({ usado: true }).eq("id", data.id)
            setResultado("Entrada válida ✅")
          },
          (errorMessage: string) => {
            console.warn(errorMessage)
          }
        )
        .catch((err: any) => console.error(err))
    }

    startScanner()

    return () => {
      scannerRef.current?.stop().catch(() => {})
    }
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Escaneo de Entradas 🎫</h1>
      <div id="reader" style={{ width: 300, height: 300 }}></div>
      {resultado && <p>{resultado}</p>}
    </div>
  )
}