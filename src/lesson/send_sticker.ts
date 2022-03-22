import fs from "fs";
import {bot} from "../index";

// стикеры
bot.onText(/\/s1/, msg => {
  bot.sendSticker(msg.chat.id, __dirname + '/assets/sticker.webp')
})

bot.onText(/\/s2/, msg => {
  fs.readFile(__dirname + '/assets/sticker.webp', (err, data) => {
    bot.sendSticker(msg.chat.id, data);
  })
})
