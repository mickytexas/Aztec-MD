/*
    AZTEC WABOT V3.0.0
    MULTI AUTH STATE 
  
*/
require('./lib/message/vorterx.js');
require('./config');
const app = require('express')();
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
const MONGODB = global.mongodb;
const { MongoDriver } = require('quickmongo');
const fs = require("fs");
const { Collection } = require('discord.js')
//const qr = require("qr-image");
const chalk = require('chalk');
const { imageSync } = require('qr-image');
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

  const { state, saveCreds } = await useMultiFileAuthState('session');
       console.log("%c AZTEC MD", 
        "font-weight: bold;font-size: 50px;color: red;text-shadow: 3px 3px 0 rgb(217,31,38) ,6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) ,12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) ,18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113); margin-bottom: 12px; padding: 5%");

  const vorterx = AztecConnect({
    logger: P({ level: "silent" }),
    printQRInTerminal: true,
    browser: Browsers.macOS("Desktop"),
    auth: state,
    version: (await fetchLatestBaileysVersion()).version,
    
  })
 await console.log("[🚀AZTEC WABOT HAS STARTED TO LAUNCH]");
  store.bind(vorterx.ev)
  vorterx.cmd = new Collection()
  vorterx.DB = new 
  })

  
  vorterx.contactDB = vorterx.DB.table('contacts')
  vorterx.contact = contact

  

    async function readcommands() {
    const cmdfile = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
    for (const file of cmdfile) {
    const command = require(`./commands/${file}`);
    vorterx.cmd.set(command.name, command);
    }
    };

  readcommands()
 const PORT = port;
 const app = express();
      
  vorterx.ev.on('creds.update', saveCreds)
  vorterx.ev.on('connection.update', async (update) => {

  const { connection, lastDisconnect } = update
 if (update.qr) {
            console.log(`[${chalk.red('!')}]`, 'white')
            vorterx.QR = imageSync(update.qr)
        }
        if (connection === "open") {
        console.log("💗 You have successfully logged in to Aztec");
        let max = `\`\`\`👾*AZTEC WABOT HAS BEEN CONNECTED*👾\n*VERSION* : ${
        require(__dirname + "/package.json").version
        }\n*BOTNAME* : ${process.env.BOTNANE}\n*UPDATED* : LATEST\`\`\``;
        vorterx.sendMessage(vorterx.user.id, {
        text: max,
        });
        }
      if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode; if (reason === DisconnectReason.connectionClosed) {
      console.log("[👾 AZTEC ] Connection closed, reconnecting....");
      startAztec();
      } else if (reason === DisconnectReason.connectionLost) {
      console.log("[👾 AZTEC ] Connection Lost from Server, reconnecting...");
      startAztec();
      } else if (reason === DisconnectReason.loggedOut) {
      clearAztec();
      console.log(`[👾 AZTEC ] Device Logged Out, Please Delete Session and Scan Again.`);
      await delay(3000);
        process.exit(0);
      } else if (reason === DisconnectReason.restartRequired) {
      console.log("[👾 CONNECT ] Server starting...");
      startAztec();
      } else if (reason === DisconnectReason.timedOut) {
      console.log("[👾 CONNECT ] Connection Timed Out, Trying to Reconnect....");
      startAztec();
      } else 
          vorterx.end(`[👾 SERVER ] Server Disconnected: ${reason} | ${connection}`);
      }
      })
   app.get('/', (req, res) => {
   res.status(200).setHeader('Content-Type', 'image/png').send(vorterx.QR)
    })
    vorterx.ev.on('messages.upsert', async (messages) => await MessageHandler(messages, vorterx))
   vorterx.ev.on('contacts.update', async (update) => await contact.saveContacts(update, vorterx))
     }
 if(!process.env.MONGODB) return 
 console.error('❌Error Provide a MONGODB URL to continue the process')
 driver
.connect() .then(() => {
 console.log(chalk.green.bold("👨‍💻You have connected to Aztec-MD"));
        
    startAztec()
    })

.catch((err) => console.error(err))
 app.listen(PORT, () => { 
            console.log(`🎎AZTEC IS CURRENTLY RUNNING ON PORT ${PORT}`);});
