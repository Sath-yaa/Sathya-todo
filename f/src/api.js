import axios from "axios";

const API = axios.create({ baseURL: "https://sathya-todo-b.onrender.com/api" });

export default API;
