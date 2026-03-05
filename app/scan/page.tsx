"use client"

import { useEffect, useRef, useState } from "react"
import { supabase } from "../../lib/supabase"
import { Html5Qrcode } from "html5-qrcode"

export default function ScanPage() {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const [resultado, setResultado] = useState("")

  useEffect(() => {
    const scanner = new Html5Qrcode("reader")
    scannerRef.current = scanner

    scanner
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 250,
        },
        async (decodedText) => {
          // Validar en Supabase
          const { data, error } = await supabase
            .from("entradas")
            .select("*")
            .eq("codigo", decodedText)
            .single()

          if (error || !data) {
            setResultado("QR inválido")
            return
          }

          if (data.usado) {
            setResultado("Entrada ya usada")
            return
          }

          // Marcar como usado
          await supabase
            .from("entradas")
            .update({ usado: true })
            .eq("id", data.id)

          setResultado("Entrada válida ✅")
        },
        (errorMessage) => {
          console.warn(errorMessage)
        }
      )
      .catch((err) => console.error(err))

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