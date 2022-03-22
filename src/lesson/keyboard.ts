// тест клавиатуры

import {bot} from "../index";

bot.on('message', msg => {
  const chatId = msg.chat.id;
  const { text } = msg;

  if (text === 'Закрыть') {
    bot.sendMessage(chatId, 'Закрываю клавиатуру', {
      reply_markup: {
        remove_keyboard: true,
      }
    })
  } else if (text === 'Ответить') {
    bot.sendMessage(chatId, 'Отвечаю', {
      reply_markup: {
        force_reply: true,
      }
    })
  } else {
    bot.sendMessage(chatId, 'Клавиатура', {
      reply_markup: {
        keyboard: [
          [{
            text: 'Отправить местоположение',
            request_location: true,
          }],
          [{text: 'Ответить'}, {text: 'Закрыть'}],
          [{
            text: 'Отправить контакт',
            request_contact: true,
          }]
        ],
        one_time_keyboard: true
      }
    })
  }
})

