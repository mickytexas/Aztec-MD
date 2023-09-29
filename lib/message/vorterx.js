require('../../config.js');
const { serialize, decodeJid } = require('./D3centX.js')
const chalk = require('chalk')
const Prefix = global.prefix;
const PREFIX = (process.env.PREFIX);
const { MongoDriver } = require('quickmongo');
const MONGODB = mongodb;
const driver = new MongoDriver(process.env.MONGODB)

//======================================================

module.exports = MessageHandler = async (messages, vorterx) => {
    try {     
    if (messages.type !== 'notify') return
    let m = serialize(JSON.parse(JSON.stringify(messages.messages[0])), vorterx)
    if (!m.message) return
    if (m.key && m.key.remoteJid === 'status@broadcast') return
    if (m.type === 'protocolMessage' || m.type === 'senderKeyDistributionMessage' || !m.type || m.type === '')
      
    return
     const antilink = process.env.ANTILINK || true
     const { isGroup, type, sender, from,body} = m
     const gcMeta = isGroup ? await vorterx.groupMetadata(from) : ''
     const gcName = isGroup ? gcMeta.subject : ''
     const args = body.trim().split(/ +/).slice(1)
     const text = (q = args.join(" "))
     const isCmd = body.startsWith(global.prefix)
     const cmdName = body.slice(1).trim().split(/ +/).shift().toLowerCase()
     const arg = body.replace(cmdName, '').slice(1).trim()
     const groupMembers = gcMeta?.participants || []
     const botNumber = await vorterx.decodeJid(vorterx.user.id);
     let isBotAdmin = isGroup ? groupAdmin.includes(botNumber) : false;
     let isAdmin = isGroup ? groupAdmin.includes(sender) : false;
     let mime = (quoted.msg || m.msg).mimetype || " ";
     let quoted = m.quoted ? m.quoted : m;
     const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id)
     const ActivateMod = (await vorterx.DB.get('mod')) || []
     const banned = (await vorterx.DB.get('banned')) || []
    
      //======================================================
    
      if(antilink == true) {
      if (
      isGroup &&   groupAdmins.includes(vorterx.user.id.split(':')[0] + '@s.whatsapp.net') &&
      body
      ){
        const groupCodeRegex = body.match(/chat.whatsapp.com\/(?:invite\/)?([\w\d]*)/)
        if (groupCodeRegex && groupCodeRegex.length === 2 && !groupAdmins.includes(sender)) {
        const groupCode = groupCodeRegex[1]
        const groupNow = await vorterx.groupInviteCode(from)

          if (groupCode !== groupNow) {
          await vorterx.sendMessage(from, { delete: m.key })
          { await vorterx.groupParticipantsUpdate(from, [sender], 'remove')
          m.reply('⭐*Trash has been removed successfully*')}
        }
        }
        }
        }
      if (banned.includes(sender)) return m.reply('*You are banned from using the bot*')

       /*if (sender && prefix ) {
      let emojis = ['😀','🐥','🐤','🐦', '👻','😎','😴','🥫','🍿','🤬','🕵️','😁','🤩','😍','😏','🤮','💩','💥','🔥','💯','🐺','🌚','🦄','🐕','⚽','😊', '🎉', '🌟', '🐱', '🌈', '❤', '👥', '👺', '🎎', '👮‍♂️', '😂', '⚡️', '🍕', '🎸', '🌺','🐧','👀'];
      function getRandomEmoji() {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      return emojis[randomIndex];
      }
      const randomEmoji = getRandomEmoji();
      await xReact(randomEmoji);
      }*/
        //WELL I MADE THIS A CMD WHICH YOU CAN BE ABLE TO CONTROL
        //       FILE /commands/_React_true_false.js
    
      //=========================================
    
      if(body == prefix) {
      await xReact("💢");
      vorterx.sendMessage(m.from,{text:`*Bot is currently running typePrefix* ${prefix}menu *for command list*`},{quoted:m});
       }
      //======================================================
      if (m.message && isGroup) {
      console.log(
      "" + "\n" + chalk.black(chalk.bgWhite("[ GROUP ]   => ")),
      chalk.black(
      chalk.bgRed(isGroup ? gcMeta.subject : m.pushName)
       ) +
       "\n" +
       chalk.black(chalk.bgWhite("[ SENDER ]  => ")),
       chalk.black(chalk.bgRed(m.pushName)) +
       "\n" +
       chalk.black(chalk.bgWhite("[ MESSAGE ] => ")),
       chalk.black(chalk.bgRed(body || type)) + "\n" + ""
       );
       }
      if (m.message && !isGroup) {
      console.log(
      "" + "\n" + chalk.black(chalk.bgWhite("[ PRIVATE CHAT ] => ")),
      chalk.black(chalk.bgMagentaBright("+" + m.from.split("@")[0])) +
      "\n" +
      chalk.black(chalk.bgWhite("[ SENDER ]       => ")),
      chalk.black(chalk.bgMagentaBright(m.pushName)) +
      "\n" +
      chalk.black(chalk.bgWhite("[ MESSAGE ]      => ")),
      chalk.black(chalk.bgMagentaBright(body || type)) + "\n" + ""
      );
      }
    //=============>
    //      
    //XREACT A FUNCTION TO REACT TO ALL CMDS
    //
    //=============>
    async function xReact(emoji) {
      const reactm = {
        react: {
          text: emoji,
          key: m.key,
        },
        };
       await vorterx.sendMessage(m.from, reactm);
        };
        async function doReply(teks) {
  return {
    contextInfo: {
      externalAdReply: {
        title: 'vorterx team',
        mediaType: 1,
        mediaUrl: '',
        sourceUrl: '',
        showAdAttribution: true,
        thumbnail: global.thumb
      }
    }
  };
 return await vorterx.sendMessage(m.from, teks, { quoted: m });
}


  
    
        if (!isCmd) return
      const command =
      vorterx.cmd.get(cmdName) || vorterx.cmd.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
    
      command.xstart(vorterx,
                     m,{
                     name: "vorterx",
                     pushName: m.pushName,
                     arg,
                     doReply,
                     text,
                     xReact
    }) } catch (err) {
        err = String(err);
     if (!err.includes("command.xstart")) console.error(err, 'red');
  }
                                         }
