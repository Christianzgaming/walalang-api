// api/text-saver.js

let texts = []; // memory-only storage (clears on redeploy/restart)

const meta = {
  name: "text-saver",
  version: "1.0.0",
  description: "Save and retrieve posted text via API",
  author: "Christian Geronimo",
  category: "Utility",
  path: "/text-saver"
};

// Helper: parse JSON body safely
async function parseBody(req) {
  return new Promise((resolve, reject) => {
    try {
      let data = "";
      req.on("data", chunk => (data += chunk));
      req.on("end", () => {
        try {
          resolve(JSON.parse(data || "{}"));
        } catch {
          resolve({});
        }
      });
    } catch (err) {
      resolve({});
    }
  });
}

// Main handler
async function onStart({ req, res }) {
  if (req.method === "POST") {
    const body = await parseBody(req);
    const { text } = body;

    if (!text) {
      return res.status(400).json({
        author: "Christian Geronimo",
        error: "❌ No text provided!"
      });
    }

    texts.push({ time: new Date().toISOString(), text });

    console.log("📩 Saved:", text);

    return res.json({
      creator: "ChanZAi",
      author: "Christian Geronimo",
      message: "✅ Text saved successfully!",
      saved: text
    });
  }

  if (req.method === "GET") {
    return res.json({
      creator: "ChanZAi",
      author: "Christian Geronimo",
      messages: texts
    });
  }

  return res.status(405).json({
    error: "❌ Method not allowed"
  });
}

module.exports = { meta, onStart };
