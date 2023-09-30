//MADE BY VORTERX
//DIEGOSON

const { DateTime } = require('luxon');

module.exports = {
  name: 'lyrics',
  description: 'To search Lyrics',
  category: 'Search',
  async xstart(vorterx, m, { xReact, text, args }) {

    await xReact('🎉');
    const songName = args.join(' ');

    const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(songName)}`);
    const lyricsData = await response.json();

      if (lyricsData.lyrics) {
      const lyrics = lyricsData.lyrics;

      const releaseDate = await getReleaseDate(songName);
      const currentDate = getDate();

      const MasMusicWidth = 60;

      let lyricsMessage = `🎵 Lyrics for "${songName}" 🎵\n\n${lyrics}\n\n`;

      if (releaseDate) {
        lyricsMessage += `📅 Released on: ${releaseDate}\n`;
      }

      lyricsMessage += `📆 Current date: ${currentDate}\n\n`;
      lyricsMessage += '🎶 Enjoy the music! 🎶';

      const horizontalLine = '─'.repeat(MasMusicWidth);
      const emptyLine = ' '.repeat(MasMusicWidth);

        const lyricsLines = lyricsMessage.split('\n');
        const lyricsContent = lyricsLines.map(line => {
        const padding = ' '.repeat((MasMusicWidth - line.length) / 2);
        return `│ ${padding}${line}${padding} │`;
       });

       const MicsMusic = `
       ┌─${horizontalLine}─┐
       │ ${emptyLine} │
       ${lyricsContent.join('\n')}
       │ ${emptyLine} │
       └─${horizontalLine}─┘
      `;

        m.reply(`
        \`\`\`
        ╭─────────────────────────────╮
        │                             │
        │        LYRICS SONGS     │
        │                             │
        ${MicsMusic}
        ╰─────────────────────────────╯
        \`\`\`
      `);
    } else {
      m.reply(`😶Sorry, I couldn't find the lyrics for "${songName}".`);
    }
    }
   };

  async function getReleaseDate(songName) {
  try {
  const response = await fetch(`https://api.example.com/songinfo?song=${encodeURIComponent(songName)}`);
  const songInfo = await response.json();

  if (songInfo.releaseDate) {
  return songInfo.releaseDate;
  }
  } catch (error) {
  console.error('😞Error retrieving release date:', error);
  }

  return null;
  }

  function getDate() {
  const currentDate = DateTime.now().toLocaleString({
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return currentDate;
}
