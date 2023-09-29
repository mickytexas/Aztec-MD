const fs = require('fs');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const { pipeline } = require('stream');
const { promisify } = require('util');
const os = require('os');

const streamPipeline = promisify(pipeline);

module.exports = {
  name: 'song',
  description: 'Download songs',
  category: 'Downloads',
  async xstart(vorterx, m, { xReact, text }) {
    if (!text) {
      await xReact('⛔');
      return m.reply('Please provide a song name (e.g., Banyana by Daliwonga).');
    }

     try {
      await xReact('📤');
      await m.reply('Downloading your song...');

       const searchResults = await yts(text);
       const videos = searchResults.videos;

        if (!videos.length) {
        await xReact('⛔');
        return m.reply('Song not found. Please try another name (e.g., Mnike by Tyler lcu).');
       }

       const randomIndex = Math.floor(Math.random() * videos.length);
       const { title, thumbnail, url } = videos[randomIndex];

       const tmpDir = os.tmpdir();
       const fileName = `${title}.mp3`;

       const audioStream = ytdl(url, {
        filter: 'audioonly',
        quality: 'highestaudio',
      });

       const writableStream = fs.createWriteStream(`${tmpDir}/${fileName}`);
       await streamPipeline(audioStream, writableStream);

       const doc = {
        audio: {
        url: `${tmpDir}/${fileName}`,
        },
        mimetype: 'audio/mp4',
        fileName: title,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            mediaType: 2,
            mediaUrl: url,
            title,
            body: 'Powered by Aztec',
            sourceUrl: url,
            thumbnail,
           },
         },
        };

        await vorterx.sendMessage(m.from, doc, { quoted: m });

        fs.unlink(`${tmpDir}/${fileName}`, (err) => {
        if (err) {
          console.error(`Failed to delete audio file: ${err}`);
        } else {
          console.log(`Deleted audio file: ${tmpDir}/${fileName}`);
        }
        });
        } catch (error) {
        console.error('Error occurred while processing the song:', error);
        await xReact('⛔');
        return m.reply('An error occurred while processing the song. Please try again later.');
       }
      },
     };
