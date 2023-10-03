require('./lib/message/vorterx');
require('./config');

const app = require("express")();
const { default: AztecConnect, DisconnectReason, Browsers, fetchLatestBaileysVersion, makeInMemoryStore, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');
const { QuickDB } = require('quick.db');
const { MongoDriver } = require('quickmongo');
const fs = require("fs");
const config = require('./config.js');
const { Collection } = require('discord.js');
const contact = require("./mangoes/contact.js");
const MessageHandler = require('./lib/message/vorterx');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('You have not provided any MongoDB URI!!');
  process.exit(1);
}
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Failed to connect to MongoDB:', error));

const driver = new MongoDriver(MONGODB_URI);
const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) });

async function startAztec() {
  let { version } = await fetchLatestBaileysVersion();

  const { state, saveCreds } = useMultiFileAuthState("./connects/creds.json");
  const sessionCredentialsPath = './connects/creds.json';
  
  const vorterx = new AztecConnect({
    logger: P({ level: "silent" }),
    printQRInTerminal: false,
    browser: Browsers.maCos('Desktop'),
    userAgent: Browsers.firefox('Desktop').userAgent,
    qrTimeout: undefined,
    auth: state,
    version
  });

  store.bind(vorterx.ev);

  vorterx.cmd = new Collection();

  vorterx.DB = new QuickDB({
    driver
  });

  vorterx.contactDB = vorterx.DB.table('contacts');

  vorterx.contact = contact;

  async function readcommands() {
    const cmdFiles = fs
      .readdirSync("./Commands")
      .filter((file) => file.endsWith(".js"));
    for (const file of cmdFiles) {
      const command = require(`./Commands/${file}`);
      vorterx.cmd.set(command.name, command);
    }
  }

  await readcommands();

  vorterx.ev = vorterx.ev;

  vorterx.ev.on('creds.update', saveCreds);

  vorterx.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.connectionClosed) {
        console.log("Connection closed, reconnecting....");
        await startAztec();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, reconnecting...");
        await startAztec();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log(`Device Logged Out, Please Delete Session and Scan Again.`);
        process.exit();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("Server starting...");
        await startAztec();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("Connection Timed Out, Trying to Reconnect....");
        await startAztec();
      } else {
        console.log(`Server Disconnected: Maybe Your WhatsApp Account got banned!`);
      }
    }
  });

  vorterx.ev.on('messages.upsert', async (messages) => await MessageHandler(messages, vorterx));

  vorterx.ev.on('contacts.update', async (update) => await contact.saveContacts(update, vorterx));

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}/`);
  });

  await vorterx.connect();
}

startAztec();
