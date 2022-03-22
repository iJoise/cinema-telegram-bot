import {bot} from "../index";

// карточка товара + тестовый платёжный токен
const paymentTestToken = '381764678:TEST:34951';

bot.onText(/\/pay/, msg => {
  const chatId = msg.chat.id;

  bot.sendInvoice(
    chatId,
    'subaru b4',
    'Best car all the world',
    'payload',
    paymentTestToken,
    'SOME_RANDOM_STRING',
    'RUB',
    [
      {
        label: 'Subaru B4',
        amount: 3000000
      }
    ],
    {
      photo_url: 'https://i.pinimg.com/originals/b9/a1/52/b9a1521feec8c5521554578296d604f1.jpg',
      need_name: true,
      photo_width: 200,
      photo_height: 150,
      is_flexible: true,
    }
  )
})
