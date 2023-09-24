require('../../config.js');

const { serialize, decodeJid } = require('./D3centX.js')
const chalk = require('chalk')
const Prefix = prefix;
const PREFIX = (process.env.PREFIX);
const { MongoDriver } = require('quickmongo');
const MONGODB = mongodb;
const driver = new MongoDriver(process.env.MONGODB)

//======================================================

module.exports = MessageHandler = async (messages, vorterx) => {
  let body =
      type == "buttonsResponseMessage"
        ? m.message[type].selectedButtonId
        : type == "listResponseMessage"
        ? m.message[type].singleSelectReply.selectedRowId
        : type == "templateButtonReplyMessage"
        ? m.message[type].selectedId
        : m.text;
    
      let xmat =
      type === "conversation" && body?.startsWith(prefix)
        ? body
        : (type === "imageMessage" || type === "videoMessage") &&
          body &&
          body?.startsWith(prefix)
        ? body
        : type === "extendedTextMessage" && body?.startsWith(prefix)
        ? body
        : type === "buttonsResponseMessage" && body?.startsWith(prefix)
        ? body
        : type === "listResponseMessage" && body?.startsWith(prefix)
        ? body
        : type === "templateButtonReplyMessage" && body?.startsWith(prefix)
        ? body
        : "";
    if (messages.type !== 'notify') return
    let m = serialize(JSON.parse(JSON.stringify(messages.messages[0])), vorterx)
    if (!m.message) return
    if (m.key && m.key.remoteJid === 'status@broadcast') return
    if (m.type === 'protocolMessage' || m.type === 'senderKeyDistributionMessage' || !m.type || m.type === '')

    return
     const antilink = process.env.ANTILINK || true
     const { isGroup, type, sender, from} = m
     const gcMeta = isGroup ? await vorterx.groupMetadata(from) : ''
     const gcName = isGroup ? gcMeta.subject : ''
     const args = body.trim().split(/ +/).slice(1)
     const isCmd = body.startsWith(vorterx.prefix)
     const cmdName =  xmat.slice(prefix.length)
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
       //body.replace(vorterx.config.prefix, '').split(' ')
     const arg = body.replace(cmdName, '').slice(1).trim()
     const groupMembers = gcMeta?.participants || []
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

      if (sender && cmd && prefix ) {
      let emojis = ['😀','🐥','🐤','🐦', '👻','😎','😴','🥫','🍿','🤬','🕵️','😁','🤩','😍','😏','🤮','💩','💥','🔥','💯','🐺','🌚','🦄','🐕','⚽','😊', '🎉', '🌟', '🐱', '🌈', '❤', '👥', '👺', '🎎', '👮‍♂️', '😂', '⚡️', '🍕', '🎸', '🌺','🐧','👀'];
      function getRandomEmoji() {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      return emojis[randomIndex];
      }
      const randomEmoji = getRandomEmoji();
      await xReact(randomEmoji);
      }
    
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
      if (!isCmd) return
      const command =
      vorterx.cmd.get(cmdName) || vorterx.cmd.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
    
      command.xstart(vorterx,
                     arg,
                     xReact,
                     m
     )} catch (err) {
      console.log(err, 'red')
      }
     };
