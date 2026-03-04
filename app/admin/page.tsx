'use client'

import { useState } from "react";
import QRCode from "react-qr-code";

export default function Admin() {
  const [qr, setQr] = useState("");

  const generarQR = () => {
    const codigo = `ENTRADA-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    setQr(codigo);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center space-y-6">
        <h1 className="text-2xl font-bold">🔐 Panel Admin</h1>

        <button
          onClick={generarQR}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
        >
          Confirmar Pago y Generar QR
        </button>

        {qr && (
          <div className="flex flex-col items-center space-y-3">
            <QRCode value={qr} size={200} />
            <p className="text-xs break-all">{qr}</p>
          </div>
        )}
      </div>
    </div>
  );
}