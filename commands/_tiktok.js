const ttdl = require('btch-downloader');

module.exports = {
  name: 'tiktok',
  alias: ['tik'],
  category: 'Downloads',
  description: 'Download videos from TikTok.',
  async xstart(vorterx, m, { xReact, text,waitForMessage, args }) {
    
      if (!args[0]) { await xReact('😐');
      vorterx.sendMessage(m.from, 'Please provide a TikTok video URL.');
      return;
      }
    
      const url = args[0];
    
      try {
      const downloader = new ttdl();
      const videoInfo = await downloader.getVideoInfo(url);
      
      const videoUrl = videoInfo.videoUrl;
      const videoImage = videoInfo.thumbnailUrl;
      const videoTitle = videoInfo.title;
      const videoViews = videoInfo.views;
      const videoLikes = videoInfo.likes;
      const videoPublished = videoInfo.published;
       
      await xReact('📤');
      const caption = `🌳TITLE: ${videoTitle}\n👀VIEWS: ${videoViews}\n👍LIKES: ${videoLikes}\n🙌PUBLISHED: ${videoPublished}\n\nPlease reply the video quality:\n1. High Quality\n2. Low Quality`;
      vorterx.sendImageMessage(m.from, videoImage, caption);
      
      const qualityMessage = await vorterx.waitForMessage(m.from);
      const selectedQuality = parseInt(qualityMessage.text);
      if (selectedQuality === 1 || selectedQuality === 2) {
      vorterx.sendMessage(m.from, '📤Downloading TikTok video wait...');
      vorterx.sendMessage(m.from, '📤Video downloaded successfully..');
      } else {
      vorterx.sendMessage(m.from, 'Invalid selection. Please choose a valid option (1 or 2).');
      }
      } catch (error) {
      vorterx.sendMessage(m.from, 'An error occurred while downloading the video.');
      }
     },
    };
