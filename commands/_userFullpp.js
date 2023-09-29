const fs = require('fs');
const Jimp = require('jimp');

module.exports = {
  name: "fullpp",
  desc: "To set the user  full Profile picture",
  category: "Group",
  async xstart(vorterx, m, { mime, quoted, xReact, text }) {
  
    if (!/image/.test(mime)) {
    await xReact("🚫");
    return vorterx.sendMessage( m.from,{text: `*Reply to an image to change the profile picture*`,},{ quoted: m });}
     
    await xReact("✔️");

    let quotedimage = await vorterx.downloadAndSaveMediaMessage(quoted);
    const fullPicture = await generateProfilePicture(quotedimage, 720);
    const preview = await generateProfilePicture(quotedimage, 128);

    await vorterx.setProfilePic(fullPicture);

    fs.unlinkSync(quotedimage);

    vorterx.sendMessage(m.from, { image: {url: fullPicture,},caption: `\n*✔️Profile picture  has been set successfully*`,},{ quoted: m } );

      async function generateProfilePicture(imagePath, size) {
      const jimp = await Jimp.read(imagePath);
      const { width, height } = jimp.bitmap;

      let croppedImage;
      if (width > height) {
        const x = (width - height) / 2;
        croppedImage = jimp.crop(x, 0, height, height);
      } else if (height > width) {
        const y = (height - width) / 2;
        croppedImage = jimp.crop(0, y, width, width);
      } else {
        croppedImage = jimp;
      }

      const resizedImage = await croppedImage.resize(size, size).getBufferAsync(Jimp.MIME_JPEG);
      return resizedImage.toString('base64');
      }
    }
   };
