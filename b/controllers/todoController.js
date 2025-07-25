import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
  const todos = await Todo.find({ userId: req.params.userId });
  res.json(todos);
};

export const createTodo = async (req, res) => {
  const { title, userId } = req.body;
  const todo = await Todo.create({ title, userId });
  res.json(todo);
};

export const updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(todo);
};

export const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
};
