import { Telegraf } from "telegraf"
import { WEBHOOK_URL } from "./constants/index.js"
import {
  bot,
  onStart,
} from "./bot.js"
import { appendContentToPage } from "./notion.js"

try {
  bot.use(Telegraf.log())
  bot.telegram.setWebhook(WEBHOOK_URL).then((res) => console.log(res)).catch((err) => console.error(err))
} catch (error) {
  console.error(error)
  bot.stop()
}

bot.catch((err, ctx) => {
  ctx.reply("MESSAGES.ERROR")
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.start(onStart)
bot.help((ctx) => ctx.reply("MESSAGES.HELP"))

bot.on("callback_query", (ctx) => {
  switch (ctx.callbackQuery?.data) {
    default:
      return ctx.reply("👌")
  }
})

bot.hears(/.*/, (ctx) => {
  if (ctx.from.username !== "m0rtyn") {
    return ctx.reply("Чтож, ладно, друг мой славный, иди ты к чёрту.")
  }

  return appendContentToPage(ctx.message.text)
})

bot.launch()

process.once("SIGINT", () => bot.stop())
process.once("SIGTERM", () => bot.stop())
