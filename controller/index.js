// controllers/todoController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modals/Users.js");
const Todo = require("../modals/Todo.js");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.json({ message: "User registered" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });

  const isPasswordValid = bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Invalid email or password" });

  const token = jwt.sign({ userId: user._id }, "your-secret-key");
  res.json({ token });
};

const getAllTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.userId });
  res.json(todos);
};

const addTodo = async (req, res) => {
  const { title, description, completed } = req.body;
  const todo = new Todo({ title, description, completed, user: req.userId });
  await todo.save();
  res.json(todo);
};

const updateTodo = async (req, res) => {
  const { title, description, completed } = req.body;
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { title, description, completed },
    { new: true }
  );
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
};

const deleteTodo = async (req, res) => {
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json({ message: "Todo deleted" });
};

module.exports = {
  register,
  login,
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
