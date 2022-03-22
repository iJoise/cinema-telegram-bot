import {bot} from "../index";

const inline_keyboard = [
  [
    {
      text: 'Forward',
      callback_data: 'forward'
    }, {
    text: 'Reply',
    callback_data: 'reply'
  }
  ], [
    {
      text: 'Edit',
      callback_data: 'edit'
    }, {
      text: 'Delete',
      callback_data: 'delete'
    }
  ],
]

export function inlineKeyboardAndWorkWithMessage() {
  bot.on('callback_query', query => {

    const { chat, message_id, text } = query.message;

    switch (query.data) {
      case 'forward':
        // куда, откуда, что (id сообщения)
        bot.forwardMessage(chat.id, chat.id, message_id)
        break;
      case 'reply':
        bot.sendMessage(chat.id, `Отвечаем на сообщение`, {
          reply_to_message_id: message_id
        })
        break;
      case 'edit':
        bot.editMessageText(`${text} (edited)`, {
          chat_id: chat.id,
          message_id,
          reply_markup: { inline_keyboard }
        })
        break;
      case 'delete':
        bot.deleteMessage(chat.id, message_id.toString())
        break;
    }

    bot.answerCallbackQuery({
      callback_query_id: query.id
    })

  })

  bot.onText(/\/start/, ((msg, [source, match]) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Keyboards', {
      reply_markup: {
        inline_keyboard
      }
    })

  }))
}
