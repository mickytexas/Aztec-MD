const fs = require('fs');
const Jimp = require('jimp');

module.exports = {
  name: "fullpp",
  desc: "Change your Photo Profile",
  category: "Group",
  async xstart(vorterx, m, { mime, quoted, xReact, text }) => {
    
    if (!/image/.test(mime)) {
      await xReact("🚫");
      return vorterx.sendMessage( m.from,{text: `*Reply to an image to change the profile picture *`, }, { quoted: m }
      );
    }
    await xReact("✔️");
    let quotedimage = await vorterx.downloadAndSaveMediaMessage(quoted);
    const { preview, fullPicture } = await generatePP(quotedimage);

    await vorterx.setProfilePic(fullPicture);

    fs.unlinkSync(quotedimage);

    vorterx.sendMessage( m.from,{ image: {url: fullPicture, },caption: `\n*Group icon has been changed successfully*`,},{ quoted: m });

      async function generatePP(imagePath) {
      const jimp = await Jimp.read(imagePath);
      const resizedImage = await jimp.cover(720, 720).getBufferAsync(Jimp.MIME_JPEG);
      const previewImage = await jimp.cover(128, 128).getBufferAsync(Jimp.MIME_JPEG);
       return { fullPicture: resizedImage.toString('base64'),
       preview: previewImage.toString('base64'),
      };
      }
     }
    };
