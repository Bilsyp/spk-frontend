import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    nama: "",
    role: "karyawan",
  });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setOk("");
    setLoading(true);
    try {
      await axios.post("https://api.bilsypdev.site/api/auth/register", form);
      setOk("Registrasi berhasil! Silakan login.");
      setForm({ username: "", password: "", nama: "", role: "karyawan" });
    } catch (error) {
      setErr(error.response?.data?.message || "Registrasi gagal.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-sky-900 to-blue-400">
      {/* SVG background gelombang biar nyambung sama login */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="regwave1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <path
          d="M0,320 Q240,180 480,320 T960,320 V600 H0 Z"
          fill="url(#regwave1)"
          fillOpacity="0.15"
        />
        <circle cx="93%" cy="17%" r="140" fill="#3b82f6" fillOpacity="0.11" />
        <circle cx="9%" cy="88%" r="110" fill="#fff" fillOpacity="0.09" />
      </svg>
      <form
        className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-2xl shadow-xl rounded-3xl p-8 flex flex-col gap-5 border border-white/30 animate-fadein"
        style={{
          boxShadow: "0 6px 48px 0 rgb(14 165 233 / 30%)",
          border: "1.5px solid rgba(255,255,255,0.2)",
        }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-sky-900 text-center tracking-wide mb-2 animate-slidein">
          Registrasi{" "}
          <span className="text-sky-600 text-xl block">SPK Karyawan</span>
        </h2>
        <input
          type="text"
          className="border-2 border-sky-200/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400/60 bg-white/60 placeholder:text-sky-400 transition"
          placeholder="Nama Lengkap"
          value={form.nama}
          onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
          required
        />
        <input
          type="text"
          className="border-2 border-sky-200/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400/60 bg-white/60 placeholder:text-sky-400 transition"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
          required
        />
        <input
          type="password"
          className="border-2 border-sky-200/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400/60 bg-white/60 placeholder:text-sky-400 transition"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          required
        />
        {/* Pilihan Role: opsional, default karyawan */}
        {/* <select
          className="border-2 border-sky-200/50 p-3 rounded-lg focus:outline-none bg-white/60"
          value={form.role}
          onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
        >
          <option value="karyawan">Karyawan</option>
          <option value="admin">Admin</option>
        </select> */}

        {err && <div className="text-red-600 text-center text-sm">{err}</div>}
        {ok && <div className="text-green-600 text-center text-sm">{ok}</div>}

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-sky-500 to-sky-700 text-white font-semibold py-3 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-all duration-200 tracking-wider"
        >
          {loading ? (
            <span className="animate-pulse">Mendaftar...</span>
          ) : (
            "Daftar"
          )}
        </button>
        <div className="text-xs text-sky-700 text-center pt-2">
          Sudah punya akun?{" "}
          <Link to="/" className="underline hover:text-sky-500">
            Login di sini
          </Link>
        </div>
        <style>
          {`
          .animate-fadein { animation: fadein .9s cubic-bezier(.48,1.25,.37,1) both;}
          @keyframes fadein { from {opacity:0; transform: scale(.9);} to {opacity:1; transform: scale(1);} }
          .animate-slidein { animation: slidein .7s .12s cubic-bezier(.42,0,.58,1) both;}
          @keyframes slidein { from { opacity:0; transform: translateY(-30px);} to {opacity:1; transform: translateY(0);} }
          `}
        </style>
      </form>
    </div>
  );
}
