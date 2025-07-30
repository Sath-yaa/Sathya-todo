import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otherError, setOtherError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setEmailError("");
    setOtherError("");
    try {
      await API.post("/users/register", form);
      navigate("/");
    } catch (err) {
      const message = err?.response?.data?.message || "Registration failed";
      if (message.toLowerCase().includes("email")) {
        setEmailError(message); 
      } else {
        setOtherError(message); 
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-800 text-white">
      <div className="bg-slate-700 p-8 rounded-xl space-y-4 w-80">
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input
          className="w-full p-2 rounded text-white bg-slate-600"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <div>
          <input
            className={`w-full p-2 rounded text-white bg-slate-600 ${
              emailError ? "border border-red-500" : ""
            }`}
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {emailError && (
            <p className="text-red-400 text-xs mt-1">{emailError}</p>
          )}
        </div>

        <input
          type="password"
          className="w-full p-2 rounded text-white bg-slate-600"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {otherError && (
          <div className="text-red-400 text-sm text-center">{otherError}</div>
        )}

        <button
          className="bg-green-500 w-full p-2 rounded text-white font-bold disabled:opacity-50"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p
          onClick={() => navigate("/")}
          className="cursor-pointer underline text-sm text-gray-300 text-center"
        >
          Already have an account? Back to Login
        </p>
      </div>
    </div>
  );
}
