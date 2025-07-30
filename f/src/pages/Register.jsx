import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", password: "", other: "" });

  const navigate = useNavigate();

  const validateFields = () => {
    let valid = true;
    let newErrors = { name: "", email: "", password: "", other: "" };

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    setLoading(true);
    setErrors({ name: "", email: "", password: "", other: "" });

    try {
      await API.post("/users/register", form);
      navigate("/");
    } catch (err) {
      const message = err?.response?.data?.message || "Registration failed";
      if (message.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: message }));
      } else {
        setErrors((prev) => ({ ...prev, other: message }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-800 text-white">
      <div className="bg-slate-700 p-8 rounded-xl space-y-4 w-80">
        <h2 className="text-xl font-bold text-center">Register</h2>

        <div>
          <input
            className={`w-full p-2 rounded text-white bg-slate-600 ${errors.name ? "border border-red-500" : ""}`}
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <input
            className={`w-full p-2 rounded text-white bg-slate-600 ${errors.email ? "border border-red-500" : ""}`}
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            className={`w-full p-2 rounded text-white bg-slate-600 ${errors.password ? "border border-red-500" : ""}`}
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
        </div>

        {errors.other && (
          <div className="text-red-400 text-sm text-center">{errors.other}</div>
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
