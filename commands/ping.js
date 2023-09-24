const axios = require ('axios');

module.exports = {
  name: 'ping',
  desc: 'yes',
  category: 'ccc',
 async xstart(vorterx,m,{xReact}) {

   await xReact('👺');
    var inital = new Date().getTime();
    const { key } = await vorterx.sendMessage(m.from, {text: '_Checking ping!!!_'});
    var final = new Date().getTime();
   // await Secktor.sleep(1000)
   return await vorterx.sendMessage(m.from, {text: '*𝘗𝘐𝘕𝘎*\n *' + (final - inital) + ' 𝘔𝘚* ', edit: key});
  }
};
