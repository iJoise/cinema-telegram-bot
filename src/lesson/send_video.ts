import fs from "fs";
import {bot} from "../index";

// video
bot.onText(/\/v2/, msg => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, 'Sending video...')
  bot.sendVideo(chatId, __dirname + '/assets/video.mov')
})

bot.onText(/\/v3/, msg => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, 'Sending video...')
  fs.readFile(__dirname + '/assets/video.mov', (err, data) => {
    bot.sendVideo(chatId, data)
  })
})
