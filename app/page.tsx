"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase"
import QRCode from "react-qr-code"

export default function Page() {
  const [codigo, setCodigo] = useState("")
  const [qr, setQr] = useState("")

  const generarEntrada = async () => {
    const nuevoCodigo = crypto.randomUUID()
    const { error } = await supabase.from("entradas").insert({
      codigo: nuevoCodigo,
      usado: false,
    })
    if (error) {
      alert("Error al crear entrada")
      console.log(error)
      return
    }
    setCodigo(nuevoCodigo)
    setQr(nuevoCodigo)
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Panel de Entradas 🎟️</h1>
      <button onClick={generarEntrada}>Generar nueva entrada</button>

      {qr && (
        <div style={{ marginTop: 30 }}>
          <QRCode value={qr} />
          <p>{codigo}</p>
          <a
            href={`https://api.whatsapp.com/send?text=${qr}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enviar por WhatsApp
          </a>
        </div>
      )}
    </main>
  )
}