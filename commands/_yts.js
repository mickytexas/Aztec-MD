//================================>

// AZTEC MD V3.0.0

// MADE WITH LUV INFORMAL OF LEARNING JS

//================================>
const axios = require("axios");

module.exports = {
  name: "yts",
  description: "Search for YouTube videos",
  category: "Download",
  async xstart(vorterx, m, { xReact, text, args }) {
    if (!text) {
      await xReact("⛔");
      return m.reply("*Please provide a search query to find YouTube videos.*");
    }

    await xReact("🔍");

    const searchResults = await searchYouTubeVideos(text);
    const formattedResults = formatResults(searchResults);

    const messageOptions = buildMessageOptions(formattedResults);

    await vorterx.sendMessage(m.from, messageOptions);
  },
};

async function searchYouTubeVideos(query) {
  try {
    const response = await axios.get(`https://api.youtube.com/search?q=${query}`);
    return response.data.items;
  } catch (error) {
    console.error("Error searching YouTube videos:", error);
    return [];
  }
}

function formatResults(results) {
  let formatted = "";

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    formatted += `Result ${i + 1}:\n`;
    formatted += `Title: ${result.title}\n`;
    formatted += `Channel: ${result.channelTitle}\n`;
    formatted += `Views: ${result.viewCount}\n`;
    formatted += `Duration: ${result.duration}\n\n`;
  }

  return formatted;
}

function buildMessageOptions(content) {
  const messageOptions = {
    caption: `*YOUTUBE SEARCH RESULTS*\n\n${content}`,
    quoted: m,
  };

  return messageOptions;
}
