require('../../config.js');

const { serialize, decodeJid } = require('./D3centX.js')
const chalk = require('chalk')
const { MongoDriver } = require('quickmongo');
const MONGODB = mongodb;
const driver = new MongoDriver(process.env.MONGODB)
  

module.exports = MessageHandler = async (messages, vorterx) => {
  try {
    if (messages.type !== 'notify') return
    let m = serialize(JSON.parse(JSON.stringify(messages.messages[0])), vorterx)
    if (!m.message) return
    if (m.key && m.key.remoteJid === 'status@broadcast') return
    if (m.type === 'protocolMessage' || m.type === 'senderKeyDistributionMessage' || !m.type || m.type === '')
    return
   const antilink = process.env.ANTILINK || true
    const { isGroup, type, sender, from, body } = m
    const gcMeta = isGroup ? await vorterx.groupMetadata(from) : ''
    const gcName = isGroup ? gcMeta.subject : ''
    const args = body.trim().split(/ +/).slice(1)
    const isCmd = body.startsWith(vorterx.prefix)
    const cmdName = body.slice(vorterx.prefix.length).trim().split(/ +/).shift().toLowerCase()
    const arg = body.replace(cmdName, '').slice(1).trim()
    const groupMembers = gcMeta?.participants || []
    const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id)
  //  const m = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    const ActivateMod = (await vorterx.DB.get('mod')) || []
    const banned = (await vorterx.DB.get('banned')) || []

    // Antilink system
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
          m.reply('Successfully removed an intruder!!!!')}
        }
        }
        }
        }
   let sendtext = body.toLowerCase()
    if (sendtext.startsWith('hello bot')) {
    m.reply (`Hello *${m.pushName} Baby*, I Am *Dsan* Your Only *GF*. How Can I Help You?`);
    }    
    if (banned.includes(sender)) return M.reply('You are banned from using the bot')

    // Logging Message
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
    if(!MONGODB) return 
console.error('❌Error Provide a MONGODB URL to continue the process')
driver
.connect() .then(() => {
console.log(chalk.green.bold("👨‍💻You have connected to Aztec-MD"));
        
    if (!isCmd) return
    const command =
      vorterx.cmd.get(cmdName) || vorterx.cmd.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
    
    command.xstart(vorterx,
                   arg, 
                   m)
     } catch (err) {
      console.log(err, 'red')
    }
   }
          } )  ;
