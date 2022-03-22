import {bot} from "../index";

// отправка фото
bot.onText(/\/pic/, msg => {
  bot.sendPhoto(msg.chat.id, __dirname + '/assets/leo.webp', {
    caption: 'This is Leo'
  })
})
