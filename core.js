require('dotenv').config();
const express = require('express');
const { default: AztecConnect, Browsers } = require('@whiskeysockets/baileys');
const { Collection } = require('discord.js');
const contact = require('./mangoes/contact.js');
const fs = require('fs');
const { imageSync } = require('qr-image');
const path = require('path');
const { say } = require('cfonts');
const P = require('pino');
const chalk = require('chalk');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function connectToMongoose() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✔️ Connected to MongoDB');
  } catch (error) {
    console.error('➖ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

async function startAztec() {
  await connectToMongoose();

  const sessionState = JSON.parse(fs.readFileSync(__dirname + '/connects/session.json'));

  const vorterxInstance = AztecConnect({
    logger: ({ level: 'silent' }),
    printQRInTerminal: true,
    browser: Browsers.macOS('Desktop'),
    auth: sessionState,
    qrTimeout: undefined,
  });

  say(
    "%c AZTEC MD",
    "font-weight: bold;font-size: 50px;color: red;text-shadow: 3px 3px 0 rgb(217,31,38) ,6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) ,12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) ,18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113); margin-bottom: 12px; padding: 5%"
  );

  const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Contact = mongoose.model('Contact', contactSchema);

  vorterxInstance.cmd = new Collection();
  vorterxInstance.contactDB = Contact;
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

  vorterxInstance.ev.on('chat-update', async (chatUpdate) => {
    if (chatUpdate.isNewMessage) {
      const message = chatUpdate.messages.all()[0];

      if (!message.message || !message.message.conversation || !message.message.conversation.startsWith('/'))
        return;

      const commandName = message.message.conversation.split(' ')[0].substring(1);
      const args = message.message.conversation.split(' ').slice(1);

      const command = vorterxInstance.cmd.get(commandName);
      if (!command) {
        await vorterxInstance.reply(
          message.key.remoteJID,
          MessageType.text
        );
        return;
      }

      try {
        await command.execute(vorterxInstance, message, args);
      } catch (error) {
        console.error(`Error executing command ${commandName}:`, error);
        await vorterxInstance.reply(
          message.key.remoteJID,
          MessageType.text
        );
      }
    }
  });

  await vorterxInstance.ready();

  fs.writeFileSync(__dirname + '/connects/session.json', JSON.stringify(vorterxInstance.base64EncodedAuthInfo(), null, '\t'));
}

startAztec().catch((error) => {
  console.error('An error occurred while starting Aztec:', error);
  process.exit(1);
});
