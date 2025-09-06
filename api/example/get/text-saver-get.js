// Simple shared memory (only works if same process)
let texts = [];

const meta = {
  name: "text-saver-get",
  version: "1.0.0",
  description: "Get saved texts",
  author: "Christian Geronimo",
  category: "Utility",
  path: "/text-saver-get"
};

async function onStart({ req, res }) {
  if (req.method === "GET") {
    return res.json({
      creator: "ChanZAi",
      author: "Christian Geronimo",
      messages: texts
    });
  }
  return res.status(405).json({ error: "Method not allowed" });
}

module.exports = { meta, onStart, texts };
