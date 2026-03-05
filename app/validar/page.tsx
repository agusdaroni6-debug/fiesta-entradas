"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase"
import QRCode from "react-qr-code"

export default function Page() {
  const [codigo, setCodigo] = useState("")
  const [qr, setQr] = useState("")

  const generarEntrada = async () => {
    try {
      const nuevoCodigo = crypto.randomUUID()

      const { error } = await supabase
        .from("entradas")
        .insert({
          codigo: nuevoCodigo,
          usado: false
        })

      if (error) {
        console.log(error)
        alert("Error al generar entrada")
        return
      }

      // Creamos el link completo de la entrada
      const linkQR = `https://fiesta-entradas.vercel.app/validar?codigo=${nuevoCodigo}`

      setCodigo(nuevoCodigo)
      setQr(linkQR)
    } catch (err) {
      console.log(err)
      alert("Ocurrió un error inesperado")
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Panel de Entradas 🎟️</h1>

      <button onClick={generarEntrada} style={{ padding: "10px 20px", fontSize: 16 }}>
        Generar nueva entrada
      </button>

      {/* Esto se muestra solo si hay un QR generado */}
      {qr && (
        <div style={{ marginTop: 30 }}>
          <QRCode value={qr} />

          <p style={{ fontWeight: "bold", marginTop: 10 }}>{codigo}</p>

          <a
            href={`https://wa.me/?text=🎟️ Tu entrada para la fiesta:%0A${qr}`}
            target="_blank"
          >
            <button style={{ marginTop: 20, padding: "10px 15px", fontSize: 16 }}>
              Enviar por WhatsApp
            </button>
          </a>
        </div>
      )}
    </main>
  )
}