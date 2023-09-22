require('dotenv').config()

module.exports.config = () => {
    return {
        botName: process.env.BOTNAME || 'AZTEC MD',
        prefix: process.env.PREFIX || '.',
        session: process.env.SESSION || 'add something', //replace this to any text
        mongodb: process.env.MONGODB || '',
        port: process.env.PORT || '8000',
        caption: process.env.CAPTION || 'By Aztec MD',
        mods: (process.env.MODS || '').split(',')
        }
       }
