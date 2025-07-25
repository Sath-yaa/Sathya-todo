import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    await API.post("/users/register", form);
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-800 text-white">
      <div className="bg-slate-700 p-8 rounded-xl space-y-4">
        <h2 className="text-xl font-bold">Register</h2>
        <input
          className="w-full p-2 rounded"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
          className="bg-green-500 w-full p-2 rounded text-white font-bold"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}
