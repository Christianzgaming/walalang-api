const meta = {
  name: "text-saver",
  version: "1.0.2",
  description: "Save and retrieve posted text via API (memory-only, Vercel ready)",
  author: "Christian Geronimo",
  method: "post",
  category: "Utility",
  path: "/send"
};

// Temporary in-memory storage (reset kapag nag-redeploy o nag-cold start)
let messages = [];

// === POST /send ===
async function onStart({ req, res }) {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      author: "Christian Geronimo",
      error: "❌ No text provided!"
    });
  }

  try {
    const logLine = `${new Date().toISOString()} - ${text}`;
    messages.push(logLine);

    console.log("📩 Received and saved:", text);

    return res.json({
      author: "Christian Geronimo",
      message: "✅ Text saved (memory only, resets on restart)"
    });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({
      author: "Christian Geronimo",
      error: err.message
    });
  }
}

// === GET /messages ===
async function onGetMessages({ req, res }) {
  try {
    if (messages.length === 0) {
      return res.json({
        author: "Christian Geronimo",
        messages: [],
        note: "No messages saved yet."
      });
    }

    return res.json({
      author: "Christian Geronimo",
      messages
    });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({
      author: "Christian Geronimo",
      error: err.message
    });
  }
}

module.exports = { meta, onStart, onGetMessages };
