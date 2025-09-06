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

// Main Vercel handler
export default async function handler(req, res) {
  if (req.method === "POST") {
    return onStart({ req, res });
  }
  if (req.method === "GET") {
    return onGetMessages({ req, res });
  }

  res.status(405).json({
    author: "Christian Geronimo",
    error: "Method not allowed"
  });
}

export { meta, onStart, onGetMessages };
