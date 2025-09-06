// api/text-saver.js

const texts = []; // memory-only storage (clears on redeploy/restart)

const meta = {
  name: "text-saver",
  version: "1.0.0",
  description: "Save and retrieve posted text via API",
  author: "Christian Geronimo",
  category: "Utility",
  path: "/text-saver"
};

// Main handler (detect GET vs POST)
async function onStart({ req, res }) {
  if (req.method === "POST") {
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

  if (req.method === "GET") {
    return res.json({
      author: "Christian Geronimo",
      messages: texts
    });
  }

  return res.status(405).json({
    error: "❌ Method not allowed"
  });
}

module.exports = { meta, onStart };
