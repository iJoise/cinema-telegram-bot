import {Film} from "../model/film.model";
import {bot} from "../index";
import {keyboards} from "../keyboards";
import {SendMessageOptions} from "node-telegram-bot-api";
import {Cinema} from "../model/cinema.model";
import {ActionsInlineKeyboard, CinemaWithDistance, KeyboardsType, LocationType} from "../types";
import {getDistance} from "geolib";
import _ from 'lodash';
import {User} from "../model/user.model.js";
import {Helpers} from "../helpers";
import {bgRed} from "ansi-colors";

export class Utils {
  static sendHTML(chatID: number, html: string, kbName: KeyboardsType = null) {
    try {
      const options: SendMessageOptions = {
        parse_mode: 'HTML'
      }

      if (kbName) {
        options.reply_markup = {
          keyboard: keyboards[kbName]
        }
      }

      bot.sendMessage(chatID, html, options);
    } catch (err) {
      Helpers.logger(err, bgRed);
    }
  }

  static async sendFilmsByQuery(chatId: number, query) {
    const films = await Film.find(query)
    const html = films
      .map((f, i) => `<b>${i + 1}</b> ${f.name} - /f${f.uuid}`)
      .join('\n');

    this.sendHTML(chatId, html, 'film')
  }

  static async getCinemasInCoors(chatId: number, location: LocationType) {
    const allCinemas = await Cinema.find({});

    const cinemas: CinemaWithDistance[] = []

    allCinemas.forEach(c => {
      const distance = getDistance(location, c.location) / 1000;
      console.log(distance)
      cinemas.push({
        name: c.name,
        uuid: c.uuid,
        url: c.url,
        films: c.films,
        location: c.location,
        distance
      })
    })

    const html = _.sortBy(cinemas, 'distance')
      .map((c, i) =>
        `<b>${i + 1}</b> <u>${c.name}</u>. <em>Расстояние</em> - <strong>${c.distance}</strong> км. /c${c.uuid}`)
      .join('\n');

    this.sendHTML(chatId, html, 'home');

  }

  static async toggleFavouriteFilm(userId: number, queryId: string, data: ActionsInlineKeyboard) {

    let userPromise;

    try {
      const {filmUuid, isFav} = data;
      const user = await User.findOne({telegramId: userId});
      if (user) {
        if (isFav) {
          user.films = user.films.filter(fUuid => fUuid !== filmUuid);
        } else {
          user.films.push(filmUuid);
        }
        userPromise = user
      } else {
        userPromise = new User({
          telegramId: userId,
          films: [filmUuid]
        })
      }

      const answerText = isFav ? 'Удалено' : 'Добавлено'

      userPromise.save().then(() => {
        bot.answerCallbackQuery(queryId, {
          callback_query_id: queryId,
          text: answerText
        }).catch(err => Helpers.logger(err, bgRed))
      })
    } catch (err) {
      Helpers.logger(err, bgRed);
    }
  }

  static async showFavouriteFilms(chatId: number, telegramId: number) {
    try {
      const user = await User.findOne({telegramId});

      if (user) {
        const film = await Film.find({uuid: {'$in': user.films}});
        let html;

        if (film.length) {
          html = film
            .map((f, i) => `<b>${i + 1}</b> ${f.name} - <b>${f.rate}</b> (/f${f.uuid})`)
            .join('\n');
        } else {
          html = 'Вы пока ничего не добавили'
        }
        this.sendHTML(chatId, html, 'home');
      } else {
        this.sendHTML(chatId, 'Вы пока ничего не добавили', 'home');
      }
    } catch (err) {
      Helpers.logger(err, bgRed);
    }
  }

  static async sendCinemasByQuery(userId: number, data: ActionsInlineKeyboard) {
    const cinemaUuid = {uuid: {'$in': data.cinemasUuid}};

    const cinemas = await Cinema.find(cinemaUuid);
    const html = cinemas
      .map((c, i) => `<b>${i + 1}</b> ${c.name} - /c${c.uuid}`)
      .join('\n');

    this.sendHTML(userId, html, 'home');
  }
}
