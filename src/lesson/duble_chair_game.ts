import {bot} from "../index";
import {greetings} from "../data";

// игра - есть два стула

export function doubleChairGame() {
  bot.on('message', msg => {
    const { id } = msg.chat;

    if (greetings.includes(msg.text.toLowerCase()) || msg.text === '/start') {
      bot.sendMessage(id, `Здарова заебал, ${msg.from.first_name} 🕺🏿!!!`);
      bot.sendMessage(id, `Есть два стула...`, {
        reply_markup: {
          keyboard: [
            [{text: '♠️ пики точёные'}, {text: '🍌 хуи дрочёные'}],
            [{text: '🤪 хз я ебалан'}],
          ]
        }
      });
    }
    if (msg.text === '♠️ пики точёные') {
      bot.sendVideo(id, 'BAACAgIAAxkBAAN6Yjc-01Kjfq6_WGTORjR84CRSbZ4AAvwXAAL-cMFJ64GnCKkix4AjBA')
    }
    if (msg.text === '🤪 хз я ебалан') {
      bot.sendVideo(id, 'BAACAgIAAxkBAAN0Yjc-uG-13EbV_oWF9eA_qRxwDcEAAvoXAAL-cMFJZ50oU9txvBkjBA')
    }
    if (msg.text === '🍌 хуи дрочёные') {
      bot.sendVideo(id, 'BAACAgIAAxkBAAOXYjdCmYypuEvgf9-JaguCeGz7X3YAAgoYAAL-cMFJlWdpZtl4TE0jBA')
    }
  })
}
