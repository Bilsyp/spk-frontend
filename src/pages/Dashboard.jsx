import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cek login (ambil dari localStorage)
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) window.location.href = "/";
    setUser(u);
  }, []);

  // Fetch summary data dari backend (bisa kamu sesuaikan endpoint-nya)
  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/summary", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        setSummary(res.data);
      } catch {
        setSummary(null);
      }
      setLoading(false);
    }
    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-sky-100 px-4 py-8">
      {/* Navbar sederhana */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-sky-900 drop-shadow">
          Dashboard SPK Karyawan
        </h1>
        <div className="flex items-center gap-3">
          <span className="font-medium text-sky-800">{user?.nama}</span>
          <span className="px-3 py-1 bg-sky-200 text-sky-700 rounded-full text-xs">
            {user?.role}
          </span>
          <button
            className="text-xs text-white bg-sky-500 hover:bg-sky-600 rounded px-3 py-1"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Card summary ringkas */}
      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        <SummaryCard
          title="Karyawan"
          value={loading ? "..." : summary?.total_karyawan ?? 0}
          icon="👥"
        />
        <SummaryCard
          title="Sudah Absen Hari Ini"
          value={loading ? "..." : summary?.absen_hari_ini ?? 0}
          icon="📝"
        />
        <SummaryCard
          title="Ranking Tertinggi"
          value={loading ? "..." : summary?.top_user?.nama ?? "-"}
          icon="🏆"
        />
      </div>

      {/* Menu Navigasi */}
      <div className="grid sm:grid-cols-3 gap-8">
        <DashboardMenu
          href="/absensi"
          color="from-sky-500 to-sky-700"
          icon="📝"
          label="Absensi"
        />
        <DashboardMenu
          href="/hasil-kerja"
          color="from-blue-400 to-blue-700"
          icon="📦"
          label="Hasil Kerja"
        />
        <DashboardMenu
          href="/electre"
          color="from-yellow-400 to-yellow-600"
          icon="🏆"
          label="Lihat Ranking"
        />
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl bg-white/60 backdrop-blur shadow-md p-6 flex items-center gap-4 animate-fadein">
      <div className="text-4xl">{icon}</div>
      <div>
        <div className="text-lg font-bold text-sky-800">{title}</div>
        <div className="text-2xl font-extrabold text-sky-700">{value}</div>
      </div>
      <style>
        {`
        .animate-fadein { animation: fadein .9s cubic-bezier(.48,1.25,.37,1) both;}
        @keyframes fadein { from {opacity:0; transform: scale(.97);} to {opacity:1; transform: scale(1);} }
        `}
      </style>
    </div>
  );
}

function DashboardMenu({ href, icon, label, color }) {
  return (
    <a
      href={href}
      className={`rounded-2xl bg-gradient-to-br ${color} p-7 flex flex-col items-center justify-center gap-2 shadow-xl text-white font-semibold text-lg hover:scale-105 active:scale-95 transition-all duration-200`}
    >
      <span className="text-3xl">{icon}</span>
      <span>{label}</span>
    </a>
  );
}
