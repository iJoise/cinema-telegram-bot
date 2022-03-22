import fs from "fs";
import {bot} from "../index";

// отправка аудио
bot.onText(/\/audio/, msg => {
  bot.sendAudio(msg.chat.id, __dirname + '/assets/dengi.mp3')
})

// отправка больших файлов после полного считывания его
bot.onText(/\/audio2/, msg => {

  bot.sendMessage(msg.chat.id, 'Start audio uploading...')

  fs.readFile(__dirname + '/assets/dengi.mp3', (err, data) => {
    bot.sendAudio(msg.chat.id, data).then(() => {
      bot.sendMessage(msg.chat.id, 'Uploading finish')
    })
  })
})
