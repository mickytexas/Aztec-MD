const express = require('express');
const { default: WAConnection, DisconnectReason, Browsers, fetchLatestBaileysVersion, makeInMemoryStore, useMultiFileAuthState } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');
const { QuickDB } = require('quick.db');
const fs = require('fs');
const config = require('./config');
const { Collection } = require('discord.js');
const contact = require('./mangoes/contact.js');
const MessageHandler = require('./lib/message/vorterx');
const Diego = 'https://i.imgur.com/XnOaCsE.jpeg';
const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) });
const PORT = process.env.PORT || 3000;
let cc = config.sessionName.replace(/Vorterx;;;/g, "");

async function MakeSession() {
  if (!fs.existsSync(__dirname + '/lib/auth_info_baileys/creds.json')) {
    if (cc.length < 30) {
      const axios = require('axios');
      let { data } = await axios.get('https://paste.c-net.org/' + cc);
      await fs.writeFileSync(__dirname + '/lib/auth_info_baileys/creds.json', Buffer.from(data, 'base64').toString('utf-8'));
    } else {
      var c = Buffer.from(cc, 'base64').toString('utf-8');
      await fs.writeFileSync(__dirname + '/lib/auth_info_baileys/creds.json', c);
    }
  }
}

MakeSession();

setTimeout(() => {
  const moment = require('moment-timezone');

  async function main() {
    if (!fs.existsSync(__dirname + '/lib/auth_info_baileys/creds.json')) {
   }

    async function startAztec() {
      require("events").EventEmitter.defaultMaxListeners = 600;
      const getVersionWaweb = () => {
        let version;
        try {
          let a = fetchJson('https://web.whatsapp.com/check-update?version=1&platform=web');
          version = [a.currentVersion.replace(/[.]/g, ','),];
        } catch {
          version = [2, 2204, 13];
        }
        return version;
      };

      const { version } = await fetchLatestBaileysVersion();

      const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/lib/auth_info_baileys/');

      const vorterx = new WAConnection();
      vorterx.logger = P({ level: 'fatal' });
      vorterx.printQRInTerminal = true;
      vorterx.browserDescription = Browsers.macOS("Desktop");
      vorterx.fireInitQueries = false;
      vorterx.shouldSyncHistoryMessage = false;
      vorterx.downloadHistory = false;
      vorterx.syncFullHistory = false;
      vorterx.generateHighQualityLinkPreview = true;
      vorterx.auth = state;
      vorterx.version = getVersionWaweb() || [2, 2242, 6];
      vorterx.getMessage = async (key) => {
        if (store) {
          const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
          return msg.message || undefined;
        }
        return { conversation: 'An Error Occurred, Repeat Command!' };
      };

      store.bind(vorterx.ev);

      vorterx.cmd = new Collection();
      vorterx.DB = new QuickDB();
      vorterx.contactDB = vorterx.DB.table('contacts');
      vorterx.contact = contact;

      await readCommands(vorterx);

      vorterx.ev.on('credentials-updated', saveCreds);

      vorterx.ev.on('connection-update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (
          connection === 'close' ||
          connection === 'lost' ||
          connection === 'restart' ||
          connection === 'timeout'
        ) {
          let reason = new Boom(lastDisconnect?.error)?.output.statusCode;

          console.log(`Connection ${connection}, reconnecting...`);

          if (reason === DisconnectReason.loggedOut) {
            console.log('Device Logged Out, Please Delete Session and Scan Again.');
            process.exit();
          }

          await startAztec();
        } else if (connection === 'close') {
          console.log(`[ 🐲AZTEC ] Connection closed, reconnecting...`);
          await startAztec();
        } else{
          console.log(`Connection ${connection}, reconnecting...`);
          await startAztec();
        }
      });

      await vorterx.connect();

      console.log('Aztec is connected and ready!');

      vorterx.ev.on('ws-close', async ({ reason }) => {
        console.log('WS closed');
        console.log('Closing...');
        await vorterx.logout();
        process.exit();
      });

      vorterx.ev.on('ws-close', async ({ reason }) => {
        console.log('WS closed');
        console.log('Closing...');
        await vorterx.logout();
        process.exit();
      });

      vorterx.ev.on('user-presence-update', async (presence) => {
        const { id, presence: { lastKnownPresence } } = presence;
        console.log(`Presence update: ${id} is ${lastKnownPresence}`);
      });

      vorterx.ev.on('chat-update', async (chatUpdate) => {
        try {
          await MessageHandler(vorterx, chatUpdate);
        } catch (err) {
          console.error(`Error in chat-update event: ${err}`);
        }
      });
    }

    await startAztec();
  }

  main().catch((err) => console.error(err));
}, 3000);

const app = express();

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
