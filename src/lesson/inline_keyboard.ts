// инлайн клавиатуры

import {bot} from "../index";

export function inlineKeyboard() {
  bot.on('message', msg => {
    const chatId = msg.chat.id;
    const {text} = msg;

    bot.sendMessage(chatId, 'Inline-keyboard', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Google',
              url: 'https://google.com',
            }
          ],
          [
            {
              text: 'Reply',
              callback_data: 'reply'
            },
            {
              text: 'Forward',
              callback_data: 'forward'
            }
          ]
        ]
      }
    })
  })

  bot.on('callback_query', query => {
    const {id} = query.message.chat;
    bot.answerCallbackQuery(query.id, {
      callback_query_id: query.id,
      text: `${query.data}`
    })
  })
}
