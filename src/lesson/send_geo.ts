import {bot} from "../index";

// geolocations
bot.onText(/\/loc/, msg => {
  bot.sendLocation(msg.chat.id, 53.864979, 86.628620)
})
