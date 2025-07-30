import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const fetchTodos = async () => {
    const res = await API.get(`/todos/${user._id}`);
    setTodos(res.data);
  };

  useEffect(() => {
    if (!user) return navigate("/");
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    await API.post("/todos", { title: title.trim(), userId: user._id });
    setTitle("");
    setSuccessMsg("✅ Added successfully!");

    setTimeout(() => {
      setSuccessMsg("");
    }, 2000);

    fetchTodos();
  };

  const updateTodo = async (id, status) => {
    await API.put(`/todos/${id}`, {
      status: status === "pending" ? "completed" : "pending",
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>

      <div className="flex mb-2">
        <input
          className="flex-1 p-2 rounded-l bg-white text-black"
          placeholder="Enter todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={addTodo}
          disabled={!title.trim()}
          className={`px-4 py-2 rounded-r font-bold ${
            title.trim()
              ? "bg-blue-500 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Add
        </button>
      </div>

      {/* ✅ Success Message */}
      {successMsg && (
        <div className="text-green-400 font-semibold mb-4">{successMsg}</div>
      )}

      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="bg-slate-700 p-4 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="flex-1">
              <h3
                className={`text-lg font-semibold ${
                  todo.status === "completed"
                    ? "line-through text-green-300"
                    : ""
                }`}
              >
                {todo.title}
              </h3>
              <p className="text-sm text-gray-400">{todo.status}</p>
            </div>

            <div className="flex flex-row gap-2">
              <button
                onClick={() => updateTodo(todo._id, todo.status)}
                className="bg-yellow-400 px-3 py-1 rounded text-black"
              >
                Toggle
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="bg-red-500 px-3 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
