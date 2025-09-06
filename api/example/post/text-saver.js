// Sa iyong Express app/file:
const express = require('express');
const app = express();

app.use(express.json());

let messages = []; // Simple in-memory storage

// GET: Kumuha ng lahat ng messages
app.get('/api/text-saver', (req, res) => {
  res.json({
    creator: "ChanZAi",
    author: "Christian Geronimo",
    messages: messages
  });
});

// POST: Magdagdag ng bagong message
app.post('/api/text-saver', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  messages.push(text);
  res.status(201).json({ success: true, messages: messages });
});

app.listen(3000, () => console.log('API running on port 3000'));
