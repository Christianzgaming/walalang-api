const { texts } = require("./text-saver-get.js");

const meta = {
  name: "text-saver-post",
  version: "1.0.0",
  description: "Save texts via POST",
  author: "Christian Geronimo",
  category: "Utility",
  path: "/text-saver-post"
};

// Helper to parse JSON body
async function parseBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", chunk => (data += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(data || "{}"));
      } catch {
        resolve({});
      }
    });
  });
}

async function onStart({ req, res }) {
  if (req.method === "POST") {
    const body = await parseBody(req);
    const { text } = body;
    if (!text) {
      return res.status(400).json({ error: "No text provided!" });
    }
    texts.push({ time: new Date().toISOString(), text });
    console.log("Saved:", text);
    return res.json({
      creator: "ChanZAi",
      author: "Christian Geronimo",
      message: "Text saved successfully!",
      saved: text
    });
  }
  return res.status(405).json({ error: "Method not allowed" });
}

module.exports = { meta, onStart };
