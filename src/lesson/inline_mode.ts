// инлайн режим
//
import {bot} from "../index";
import {gifs} from "../data";

export function inlineMode() {
  bot.on('inline_query', query => {
    const result = [];

    for (let i = 0; i < gifs.length; i++) {
      console.log(gifs[i])
      result.push({
        type: 'video',
        video_file_id: gifs[i],
        id: i.toString(),
        title: `Title ${i + 1}`,
      })
    }

    bot.answerInlineQuery(query.id, result, {
      cache_time: 0
    })
  })
}
