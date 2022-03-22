// отловить команды /start

import {bot} from "../index";
import {debug} from "../helpers";

export function handleCommand() {
  bot.onText(/\/start/, msg => {
  const {id} = msg.chat;

  bot.sendMessage(id, debug(msg))
})

bot.onText(/\/help (.+)/, (msg, [source, match]) => {
  const {id} = msg.chat;
  bot.sendMessage(id, debug(match))
})
}
