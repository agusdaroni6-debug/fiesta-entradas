"use client"

import { useEffect, useRef, useState } from "react"
import { supabase } from "../../lib/supabase"
import { Html5Qrcode } from "html5-qrcode"

export default function ScanPage() {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const [mensaje, setMensaje] = useState("Apunta la cámara al QR")

  useEffect(() => {
    const startScanner = async () => {
      const html5QrCode = new Html5Qrcode("reader")
      scannerRef.current = html5QrCode

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 250
        },
        async (decodedText) => {
          // Cada vez que se escanea un QR
          const codigo = decodedText.replace("https://fiesta-entradas.vercel.app/validar?codigo=", "")

          // Buscar la entrada en Supabase
          const { data, error } = await supabase
            .from("entradas")
            .select("*")
            .eq("codigo", codigo)
            .single()

          if (error || !data) {
            setMensaje("🔴 QR inválido")
            return
          }

          if (data.usado) {
            setMensaje("🔴 Entrada ya usada")
            return
          }

          // Marcar como usado
          await supabase
            .from("entradas")
            .update({ usado: true })
            .eq("codigo", codigo)

          setMensaje("🟢 Entrada válida, ¡bienvenido!")
        },
        (errorMessage) => {
          // Callback de error, podemos ignorarlo
        }
      )
    }

    startScanner()

    return () => {
      scannerRef.current?.stop().catch(() => {})
    }
  }, [])

  return (
    <main style={{padding:40}}>
      <h1>Escáner de Entradas 🎫</h1>
      <div id="reader" style={{width:300, height:300, marginTop:20}} />
      <p style={{marginTop:20, fontSize:20}}>{mensaje}</p>
    </main>
  )
}