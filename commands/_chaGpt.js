//===================°°°°°°°
//
//AZTEC MD WABOT VERSION 3.0.0
//MADE IN LUV BY DIEGOSON 
//
//===================°°°°°°°

name: "gpt",
  alias: ["ai", "openai"],
  category: "CHATGPT",
  desc: "To research something",
  async xstart(vorterx, m, { xReact, doReply, text }) {
    if (!text) {
      await xReact("❌");
      return m.reply("*Provide me a query ex Who is Aztec*");
    }
    await xReact("🤖");

    const phoneNumber = "27686881509";
    const encodedText = encodeURIComponent(text);
    const whatsappURL = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedText}&type=phone_number&app_absent=0`;

    const response = `
*CHAT_GPT - GPT-4 2023*

${text}

[![Thumbnail](https://i.ibb.co/C7TXRcH/photo-1678483789107-0029c61fdcca.jpg)](${whatsappURL})
`;

    await vorterx.sendMessage(m.from, response, { quoted: m });
  },
};
