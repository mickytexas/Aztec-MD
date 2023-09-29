//===============>

// CREATED BY DIEGOSON FENANDEZ

//===============>

const fs = require("fs");
const util = require("util");
const neofetch = require("neofetch");
const axios = require("axios");

const readFile = util.promisify(fs.readFile);
const downloadFile = util.promisify(axios.get);

const config = require("../config");

module.exports = {
  name: 'ping',
  category: 'user',
  description: 'Check ping',
  async xstart(vorterx, m, { xReact }) {
    await xReact("🚀");

    const start = process.hrtime();

    try {
      const { neofetchOptions, fileUrl, uploadFileUrl } = config;

      const systemInfo = await neofetch(neofetchOptions);
      const end = process.hrtime(start);
      const latency = (end[0] * 1000 + end[1] / 1000000).toFixed(4);

      const formattedOutput = systemInfo.replace(/Memory:/, "Ram:");

      const fileResponse = await downloadFile(fileUrl, { responseType: 'stream' });
      const fileSizeInBytes = fileResponse.headers['content-length'];
      const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);

      const uploadStartTime = process.hrtime();
      await axios.post(uploadFileUrl, fs.createReadStream(fileUrl));
      const uploadEndTime = process.hrtime(uploadStartTime);
      const uploadSpeedInBitsPerSecond = (fileSizeInBytes * 8) / (uploadEndTime[0] + uploadEndTime[1] / 1e9);
      const uploadSpeedInMbps = (uploadSpeedInBitsPerSecond / 1e6).toFixed(2);

      m.reply(`
        ${formattedOutput}
        *🛑 Performance:* ${latency} ms
        *📥 File Size:* ${fileSizeInMB} MB
        *💻 CPU Speed:* ${cpuSpeedResult.speed} GHz
        *📖 RAM Speed:* ${ramSpeedResult} MB/s
        *📤 Upload Speed:* ${uploadSpeedInMbps} Mbps
      `);
    } catch (error) {
      console.error("➖Failed to retrieve system information:", error);
      m.reply("➖Failed to retrieve system information.");
    }
  }
};
