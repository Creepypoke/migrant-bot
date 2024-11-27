import {
  Bot,
  InlineQueryResultBuilder,
} from 'https://deno.land/x/grammy@v1.32.0/mod.ts'
import { randomIntegerBetween } from 'jsr:@std/random'
import * as uuid from 'jsr:@std/uuid'

const ACCESS_TOKEN = Deno.env.get('BOT_ACCESS_TOKEN')
if (!ACCESS_TOKEN) {
  throw new Error('BOT_ACCESS_TOKEN environment variable is missing')
}

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(ACCESS_TOKEN) // <-- put your bot token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
bot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'))
bot.on('inline_query', async (ctx) => {
  return await ctx.answerInlineQuery(
    getResult(),
    {
      cache_time: 300,
    },
  )
})

function getResult() {
  console.log(uuid.v1.generate())
  return [
    InlineQueryResultBuilder.article(
      uuid.v1.generate(),
      'Шанс депортации',
      { description: 'Узнать свой шанс депортации' },
    ).text(
      `Шанс моей депортации: <b>${randomIntegerBetween(1, 100)}%</b>`,
      {
        parse_mode: 'HTML',
      },
    ),
  ]
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  // Start the bot.
  bot.start()
  console.log('Bot has been started.')
}
