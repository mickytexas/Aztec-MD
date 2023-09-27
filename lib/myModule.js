//const fetch = require("node-fetch");

async function fetchLatestGPTVersion() { // This fetch the Latest Gpt version 
  try {
    const response = await fetch("https://api.example.com/latest-gpt-version");
    const data = await response.json();
    return data.version;
  } catch (error) {
    console.error("Error fetching latest GPT version:", error.message);
    return "Unknown";
  }
}
/*
    @MADE WITH LUV BYDIEGOSON 
    @COPRIGHT AZTEC MD

*/
module.exports = {
  getLatestGPTVersion: fetchLatestGPTVersion,
};
