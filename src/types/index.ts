import {keyboards} from "../keyboards";
import {KeyboardButton} from "node-telegram-bot-api";
import {ACTIONS_TYPE} from "../enum";

export type KeyboardsType = keyof typeof keyboards;

export interface Keyboards {
  home: KeyboardButton[][];
  film: KeyboardButton[][];
  cinemas: KeyboardButton[][];
}

export type LocationType = {
  latitude: number;
  longitude: number;
}

export interface CinemaModel {
  uuid: string;
  name: string;
  location: LocationType;
  url: string;
  films: string[];
}

export type CinemaWithDistance = CinemaModel & {
  distance: number
}

export interface FilmModel {
  name: string;
  type: string;
  uuid: string;
  year: string;
  rate: number;
  length: string;
  country: string;
  link: string;
  picture: string;
  cinemas: string[];
}

export interface UserModel {
  telegramId: number;
  films: string[];
}

export type ActionsInlineKeyboard = {
  type: ACTIONS_TYPE;
  filmUuid?: string;
  cinemasUuid?: string;
  lat?: number;
  lon?: number;
  isFav?: boolean;
  filmUuids: string[];
}
