import NetworkSpeed from 'network-speed'

const test = new NetworkSpeed()
import { path } from 'path'

import { tmpdir } from 'os'

module.exports = {
  name: 'test',
  description: 'Cheking ping',
  category: 'Networks',
  async xstart(vorterx,m,{text, args,xReact}) => {


    await xReact('🚦');
      let old = new Date()
      let download = await getNetworkDownloadSpeed()
      async function getNetworkDownloadSpeed() {

      const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000'
      const fileSizeInBytes = 500000
      const speed = await test.checkDownloadSpeed(baseUrl, fileSizeInBytes)

         return speed
    }
    let upload = await getNetworkUploadSpeed()
    async function getNetworkUploadSpeed() {
    const options = {

            hostname: 'www.google.com',
            port: 80,
            path: tmpdir(),
            method: 'POST',
            headers: {
           'Content-Type': 'application/json',
       }

   }
 const fileSizeInBytes = 2000000
 const speed = await test.checkUploadSpeed(options, fileSizeInBytes)
return speed
        }
       let text = '🚦◦ *Downloads* : ' + download.mbps + ' mbps\n'
       text += '🚦◦ *Uploads* : ' + upload.mbps + ' mbps\n'
       text += '🚦◦ *Response* : ' + ((new Date - old) * 1) + ' ms'
       vorterx.reply(m.from, text, m)
    },
}
