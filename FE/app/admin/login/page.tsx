"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

// Mengambil base URL dari environment variable Next.js, fallback ke localhost jika kosong
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Menggunakan API_URL yang dinamis
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });

      if (res.data.success) {
        // Simpan JWT Token di Cookie selama 1 hari
        Cookies.set("admin_token", res.data.token, { expires: 1 });
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login gagal! Periksa koneksi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#12141a] text-[#eeece5] p-6 font-sans">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;1,6..72,500&family=Manrope:wght@400;500;600;700&display=swap");
        .font-display {
          font-family: "Newsreader", Georgia, serif;
        }
        body {
          font-family: "Manrope", system-ui, sans-serif;
        }
      `}</style>

      <div className="w-full max-w-md bg-[#1b1e26] p-8 rounded-2xl shadow-xl border border-[#2b2f3a] space-y-6">
        <div className="text-center space-y-1">
          <h1 className="font-display italic text-3xl font-medium text-[#c9a15c]">
            Admin login
          </h1>
          <p className="text-xs text-[#8b8c83]">
            Masuk untuk mengubah isi portofolio
          </p>
        </div>

        {error && (
          <div className="p-3 bg-[#a8543f]/20 border border-[#a8543f]/50 text-[#e0826b] text-xs rounded-lg font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#a3a7b3] mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#14161c] border border-[#2b2f3a] text-sm text-[#eeece5] outline-none focus:border-[#c9a15c] transition-colors"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a3a7b3] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#14161c] border border-[#2b2f3a] text-sm text-[#eeece5] outline-none focus:border-[#c9a15c] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#c9a15c] hover:bg-[#d4b073] text-[#14161c] font-semibold rounded-lg text-xs transition-colors shadow-lg shadow-[#c9a15c]/10"
          >
            Login ke dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
