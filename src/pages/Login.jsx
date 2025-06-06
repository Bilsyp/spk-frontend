import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await axios.post(
        "https://api.bilsypdev.site/api/auth/login",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (onLogin) onLogin(res.data.user);
      window.location.href = "/dashboard";
    } catch (error) {
      setErr(
        error.response?.data?.message ||
          "Gagal login. Cek koneksi atau password."
      );
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-sky-900 to-blue-400">
      {/* SVG Background Waves */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <path
          d="M0,320 Q240,180 480,320 T960,320 V600 H0 Z"
          fill="url(#wave1)"
          fillOpacity="0.15"
        />
        <circle cx="90%" cy="80%" r="180" fill="#38bdf8" fillOpacity="0.1" />
        <circle cx="8%" cy="15%" r="120" fill="#f1f5f9" fillOpacity="0.13" />
      </svg>

      {/* Login Card */}
      <form
        className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-2xl shadow-xl rounded-3xl p-8 flex flex-col gap-5 border border-white/30 animate-fadein"
        style={{
          boxShadow: "0 6px 48px 0 rgb(14 165 233 / 30%)",
          border: "1.5px solid rgba(255,255,255,0.25)",
        }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-sky-900 drop-shadow text-center tracking-wide mb-2 animate-slidein">
          SPK Karyawan
          <br />
          <span className="text-sky-600 text-xl">Login</span>
        </h2>
        <input
          type="text"
          className="border-2 border-sky-200/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400/60 bg-white/60 placeholder:text-sky-400 transition"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          className="border-2 border-sky-200/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400/60 bg-white/60 placeholder:text-sky-400 transition"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {err && <div className="text-red-600 text-center text-sm">{err}</div>}
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-sky-500 to-sky-700 text-white font-semibold py-3 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-all duration-200 tracking-wider"
        >
          {loading ? (
            <span className="animate-pulse">Memproses...</span>
          ) : (
            "Login"
          )}
        </button>
        <div className="text-xs text-sky-700 text-center pt-2">
          Belum punya akun?{" "}
          <Link to="/register" className="underline hover:text-sky-500">
            Daftar di sini
          </Link>
        </div>
        <div className="text-xs text-sky-700 text-center pt-2">
          &copy; {new Date().getFullYear()} SPK Karyawan - Metode ELECTRE
        </div>
      </form>

      {/* Animation */}
      <style>
        {`
        .animate-fadein { animation: fadein .9s cubic-bezier(.48,1.25,.37,1) both;}
        @keyframes fadein { from {opacity:0; transform: scale(.9);} to {opacity:1; transform: scale(1);} }
        .animate-slidein { animation: slidein .7s .12s cubic-bezier(.42,0,.58,1) both;}
        @keyframes slidein { from { opacity:0; transform: translateY(-30px);} to {opacity:1; transform: translateY(0);} }
        `}
      </style>
    </div>
  );
}
