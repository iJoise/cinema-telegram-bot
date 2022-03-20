require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const debug = require('./helpers/index');
const greetings = require('./data/index');


const TOKEN = process.env.TOKEN;
console.log('\x1b[42m%s\x1b[0m', 'Bot has been started ...')

const bot = new TelegramBot(TOKEN, {
   polling: {
      interval: 300,
      autoStart: true,
      params: {
         timeout: 10,
      }
   },
});

// bot.onText(/\/start/, msg => {
//    const {id} = msg.chat;
//
//    bot.sendMessage(id, debug(msg))
// })
//
// bot.onText(/\/help (.+)/, (msg, [source, match]) => {
//    const {id} = msg.chat;
//    bot.sendMessage(id, debug(match))
// })

bot.on('message', msg => {
   const chatId = msg.chat.id;
   const {text} = msg;

   bot.sendMessage(chatId, 'Inline-keyboard', {
      reply_markup: {
         inline_keyboard: [

         ]
      }
   })
})
