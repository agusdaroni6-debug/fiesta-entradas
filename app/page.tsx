'use client'

import { useState } from "react";

export default function Page() {
  const [cantidad, setCantidad] = useState(1);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const precio = 3000;
  const total = cantidad * precio;

  const handleReserva = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombre || !email) {
      alert("Por favor completa todos los campos");
      return;
    }

    const textoPlano = `🎉 NUEVA RESERVA 🎉\n\n` +
      `Nombre: ${nombre}\n` +
      `Email: ${email}\n` +
      `Cantidad: ${cantidad}\n` +
      `Total: $${total}`;

    const mensaje = encodeURIComponent(textoPlano);

    const numero = "5492644558692";

    window.location.href = `https://wa.me/${numero}?text=${mensaje}`;

    setEnviado(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">
          🎉 Fiesta Privé X Suraty
        </h1>
        <p className="text-center text-sm text-gray-500">
          04/04 · Secret Location
        </p>

        <div className="bg-green-500 text-white text-center p-4 rounded-2xl shadow-lg animate-pulse">
          <p className="text-sm font-semibold">💸 TRANSFERIR AL ALIAS:</p>
          <p className="text-2xl font-extrabold tracking-wide">AGUS.DARONI</p>
        </div>

        {enviado ? (
          <div className="text-center space-y-3">
            <h2 className="text-lg font-semibold text-green-600">
              ✅ Redirigiendo a WhatsApp...
            </h2>
            <p className="text-sm">
              Si no se abrió automáticamente, revisa tu WhatsApp.
            </p>
            <p className="font-semibold">Total a transferir: ${total.toLocaleString()}</p>
          </div>
        ) : (
          <form onSubmit={handleReserva} className="space-y-4">
            <div>
              <label className="text-sm">Nombre completo</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border p-2 rounded-lg"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="text-sm">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded-lg"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="text-sm">Cantidad de entradas</label>
              <input
                type="number"
                min="1"
                max="10"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
                className="w-full border p-2 rounded-lg"
              />
            </div>

            <div className="bg-yellow-100 border-2 border-yellow-400 text-yellow-800 p-3 rounded-xl text-center font-bold animate-pulse">
              ⚠️ NO OLVIDES ENVIAR TU COMPROBANTE POR WHATSAPP ⚠️
            </div>

            <div className="text-center font-semibold">
              Total a transferir: ${total.toLocaleString()}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-900 text-white py-3 rounded-2xl text-lg"
            >
              Reservar entrada
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
