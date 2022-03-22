import {bot} from "../index";

// send contact
bot.onText(/\/contact/, msg => {
  bot.sendContact(msg.chat.id, '83004002000', 'JoiseBot', {
    last_name: 'Surname'
  })
})


