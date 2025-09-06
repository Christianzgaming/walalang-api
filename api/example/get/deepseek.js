const axios = require("axios");

const meta = {
  name: "deepseek",
  version: "1.0.0",
  description: "Ask and generate responses with deepseek",
  author: "Christian Geronimo",
  method: "get",
  category: "Ai",
  path: "/deepseek?q=hi"
};

async function onStart({ req, res }) {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      author: "Christian Geronimo",
      error: "Please provide the ?q=your_query_here parameter."
    });
  }

  const data = JSON.stringify({
    messages: [query],
    character: "ai-image-generator"
  });

  const url = "https://chatsandbox.com/api/chat";

  const headers = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Content-Type": "application/json",
    "sec-ch-ua-platform": '"Android"',
    "sec-ch-ua": '"Chromium";v="130", "Brave";v="130", "Not?A_Brand";v="99"',
    "sec-ch-ua-mobile": "?1",
    "sec-gpc": "1",
    "accept-language": "en-US,en;q=0.8",
    "origin": "https://chatsandbox.com",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
    "referer": "https://chatsandbox.com/chat/deepseek",
    "priority": "u=1, i"
  };

  try {
    const response = await axios.post(url, data, { headers });
    res.json({
      author: "Christian Geronimo",
      response: response.data
    });
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    return res.status(500).json({
      author: "Christian Geronimo",
      error: error.message
    });
  }
}

module.exports = { meta, onStart };