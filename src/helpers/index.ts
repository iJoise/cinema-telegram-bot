import TelegramBot from "node-telegram-bot-api";
import {StyleFunction} from "ansi-colors";

export class Helpers {
   static logStart() {
      console.log('\x1b[42m%s\x1b[0m', 'Bot has been started ...');
   }
   static debug(obj = {}) {
      return JSON.stringify(obj, null, 4);
   }
   static getChatId(msg:  TelegramBot.Message) {
      return msg.chat.id
   }
   static logger(text: string, textColor: StyleFunction, background?: StyleFunction) {
      if (background && textColor) {
         console.log(background(textColor(`${text}`)));
      } else {
         console.log(textColor(`${text}`));
      }
   }
}
