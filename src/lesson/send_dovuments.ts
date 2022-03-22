import fs from "fs";
import {bot} from "../index";

// отправка файлов и документов
bot.onText(/\/doc1/, msg => {
  bot.sendDocument(msg.chat.id, __dirname + '/assets/document.doc')
})
// big file
bot.onText(/\/doc2/, msg => {

  bot.sendMessage(msg.chat.id, 'Upload start...')

  fs.readFile(__dirname + '/assets/test.zip', (err, data) => {
    bot.sendDocument(msg.chat.id, data, {
      caption: 'Additional text'
    }).then(() => {
      bot.sendMessage(msg.chat.id, 'Uploading finish')
    })
  })

})
