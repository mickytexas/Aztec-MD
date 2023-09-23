/*
    AZTEC WABOT V3.0.0
    MULTI AUTH STATE 
  
*/
require('./lib/message/vorterx.js');
require('./config');
const app = require("express")();
const {
  default: AztecConnect,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  useMultiFileAuthState
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');
const PORT = global.port;
const express = require("express");
const config = require('./config');
const vorterx= require('./lib/message/vorterx.js');
const { QuickDB } = require('quick.db')
const { MongoDriver } = require('quickmongo');
const fs = require("fs");
const { Collection } = require('discord.js')
const qr = require("qr-image");
const contact = require("./mangoes/contact.js");
const MessageHandler = require('./lib/message/vorterx.js');
const driver = new MongoDriver(process.env.MONGODB)
const store = makeInMemoryStore({ 
    logger: P().child(
    { level: 'silent', stream: 'store'
    }) 
    })

  //vorterx.config = config()
  async function startAztec() {

  const { state, saveState } = useMultiFileAuthState('./lib/anexa.json');


      const clearState = () => {
  fs.unlinkSync("./lib/anexa.json");
}
  const vorterx = AztecConnect({
    logger: P({ level: "silent" }),
    printQRInTerminal: false,
    browser: ["vorterx", "Firefox", "1.0.0"],
    qrTimeout: 5000,
    auth: state,
    version: (await fetchLatestBaileysVersion()).version,
    
  })

  store.bind(vorterx.ev)
  vorterx.cmd = new Collection()
  vorterx.DB = new QuickDB({driver
  })

  
  vorterx.contactDB = vorterx.DB.table('contacts')
  vorterx.contact = contact

  

    async function readcommands() {
    const cmdfile = fs
    .readdirSync("./Commands")
    .filter((file) => file.endsWith(".js"));
    for (const file of cmdfile) {
    const command = require(`./Commands/${file}`);
    vorterx.cmd.set(command.name, command);
    }
    };
if(!MONGODB) return 
console.error('❌Error Provide a MONGODB URL to continue the process')
driver
.connect() .then(() => {
console.log(chalk.green.bold("👨‍💻You have connected to Aztec-MD"));
        

  readcommands()
 const PORT = port;
 const app = express();
      
  vorterx.ev.on('creds.update', saveState)
  vorterx.ev.on('connection.update', async (update) => {

  const { connection, lastDisconnect } = update


    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode; if (reason === DisconnectReason.connectionClosed) {
      console.log("Connection closed, reconnecting....");
      startAztec();
      } else if (reason === DisconnectReason.connectionLost) {
      console.log("Connection Lost from Server, reconnecting...");
      startAztec();
      } else if (reason === DisconnectReason.loggedOut) {
      clearAztec();
      console.log(` Device Logged Out, Please Delete Session and Scan Again.`);
      process.exit();
      } else if (reason === DisconnectReason.restartRequired) {
      console.log("Server starting...");
      startAztec();
      } else if (reason === DisconnectReason.timedOut) {
      console.log("Connection Timed Out, Trying to Reconnect....");
      startAztec();
      } else {
      console.log(`Server Disconnected: Maybe Your WhatsApp Account got banned !` );
      clearState();
      }
      }
     if (update.qr) {
     vorterx.QR = qr.imageSync(update.qr)
     }
     }
     )
   app.get("/", (req, res) => {res.end(vorterx.QR) })
   vorterx.ev.on('messages.upsert', async (messages) => await MessageHandler(messages, vorterx))
   vorterx.ev.on('contacts.update', async (update) => await contact.saveContacts(update, vorterx))
   })
    }
   startAztec()
  .catch((err) => console.error(err))
  app.listen(PORT, () => { 
            console.log(`🎎AZTEC IS CURRENTLY RUNNING ON PORT ${PORT}`);});
