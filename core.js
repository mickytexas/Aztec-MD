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
const driver = new MongoDriver(global.mongodb)
const store = makeInMemoryStore({
  logger: P().child({
    level: 'silent',
    stream: 'store'
  })
});

function startAztec() {
  useMultiFileAuthState('session')
    .then(({ state, saveCreds }) => {
      console.log(
  "AZTEC MD",
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
          } else if (reason=== DisconnectReason.invalidSession) {
            console.log("[👾 AZTEC ] Invalid session, reconnecting....");
            startAztec();
          } else if (reason === DisconnectReason.invalidCredentials) {
            console.log("[👾 AZTEC ] Invalid credentials, please check your session file...");
            console.log("Exiting...");
            process.exit(1);
          } else {
            console.log("[👾 AZTEC ] Connection closed with reason:", reason);
            console.log("Exiting...");
            process.exit(1);
          }
        }
      });

      vorterxInstance.ev.on('login.2fa', async ({ close }) => {
        console.log("[📲 AZTEC ] Please enter the 2FA code:");
        const rl = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.on('line', async (line) => {
          rl.close();
          close(line);
        });
      });

      vorterxInstance.ev.on('chats.update', async ({ chats }) => {
        const unread = chats.filter(chat => chat.unreadCount > 0);
        if (unread.length > 0) {
          console.log(`[🔔 AZTEC ] You have ${unread.length} unread chats.`);
        }
      });

      vorterxInstance.ev.on('chat.update', async ({ jid, count, chat }) => {
        console.log(`[🆕 AZTEC ] New message from ${jid}, message count: ${count}`);
      });

      app.use(express.static(path.join(__dirname, 'public')));

      app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "public", "index.html"));
      });

      app.listen(PORT, () => {
        console.log(`[🌐 AZTEC ] Web server is running on port ${PORT}`);
      });
    })
    .catch(console.error);
}

startAztec();
