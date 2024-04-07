// routes.js
const express = require("express");
const router = express.Router();
const todoController = require("../controller/index.js");
const authMiddleware = require("../middlewares/auth.js");

router.post("/register", todoController.register);
router.post("/login", todoController.login);

router.use(authMiddleware.authenticateToken); // Protected routes
router.get("/todos", todoController.getAllTodos);
router.post("/todos", todoController.addTodo);
router.put("/todos/:id", todoController.updateTodo);
router.delete("/todos/:id", todoController.deleteTodo);

module.exports = router;
