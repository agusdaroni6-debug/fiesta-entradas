'use client'

import { useState } from "react";

export default function Page() {
  const [cantidad, setCantidad] = useState(1);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [comprado, setComprado] = useState(false);
  const [mostrarPago, setMostrarPago] = useState(false);

  const precio = 3000;
  const total = cantidad * precio;

  const handleCompra = (e) => {
    e.preventDefault();
    if (!nombre || !email) {
      alert("Por favor completa todos los campos");
      return;
    }
    setMostrarPago(true);
  };

  const confirmarTransferencia = () => {
    setComprado(true);
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

        {comprado ? (
          <div className="text-center space-y-3">
            <h2 className="text-xl font-semibold">✅ ¡Entrada Confirmada!</h2>
            <p>
              Gracias {nombre}, recibimos tu pago por {cantidad} entrada(s).
            </p>
            <p className="text-sm text-gray-500">
              Te enviaremos tu entrada a {email}
            </p>
          </div>
        ) : mostrarPago ? (
          <div className="space-y-4 text-center">
            <h2 className="text-lg font-semibold">💳 Paso final: Transferencia</h2>
            <p>Para recibir tu entrada debes transferir el total de</p>
            <p className="text-xl font-bold">${total.toLocaleString()}</p>
            <p>al alias de Mercado Pago:</p>
            <div className="bg-gray-100 p-3 rounded-xl font-mono text-lg">
              agus.daroni
            </div>
            <p className="text-sm text-gray-500">
              Una vez realizada la transferencia, presiona el botón de abajo.
            </p>
            <button
              onClick={confirmarTransferencia}
              className="w-full bg-black text-white py-3 rounded-2xl text-lg"
            >
              Ya Transferí
            </button>
          </div>
        ) : (
          <form onSubmit={handleCompra} className="space-y-4">
            <div>
              <label className="text-sm">Nombre completo</label>
              <input
                type="text"
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

            <div className="text-center font-semibold">
              Total: ${total.toLocaleString()}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-900 text-white py-3 rounded-2xl text-lg"
            >
              Continuar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}