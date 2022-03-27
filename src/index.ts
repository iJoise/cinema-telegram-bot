import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import {Helpers} from "./helpers";
import {kb, keyboards} from "./keyboards";
import mongoose from 'mongoose';
import {bgBlue, bgRed} from "ansi-colors";
import {Utils} from "./utils";
import {Film} from "./model/film.model";
import {Cinema} from "./model/cinema.model";
import {ACTIONS_TYPE} from "./enum";
import {ActionsInlineKeyboard} from "./types";
import {User} from "./model/user.model.js";

dotenv.config()
Helpers.logStart();
const {getChatId} = Helpers;

mongoose.connect(process.env.DB_URL)
  .then(() => Helpers.logger('MongoDB connected', bgBlue))
  .catch((err) => Helpers.logger(err, bgRed))

export const bot = new TelegramBot(process.env.TOKEN, {
  polling: true
});

bot.on('message', msg => {

  switch (msg.text) {
    case kb.home.favourite:
      Utils.showFavouriteFilms(getChatId(msg), msg.from.id)
      break;
    case kb.home.films:
      bot.sendMessage(getChatId(msg), 'Выберите жанр:', {
        reply_markup: {keyboard: keyboards.film}
      })
      break;
    case kb.film.comedy:
      Utils.sendFilmsByQuery(getChatId(msg), {type: 'comedy'})
      break;
    case kb.film.action:
      Utils.sendFilmsByQuery(getChatId(msg), {type: 'action'})
      break;
    case kb.film.random:
      Utils.sendFilmsByQuery(getChatId(msg), {})
      break;
    case kb.home.cinemas:
      bot.sendMessage(getChatId(msg), kb.cinemas, {
        reply_markup: {
          keyboard: keyboards.cinemas
        }
      })
      break;
    case kb.back:
      bot.sendMessage(getChatId(msg), 'Что хотите посмотреть?', {
        reply_markup: {keyboard: keyboards.home}
      })
      break;
  }

  if (msg.location) {
    Utils.getCinemasInCoors(getChatId(msg), msg.location);
  }

})

bot.onText(/\/c(.+)/, async (msg, [source, match]) => {
  const cinema = await Cinema.findOne({uuid: match});

  bot.sendMessage(getChatId(msg), `Кинотеатр ${cinema.name}`, {
    reply_markup: {
      inline_keyboard: [
        [
          {text: cinema.name, url: cinema.url},
          {
            text: 'Показать на карте', callback_data: JSON.stringify({
              type: ACTIONS_TYPE.SHOW_CINEMAS_MAP,
              lat: cinema.location.latitude,
              lon: cinema.location.longitude
            })
          }
        ],
        [{
          text: 'Показать фильмы', callback_data: JSON.stringify({
            type: ACTIONS_TYPE.SHOW_FILMS,
            filmUuids: cinema.films
          })
        }]
      ]
    }
  })
})

bot.onText(/\/f(.+)/, async (msg, [source, match]) => {
  const film = await Film.findOne({uuid: match});
  const user = await User.findOne({telegramId: msg.from.id});

  let isFavourite = false;

  if (user) {
    isFavourite = user.films.indexOf(film.uuid) !== -1;
  }

  const favoriteText = isFavourite ? 'Удалить из избранного' : 'Добавить в избранное'

  const caption = `Название: ${film.name}\nГод: ${film.year}\nРейтинг: ${film.rate}\nДлительность: ${film.length}\nСтрана: ${film.country}`

  bot.sendPhoto(getChatId(msg), film.picture, {
    caption,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: favoriteText, callback_data: JSON.stringify({
              type: ACTIONS_TYPE.TOGGLE_FAV_FILM,
              filmUuid: film.uuid,
              isFav: isFavourite
            })
          },
          {
            text: 'Показать Кинотеатры', callback_data: JSON.stringify({
              type: ACTIONS_TYPE.SHOW_CINEMAS,
              cinemasUuid: film.cinemas
            })
          }
        ],
        [{text: `Кинопоиск ${film.name}`, url: film.link}]
      ]
    }
  })
})

bot.on('callback_query', query => {
  const userId = query.from.id
  let data: ActionsInlineKeyboard;
  try {
    data = JSON.parse(query.data)
  } catch(err) {
     throw new Error('Data is not object')
  }

  const { type } = data

  switch (type) {
    case ACTIONS_TYPE.SHOW_CINEMAS_MAP:
      const { lat, lon} = data;
      bot.sendLocation(query.message.chat.id, lat, lon)
      break;
    case ACTIONS_TYPE.SHOW_CINEMAS:
      Utils.sendCinemasByQuery(userId, data);
      break;
    case ACTIONS_TYPE.TOGGLE_FAV_FILM:
      Utils.toggleFavouriteFilm(userId, query.id, data);
      break;
    case ACTIONS_TYPE.SHOW_FILMS:
      Utils.sendFilmsByQuery(userId, {uuid: {'$in': data.filmUuids}})
      break;
  }

})

bot.on('inline_query', async query => {
  const films = await Film.find({});

  const results: ReadonlyArray<TelegramBot.InlineQueryResult> = films.map(f => {
    const caption = `Название: ${f.name}\nГод: ${f.year}\nРейтинг: ${f.rate}\nДлительность: ${f.length}\nСтрана: ${f.country}`

    return {
      id: f.uuid,
      type: 'photo',
      photo_url: f.picture,
      thumb_url: f.picture,
      caption,
      reply_markup: {
        inline_keyboard: [
          [{text: `Кинопоиск: ${f.name}`, url: f.link}]
        ]
      }
    }
  })

  bot.answerInlineQuery(query.id, results, {
    cache_time: 0
  })
})

bot.onText(/\/start/, msg => {

  const text = `Здравствуйте ${msg.from.first_name}\nВыберите команду для начала работы: `

  bot.sendMessage(getChatId(msg), text, {
    reply_markup: {
      keyboard: keyboards.home
    }
  })
})
