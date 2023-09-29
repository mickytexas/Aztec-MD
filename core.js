require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const { default: AztecConnect, Browsers } = require('@whiskeysockets/baileys');
const { QuickDB } = require('quick.db');
const { Collection } = require('discord.js');
const contact = require('./mangoes/contact.js');
const fs = require('fs');
const { imageSync } = require('qr-image');
const path = require('path');
const { say } = require('cfonts');
const P = require('pino');
const chalk = require('chalk');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

let db; 

async function connectToMongoDB() {
  try {
    const client = new MongoClient(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    db = client.db(); 
    console.log('✔️Connected to MongoDB');
  } catch (error) {
    console.error('➖Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

async function startAztec() {
  await connectToMongoDB();

  const sessionState = JSON.parse(fs.readFileSync('session.json'));

  const vorterxInstance = AztecConnect({
    logger: P({ level: 'silent' }),
    printQRInTerminal: true,
    browser: Browsers.macOS('Desktop'),
    auth: sessionState,
    qrTimeout: undefined,
  });

  say(
    "%c AZTEC MD",
    "font-weight: bold;font-size: 50px;color: red;text-shadow: 3px 3px 0 rgb(217,31,38) ,6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) ,12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) ,18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113); margin-bottom: 12px; padding: 5%"
  );

  const quickDB = new QuickDB({
    driver: db, 
  });

  vorterxInstance.cmd = new Collection();
  vorterxInstance.DB = quickDB;
  vorterxInstance.contactDB = quickDB.table('contacts');
  vorterxInstance.contact = contact;

  readCommands();

  async function readCommands() {
    const cmdDir = './commands';
    fs.readdir(cmdDir, (err, files) => {
      if (err) {
        console.error('Error reading commands directory:', err);
        return;
      }

      files
        .filter((file) => file.endsWith('.js'))
        .forEach((file) => {
          const command = require(`${cmdDir}/${file}`);
          vorterxInstance.cmd.set(command.name, command);
        });
    });
  }

  vorterxInstance.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (update.qr) {
      console.log(`[${chalk.red('!')}]`, 'white');
      vorterxInstance.QR = imageSync(update.qr);
    }
    if (connection === 'open') {
      console.log('💗 You have successfully logged in to Aztec');
      const max = `\`\`\`*👾AZTEC  BEEN CONNECTED👾*\n*VERSION* : ${
        require(__dirname + '/package.json').version
      }\n*BOTNAME* : ${process.env.BOTNAME}\`\`\``;
      vorterxInstance.sendMessage(
        process.env.OWNER_NUMBER + '@s.whatsapp.net',
        max,
        MessageType.text
      );
    }
  });

  vorterxInstance.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close' && lastDisconnect !== DisconnectReason.intended) {
      console.log('Aztec disconnected. Trying to reconnect...');
      await vorterxInstance.restart();
    }
  });

  vorterxInstance.ev.on('error', (error) => {
    console.error('Aztec encountered an error:', error);
  });

  vorterxInstance.ev.on('qr', (qr) => {
    console.log(`[${chalk.red('!')}]`, 'white');
    vorterxInstance.QR = imageSync(qr);
  });

  vorterxInstance.ev.on('disconnect', (reason) => {
    console.log('Aztec disconnected. Reason:', reason);
    if (reason !== 'intended') {
      console.log('Trying to reconnect...');
      vorterxInstance.restart();
    }
  });

  vorterxInstance.ev.on('message.new', async (message) => {
    if (message.isGroup) {
      return;
    }

    const { id, body, fromMe, chat } = message;

    if (fromMe) {
      return;
    }

    const command = body.split(' ')[0].slice(1).toLowerCase();
    const args = body.split(' ').slice(1);

    if (vorterxInstance.cmd.has(command)) {
      try {
        vorterxInstance.cmd.get(command).run(vorterxInstance, message, args);
      } catch (error) {
        console.error('Error executing command:', error);
      }
    }
  });

  await vorterxInstance.start().catch((error) => {
    console.error('Failed to start Aztec:', error);
    process.exit(1);
  });
}

startAztec();
