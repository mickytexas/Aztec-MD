const NetworkSpeed = require('network-speed');
const { tmpdir } = require('os');

const test = new NetworkSpeed();

module.exports = {
  name: 'test',
  description: 'Checking ping',
  category: 'Networks',
  async xstart(vorterx, m, { text, args, xReact }) {
    await xReact('🚦');

    const old = new Date();

    const download = await getNetworkDownloadSpeed();
    const upload = await getNetworkUploadSpeed();

    const txt = '🚦◦ *Downloads*: ' + download.mbps + ' mbps\n';
    text += '🚦◦ *Uploads*: ' + upload.mbps + ' mbps\n';
    text += '🚦◦ *Response*: ' + (new Date() - old) + ' ms';

    vorterx.sendMessage(m.from, { caption: text }, { quoted: m });

    async function getNetworkDownloadSpeed() {
      const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
      const fileSizeInBytes = 500000;

      const speed = await test.checkDownloadSpeed(baseUrl, fileSizeInBytes);

      return speed;
    }

    async function getNetworkUploadSpeed() {
      const options = {
        hostname: 'www.google.com',
        port: 80,
        path: tmpdir(),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const fileSizeInBytes = 2000000;
      const speed = await test.checkUploadSpeed(options, fileSizeInBytes);

      return speed;
    }
  },
};
