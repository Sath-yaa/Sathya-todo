import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setTouched({ email: true, password: true });
    if (!form.email || !form.password) return;

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

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-2 rounded text-white bg-slate-600 pr-10"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onBlur={() => setTouched({ ...touched, password: true })}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 cursor-pointer"
          >
            {showPassword ? (
              <svg width="20" height="20" fill="black" viewBox="0 0 24 24">
                <path d="M12 4.5C7 4.5 2.73 8.11 1 12c1.73 3.89 6 7.5 11 7.5s9.27-3.61 11-7.5c-1.73-3.89-6-7.5-11-7.5zm0 13c-3.04 0-5.5-2.46-5.5-5.5S8.96 6.5 12 6.5s5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5zm0-9A3.5 3.5 0 0 0 8.5 12 3.5 3.5 0 0 0 12 15.5 3.5 3.5 0 0 0 15.5 12 3.5 3.5 0 0 0 12 8.5z" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="black" viewBox="0 0 24 24">
                <path d="M12 6c-3.03 0-5.88 1.69-8 4.5C6.12 13.31 8.97 15 12 15c3.03 0 5.88-1.69 8-4.5C17.88 7.69 15.03 6 12 6zm0 7.5c-1.66 0-3-1.34-3-3s1.34-3 3-3a3 3 0 0 1 3 3c0 1.66-1.34 3-3 3z" />
              </svg>
            )}
          </span>
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
