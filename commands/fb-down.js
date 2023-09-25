//-----------[F B D L D O W N]----

const bocil = require('@bochilteam/scraper');
const {
    getBuffer
} = require("../mangoes/myFunc.js");
module.exports = {
    name: "fb",
    description: "To download Facebook",
    category: "Download",
    async xstart(vorterx, m, {
         xReact, text, args
    }) => {
        try {
            if (!text) {
                await xReact("⛔");
                return m.reply(`*Please Provide a Valid Facebook Video Link*`);
            } else {
                await xReact("📤");
                bocil.facebookdlv2(`${text}`).then(async (data) => {

                    let aztec = `*╭────❰* *F A C B K - D W N  L D*\n  
*❒* *TITLE*: *FACBOOK*\n
*❒* *HD QUALTY*: *720p*\n
*╰─────────────⭓*`;
                    vorterx.sendMessage(m.from, {
                        video: {
                            url: data.result[0].url
                        }, caption: aztec
                    }, {
                        quoted: m
                    })
                })}
        } catch (error) {
            vorterx.sendMessage(m.from, {
                text: "Error occurred while processing"})
        }
    }
};
