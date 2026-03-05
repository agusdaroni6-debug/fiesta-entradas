"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function AdminPanel() {

  const [total, setTotal] = useState(0)
  const [usadas, setUsadas] = useState(0)
  const [restantes, setRestantes] = useState(0)

  const cargarDatos = async () => {

    const { data } = await supabase
      .from("entradas")
      .select("*")

    if (!data) return

    const totalEntradas = data.length
    const usadasEntradas = data.filter(e => e.usado).length

    setTotal(totalEntradas)
    setUsadas(usadasEntradas)
    setRestantes(totalEntradas - usadasEntradas)
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  return (
    <main style={{padding:40}}>

      <h1>Panel del Evento 🎉</h1>

      <div style={{marginTop:30,fontSize:22}}>
        <p>🎟️ Entradas generadas: {total}</p>
        <p>✅ Entradas usadas: {usadas}</p>
        <p>🚪 Entradas restantes: {restantes}</p>
      </div>

      <button onClick={cargarDatos} style={{marginTop:20}}>
        Actualizar datos
      </button>

    </main>
  )
}