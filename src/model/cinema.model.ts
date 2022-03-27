import mongoose from 'mongoose';
import {CinemaModel} from "../types";

const Schema = mongoose.Schema;

const CinemaSchema = new Schema<CinemaModel>({
  uuid: {type: String, required: true},
  name: {type: String, required: true},
  url: {type: String, required: true},
  location: {type: Schema.Types.Mixed},
  films: {type: [String], default: []},
})

export const Cinema = mongoose.model('cinema', CinemaSchema);
