import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/users/login", form);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/todo");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-800 text-white">
      <div className="bg-slate-700 p-8 rounded-lg space-y-4 w-80">
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input
          className="w-full p-2 rounded text-white"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full p-2 rounded text-white"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}

        <button
          className="bg-blue-500 w-full p-2 rounded text-white font-bold disabled:opacity-50"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          onClick={() => navigate("/register")}
          className="cursor-pointer underline text-sm text-gray-300 text-center"
        >
          Don’t have an account?
        </p>
      </div>
    </div>
  );
}
