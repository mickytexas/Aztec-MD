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
const PORT = (process.env.PORT);
const PREFIX = (process.env.PREFIX);
const BOTNAME = (process.env.BOTNAME);
const { imageSync } = require('qr-image');
const path = require('path');
const { say } = require('cfonts');
const express = require("express");
const { MongoDriver } = require('quickmongo');
const config = require('./config');
const vorterx = require('./lib/message/vorterx.js');
const { QuickDB } = require('quick.db');
const mongoose = require('mongoose');
const fs = require("fs");
const { Collection } = require('discord.js');
const chalk = require('chalk');
const { remove } = require('fs-extra');
const contact = require("./mangoes/contact.js");
const MessageHandler = require('./lib/message/vorterx.js');
const driver = new MongoDriver(process.env.MONGODB_URI)
const store = makeInMemoryStore({
  logger: P().child({
    level: 'silent',
    stream: 'store'
  })
});

if (!process.env.MONGODB_URI) {
  console.error('❌Error: Provide a MONGODB URL to continue the process');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

async function startAztec() {
  const { MakeSession } = require("./lib/session");
  const { state, saveCreds } = await useMultiFileAuthState('/connects/creds.json');

  if (!fs.existsSync(sessionCredentialsPath)) {
    await MakeSession(config.session_id, sessionCredentialsPath);
    console.log("Version: " + require("./package.json").version);
  }

  say("%c AZTEC MD",
    "font-weight: bold;font-size: 50px;color: red;text-shadow: 3px 3px 0 rgb(217,31,38) ,6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) ,12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) ,18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113); margin-bottom: 12px; padding: 5%");

  const vorterxInstance = AztecConnect({
    logger: P({ level: "silent" }),
    printQRInTerminal: true,
    browser: Browsers.macOS("Desktop"),
    auth: state,
    qrTimeout: undefined,
    version: (await fetchLatestBaileysVersion()).version,
  });

  console.log("[🚀AZTEC WABOT HAS STARTED TO LAUNCH]");

  store.bind(vorterxInstance.ev);
  vorterxInstance.cmd = new Collection();
  vorterxInstance.DB = new QuickDB({
    driver
  });
  vorterxInstance.contactDB = vorterxInstance.DB.table('contacts');
  vorterxInstance.contact = contact;

  async function readCommands() {
    const cmdFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
    for (const file of cmdFiles) {
      const command = require(`./commands/${file}`);
      vorterxInstance.cmd.set(command.name, command);
    }
  }

  await readCommands();

  vorterxInstance.ev.on('creds.update', saveCreds);

  vorterxInstance.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (update.qr) {
      console.log(`[${chalk.red('!')}]`, 'white');
      vorterxInstance.QR = imageSync(update.qr);
    }

    if (connection === "open") {
      console.log("💗 You have successfully logged in to Aztec");
    }

    if (connection === "close" && lastDisconnect === DisconnectReason.invalidSession) {
      console.log("🔒 InvalidSession detected. Please reauthenticate.");
    }
  });

  vorterxInstance.ev.on('connection.update', (update) => {
    if (update.connection === 'close') {
      console.log('🔌 Connection closed. Reason:', update.lastDisconnect);
    }
  });

  vorterxInstance.ev.on('qr.update', (update) => {
    console.log('📲 QR Code updated. Scan QR code to log in.');
  });

  vorterxInstance.ev.on('auth-state.update', (update) => {
    console.log('🔐 Authentication state updated:', update);
  });

  vorterxInstance.ev.on('error', (error) => {
    console.error('❌ Error:', error);
  });

  vorterxInstance.ev.on('message.new', async (message) => {
    try {
      await MessageHandler(vorterxInstance, message);
    } catch (error) {
      console.error('❌ Error handling message:', error);
    }
  });

  app.use(express.json());

  app.post("/vorterx", async (req, res) => {
    const message = req.body;
    try {
      await MessageHandler(vorterxInstance, message);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('❌ Error handling message:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  app.listen(PORT, () => {
   console.log(`🚀 Vorterx API listening on port ${PORT}`);
  });
}

startAztec().catch((error) => {
  console.error('❌ Error starting Aztec:', error);
  process.exit(1);
});
