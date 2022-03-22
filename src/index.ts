import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import axios from "axios";

dotenv.config()
const TOKEN = process.env.TOKEN;
console.log('\x1b[42m%s\x1b[0m', 'Bot has been started ...')

export const bot = new TelegramBot(TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10,
    }
  },
});

