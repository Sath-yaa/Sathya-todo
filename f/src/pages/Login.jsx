import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await API.post("/users/login", form);
    localStorage.setItem("user", JSON.stringify(res.data));
    navigate("/todo");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-800 text-white">
      <div className="bg-slate-700 p-8 rounded-xl space-y-4">
        <h2 className="text-xl font-bold">Login</h2>
        <input
          className="w-full p-2 rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full p-2 rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          className="bg-blue-500 w-full p-2 rounded text-white font-bold"
          onClick={handleLogin}
        >
          Login
        </button>
        <p onClick={() => navigate("/register")} className="cursor-pointer underline text-sm text-gray-300">
          Don’t have an account?
        </p>
      </div>
    </div>
  );
}
