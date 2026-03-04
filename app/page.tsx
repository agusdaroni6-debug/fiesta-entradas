'use client'

import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

export default function Page() {
  const [cantidad, setCantidad] = useState(1);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  // 🔐 ADMIN PROTEGIDO
  const [adminMode, setAdminMode] = useState(false);
  const [qrGenerado, setQrGenerado] = useState("");

  const precio = 3000;
  const total = cantidad * precio;

  // Solo activa admin si la URL tiene ?panel=TUCLAVESECRETA
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const clave = params.get("panel");

      if (clave === "admin4935seguro") {
        setAdminMode(true);
      }
    }
  }, []);

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

    window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
    setEnviado(true);
  };

  const generarQR = () => {
    const codigoUnico = `ENTRADA-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    setQrGenerado(codigoUnico);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">
          🎉 Fiesta Privé X Suraty
        </h1>

        {/* 🔐 PANEL ADMIN INVISIBLE PARA OTROS */}
        {adminMode && (
          <div className="border-2 border-green-500 p-4 rounded-xl space-y-3">
            <h2 className="text-center font-bold text-green-600">
              🔐 PANEL ADMIN ACTIVO
            </h2>

            <button
              onClick={generarQR}
              className="w-full bg-green-600 text-white py-2 rounded-xl"
            >
              Confirmar Pago y Generar QR
            </button>

            {qrGenerado && (
              <div className="flex flex-col items-center space-y-2">
                <QRCode value={qrGenerado} size={180} />
                <p className="text-xs break-all">{qrGenerado}</p>
              </div>
            )}
          </div>
        )}

        {!adminMode && (
          <>
            <div className="bg-green-500 text-white text-center p-4 rounded-2xl shadow-lg">
              <p className="text-sm font-semibold">💸 TRANSFERIR AL ALIAS:</p>
              <p className="text-2xl font-extrabold tracking-wide">AGUS.DARONI</p>
            </div>

            {enviado ? (
              <div className="text-center space-y-4">
                <h2 className="text-lg font-semibold text-green-600">
                  ✅ Reserva enviada
                </h2>
                <p>Enviá tu comprobante por WhatsApp.</p>
                <div className="bg-purple-100 border-2 border-purple-400 text-purple-900 p-3 rounded-xl font-semibold">
                  🎟️ El QR se enviará ÚNICAMENTE después de confirmar tu transferencia.
                </div>
                <p className="font-semibold">
                  Total: ${total.toLocaleString()}
                </p>
              </div>
            ) : (
              <form onSubmit={handleReserva} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                />

                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                />

                <input
                  type="number"
                  min="1"
                  max="10"
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  className="w-full border p-2 rounded-lg"
                />

                <div className="bg-yellow-100 border-2 border-yellow-400 text-yellow-800 p-3 rounded-xl text-center font-bold">
                  ⚠️ NO OLVIDES ENVIAR TU COMPROBANTE POR WHATSAPP ⚠️
                </div>

                <div className="text-center font-semibold">
                  Total: ${total.toLocaleString()}
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-900 text-white py-3 rounded-2xl text-lg"
                >
                  Reservar entrada
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
