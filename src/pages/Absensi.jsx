import { useEffect, useState } from "react";
import axios from "axios";

export default function Absensi() {
  const [user, setUser] = useState(null);
  const [riwayat, setRiwayat] = useState([]);
  const [input, setInput] = useState({
    keterangan: "Hadir",
    jam_masuk: "",
    tanggal: new Date().toISOString().slice(0, 10),
  });
  const [info, setInfo] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Ambil user login
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) window.location.href = "/";
    setUser(u);
  }, []);

  // Ambil riwayat absensi user
  useEffect(() => {
    async function fetchRiwayat() {
      if (!user) return;
      try {
        const res = await axios.get(
          `http://localhost:3000/api/absensi?user_id=${user.id}`
        );
        setRiwayat(res.data);
      } catch {
        setRiwayat([]);
      }
    }
    fetchRiwayat();
  }, [user, info]);

  // Handle absen hari ini
  async function handleAbsen(e) {
    e.preventDefault();
    setInfo("");
    setErr("");
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/absensi", {
        user_id: user.id,
        tanggal: input.tanggal,
        keterangan: input.keterangan,
        jam_masuk: input.jam_masuk || null,
      });
      setInfo("Absen hari ini berhasil!");
    } catch (error) {
      setErr(
        error.response?.data?.message ||
          "Gagal absen. Sudah absen hari ini atau error server."
      );
    }
    setLoading(false);
  }

  // Cek sudah absen hari ini
  const sudahAbsen = riwayat.some((r) => r.tanggal === input.tanggal);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-sky-100 px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white/80 p-8 rounded-2xl shadow-lg mb-6 mt-6">
        <h2 className="text-2xl font-bold mb-4 text-sky-800">
          Absensi Hari Ini
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleAbsen}>
          <input
            type="date"
            className="border rounded-lg p-2"
            value={input.tanggal}
            onChange={(e) =>
              setInput((i) => ({ ...i, tanggal: e.target.value }))
            }
            disabled
          />
          <select
            className="border rounded-lg p-2"
            value={input.keterangan}
            onChange={(e) =>
              setInput((i) => ({ ...i, keterangan: e.target.value }))
            }
            disabled={sudahAbsen}
          >
            <option value="Hadir">Hadir</option>
            <option value="Izin">Izin</option>
            <option value="Sakit">Sakit</option>
          </select>
          <input
            type="time"
            className="border rounded-lg p-2"
            value={input.jam_masuk}
            onChange={(e) =>
              setInput((i) => ({ ...i, jam_masuk: e.target.value }))
            }
            placeholder="Jam Masuk"
            disabled={sudahAbsen}
          />
          {info && <div className="text-green-700">{info}</div>}
          {err && <div className="text-red-700">{err}</div>}
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white rounded-lg px-4 py-2 mt-2 font-semibold transition"
            disabled={loading || sudahAbsen}
          >
            {loading
              ? "Menyimpan..."
              : sudahAbsen
              ? "Sudah Absen Hari Ini"
              : "Absen Sekarang"}
          </button>
        </form>
      </div>

      {/* Riwayat Absensi */}
      <div className="max-w-2xl mx-auto bg-white/70 p-6 rounded-xl shadow">
        <h3 className="text-lg font-bold text-sky-700 mb-2">Riwayat Absensi</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sky-800 text-sm">
            <thead>
              <tr className="bg-sky-100">
                <th className="p-2">Tanggal</th>
                <th className="p-2">Keterangan</th>
                <th className="p-2">Jam Masuk</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center p-2 text-sky-400">
                    Tidak ada data absensi.
                  </td>
                </tr>
              )}
              {riwayat.map((r) => (
                <tr key={r.id}>
                  <td className="p-2">{r.tanggal}</td>
                  <td className="p-2">{r.keterangan}</td>
                  <td className="p-2">
                    {r.jam_masuk ? r.jam_masuk.slice(0, 5) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
