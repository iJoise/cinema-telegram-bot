import mongoose from 'mongoose';
import {UserModel} from "../types";

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserModel>({
  telegramId: {type: Number, required: true},
  films: {type: [String], default: []},
})

export const User = mongoose.model('user', UserSchema);
