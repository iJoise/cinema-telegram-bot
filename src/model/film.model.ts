import mongoose from 'mongoose';
import {FilmModel} from "../types";

const Schema = mongoose.Schema;

const FilmSchema = new Schema<FilmModel>({
  name: {type: String, required: true},
  type: {type: String, required: true},
  uuid: {type: String, required: true},
  year: {type: String},
  rate: {type: Number},
  length: {type: String},
  country: {type: String},
  link: {type: String},
  picture: {type: String},
  cinemas: {type: [String], default: []},
})

export const Film = mongoose.model('films', FilmSchema);
