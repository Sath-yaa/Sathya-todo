import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setTouched({ email: true, password: true });

    // Basic client-side validation
    if (!form.email || !form.password) {
      return;
    }

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

        <div>
          <input
            className="w-full p-2 rounded text-white bg-slate-600"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onBlur={() => setTouched({ ...touched, email: true })}
          />
          {touched.email && !form.email && (
            <p className="text-red-400 text-sm">Email is required</p>
          )}
        </div>

        <div>
          <input
            type="password"
            className="w-full p-2 rounded text-white bg-slate-600"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onBlur={() => setTouched({ ...touched, password: true })}
          />
          {touched.password && !form.password && (
            <p className="text-red-400 text-sm">Password is required</p>
          )}
        </div>

        {error && <div className="text-red-400 text-sm text-center">{error}</div>}

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
