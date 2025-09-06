const fs = require("fs");
const path = require("path");

const SAVE_FOLDER = "saved_data";
const SAVE_FILE = "saved_texts.txt";
const filePath = path.join(SAVE_FOLDER, SAVE_FILE);

const meta = {
  name: "text-saver",
  version: "1.0.1",
  description: "Save and retrieve posted text via API",
  author: "Christian Geronimo",
  method: "post",
  category: "Utility",
  path: "/send"
};

async function onStart({ req, res }) {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      author: "Christian Geronimo",
      error: "❌ No text provided!"
    });
  }

  try {
    if (!fs.existsSync(SAVE_FOLDER)) {
      fs.mkdirSync(SAVE_FOLDER);
    }

    const logLine = `${new Date().toISOString()} - ${text}\n`;

    fs.appendFileSync(filePath, logLine, "utf-8");

    console.log("📩 Received and saved:", text);

    return res.json({
      author: "Christian Geronimo",
      message: `✅ Text saved to ${filePath}!`
    });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({
      author: "Christian Geronimo",
      error: err.message
    });
  }
}

// New GET endpoint to retrieve saved texts
async function onGetMessages({ req, res }) {
  try {
    if (!fs.existsSync(filePath)) {
      return res.json({
        author: "Christian Geronimo",
        messages: [],
        note: "No messages saved yet."
      });
    }

    const content = fs.readFileSync(filePath, "utf-8").trim().split("\n");

    return res.json({
      author: "Christian Geronimo",
      messages: content
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
