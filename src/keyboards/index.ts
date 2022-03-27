import {Keyboards} from "../types";

export const kb = {
  home: {
    films: 'Сейчас в кино',
    favourite: 'Избранное',
    cinemas: 'Кинотеатры',
  },
  film: {
    random: 'Случайный жанр',
    action: 'Боевики',
    comedy: 'Комедии'
  },
  cinemas: 'Отправить местоположение',
  back: 'Назад',
}

export const keyboards: Keyboards = {
  home: [
    [{text: kb.home.films}, {text: kb.home.cinemas}],
    [{text: kb.home.favourite}],
  ],
  film: [
    [{text: kb.film.random}],
    [{text: kb.film.action}, {text: kb.film.comedy}],
    [{text: kb.back}]
  ],
  cinemas: [
    [{text: kb.cinemas, request_location: true}],
    [{text: kb.back}],
  ]
}

