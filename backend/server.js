const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];

// CREATE
app.post('/todos', (req, res) => {
    const todo = {
        id: Date.now(),
        text: req.body.text
    };
    todos.push(todo);
    res.json(todo);
});

// READ
app.get('/todos', (req, res) => {
    res.json(todos);
});

// UPDATE
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.map(t =>
        t.id === id ? { ...t, text: req.body.text } : t
    );
    res.json({ message: "Updated" });
});

// DELETE
app.delete('/todos/:id', (req, res) => {
    const id = Number.parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));