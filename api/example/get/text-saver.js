// api/text-saver.js

const texts = []; // memory-only storage (clears on redeploy/restart)

const meta = {
  name: "text-saver",
  version: "1.0.0",
  description: "Save and retrieve posted text via API",
  author: "Christian Geronimo",
  method: "post",
  category: "Utility",
  path: "/text-saver"
};

// Handle POST request (save text)
async function onStart({ req, res }) {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      author: "Christian Geronimo",
      error: "❌ No text provided!"
    });
  }

  texts.push({ time: new Date().toISOString(), text });

  console.log("📩 Saved:", text);

  return res.json({
    author: "Christian Geronimo",
    message: "✅ Text saved successfully!",
    saved: text
  });
}

// Handle GET request (retrieve texts)
async function onGetMessages({ req, res }) {
  return res.json({
    author: "Christian Geronimo",
    messages: texts
  });
}

module.exports = { meta, onStart, onGetMessages };
