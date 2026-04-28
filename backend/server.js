const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];

// CREATE
app.post('/todos', (req, res) => {
    const text = req.body.text?.trim();
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }
    
    const todo = {
        id: Date.now(),
        text: text
    };
    todos.push(todo);
    res.status(201).json(todo);
});

// READ
app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

// UPDATE
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const text = req.body.text?.trim();
    
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }

    todos[todoIndex].text = text;
    res.status(200).json(todos[todoIndex]);
});

// DELETE
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = todos.length;
    
    todos = todos.filter(t => t.id !== id);
    
    if (todos.length === initialLength) {
        return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});