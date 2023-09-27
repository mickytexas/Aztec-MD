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
  Browsers,
  useMultiFileAuthState
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');
const PORT = global.port;
const PREFIX = global.prefix;
const BOTNAME = global.botname;
const { imageSync } = require('qr-image');
const path = require('path');
const {
    say 
          } = require('cfonts');
const express = require("express");
const config = require('./config');
const vorterx = require('./lib/message/vorterx.js');
const { QuickDB } = require('quick.db')
const MONGODB = global.mongodb;
const { MongoDriver } = require('quickmongo');
const fs = require("fs");
const { Collection } = require('discord.js')
const chalk = require('chalk');
const { remove } = require('fs-extra');
const contact = require("./mangoes/contact.js");
const MessageHandler = require('./lib/message/vorterx.js');
const driver = new MongoDriver(process.env.MONGODB)
const store = makeInMemoryStore({
  logger: P().child({
    level: 'silent',
    stream: 'store'
  })
})
function startAztec() {
   useMultiFileAuthState('session')
    .then(({ state, saveCreds }) => {
      console.log(
        "%c AZTEC MD",
        "font-weight: bold;font-size: 50px;color: red;text-shadow: 3px 3px 0 rgb(217,31,38) ,6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) ,12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) ,18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113); margin-bottom: 12px; padding: 5%"
      );

      const vorterxInstance = AztecConnect({
        logger: P({ level: "silent" }),
        printQRInTerminal: true,
        browser: Browsers.macOS("Desktop"),
        auth: state,
        qrTimeout: undefined,
        version: fetchLatestBaileysVersion().version,
      });

      console.log("[🚀AZTEC WABOT HAS STARTED TO LAUNCH]");
      store.bind(vorterxInstance.ev);
      vorterxInstance.cmd = new Collection();
      vorterxInstance.DB = new QuickDB({
        driver,
      });
      vorterxInstance.contactDB = vorterxInstance.DB.table('contacts');
      vorterxInstance.contact = contact;

      readCommands();

     async function readCommands() {
        const cmdDir = "./commands";
        fs.readdir(cmdDir, (err, files) => {
          if (err) {
            console.error("Error reading commands directory:", err);
            return;
          }

          files.filter(file => file.endsWith(".js"))
            .forEach(file => {
              const command = require(`${cmdDir}/${file}`);
              vorterxInstance.cmd.set(command.name, command);
            });
        });
      }
    .catch(error => {
      console.error("Error starting Aztec:", error);
    })

  vorterxInstance.ev.on('creds.update', saveCreds);
  vorterxInstance.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (update.qr) {
      console.log(`[${chalk.red('!')}]`, 'white');
      vorterxInstance.QR = imageSync(update.qr);
    }
    if (connection === "open") {
      console.log("💗 You have successfully logged in to Aztec");
      const max = `\`\`\`*👾AZTEC  BEEN CONNECTED👾*\n*VERSION* : ${
        require(__dirname + "/package.json").version
      }\n*BOTNAME* : ${global.botname}\n*UPDATED* : LATEST\n *PREFIX* : ${global.prefix} \`\`\``;
      vorterxInstance.sendMessage(vorterxInstance.user.id, {
        text: max,
      });
    }
    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.connectionClosed) {
        console.log("[👾 AZTEC ] Connection closed, reconnecting....");
        startAztec();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("[👾AZTEC ] Connection Lost from Server, reconnecting...");
        startAztec();
      } else if (reason === DisconnectReason.loggedOut) {
        await remove('session');
        console.log("[👾 AZTEC ] Device Logged Out, Please Delete Session and Scan Again.");
        process.exit(0);
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("[👾 CONNECT ] Server starting...");
        startAztec();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("[👾 CONNECT ] Connection Timed Out, Trying to Reconnect....");
        startAztec();
      } else {
        vorterxInstance.end(`[👾 SERVER ] Server Disconnected: ${reason} | ${connection}`);
      }
    }
  });

  app.get('/', (req, res) => {
    res.status(200).setHeader('Content-Type', 'image/png').send(vorterxInstance.QR);
  });

  vorterxInstance.ev.on('messages.upsert', async (messages) => await MessageHandler(messages, vorterxInstance));
  vorterxInstance.ev.on('contacts.update', async (update) => await contact.saveContacts(update, vorterxInstance));
}
let connectionEstablished = false;
let serverStarted = false;

const establishConnection = async () => {
  try {
    await driver.connect();
    console.log(chalk.green.bold("👨‍💻You have connected to Aztec-MD"));
    connectionEstablished = true;

    if (serverStarted) {
      startAztec();
    }
  } catch (error) {
    console.error(error);
  }
};

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`RUNNING ON PORT ${PORT}`);
    serverStarted = true;

    if (connectionEstablished) {
      startAztec();
    }
  });
};
if (!process.env.MONGODB) {
  console.error('❌Error: Provide a MONGODB URL to continue the process');
} else {
  const connectionPromise = establishConnection();
  const serverPromise = new Promise((resolve) => {
    startServer();
    resolve();
  });

  Promise.all([connectionPromise, serverPromise]).catch((error) => {
    console.error('❌Error:', error);
  });
}
