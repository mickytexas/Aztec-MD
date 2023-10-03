const FBDownloader = require('@xaviabot/fb-downloader');

module.exports = {
  name: 'fb',
  alias: ['facebook'],
  description: 'To download facebook video',
  category: 'Downloads',
  async xstart(vorterx, m, { xReact, text, sendText, args, waitForMessage }) {
    
    try {
      const videoURL = args[0];

      if (!videoURL) { await xReact('⛔');
      await vorterx.sendMessage(m.from, 'Please provide a Facebook video URL');
      return;
      }

      await xReact.sendText(m.from, '📤');
      await vorterx.sendMessage(m.from,
        `🔢 Reply below number to select video quality:\n\n` +
        `*1 | 720p (HD) VIDEO*\n\n` +
        `*2 | 360p (SD) VIDEO*\n\n` +
        `└───────────◉`
       );

       const response = await vorterx.waitForMessage(m.from, {fromMe: false,quotedMessage: m,mentions: true,
        regex: /^[12]$/,
       });

        const selectedNumber = response.text.trim();
        const downloader = new FBDownloader();
        const downloadInfo = selectedNumber === '1' ?
        await downloader.downloadHD(videoURL) :
        await downloader.downloadSD(videoURL);

       if (!downloadInfo.success) {
       await vorterx.sendMessage(m.from, `Failed to download the video. Reason: ${downloadInfo.error}`);
       return;
      }

      const DiegosonX = `[*FB DOWOAD*]\n` +
        `😀Title: ${downloadInfo.title}\n` +
        `😀Quality: ${selectedNumber === '1' ? '720p (HD)' : '360p (SD)'}\n` +
        `🙂Views: ${downloadInfo.views}\n\n` +
        `└───────────◉`;

      await vorterx.sendMessage(m.from,{file: downloadInfo.videoPath,filename: 'video.mp4',caption: DiegosonX}
     );
     } catch (error) {
      await vorterx.sendMessage(m.from, 'An error occurred while downloading the video');
    }
   },
  };
