import { Telegraf } from "telegraf"
import { WEBHOOK_URL, Answers } from "./constants/index.js"
import {
  bot,
  onStart,
} from "./bot.js"
import { appendContentToPage, validateToken, authorizeNotion } from "./notion.js"
import { initDB, stopDB, writeNewTokenToDB, isUsernameExists, getTokenByUsername } from "./db.js"

try {
  bot.use(Telegraf.log())
  bot.telegram.setWebhook(WEBHOOK_URL).then((res) => console.log(res)).catch((err) => console.error(err))
  initDB()
} catch (error) {
  console.error(error)
  bot.stop()
}

bot.catch((err, ctx) => {
  ctx.reply("MESSAGES.ERROR")
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.start(onStart)
bot.help((ctx) => ctx.reply(
`I can forward messages to your Notion inbox, but only if you took my code and set it up yourself 🤷
You can ask questions at @m0rtyn
My code is on GitHub: https://github.com/m0rtyn/telegram-bot-quick-add-to-notion`
))

bot.hears(Answers.ADD_TOKEN, async (ctx) => {
  ctx.reply("Please reply me with token of your Notion integration")
})

bot.hears(/.*/, async (ctx) => {
  if (ctx.message?.reply_to_message?.text === "Please reply me with token of your Notion integration") {
    const username = ctx.message?.from.username
    if (!username) throw new Error("No username found")
  
    const token = ctx.message?.text
    const isTokenValid = await validateToken(token)
    if (!token) throw new Error("No token found")
    if (isTokenValid) return ctx.reply("Token is not valid")
  
    writeNewTokenToDB(username, token)
    return ctx.reply("Token saved")
  }

  if (!ctx.message?.text) {
    return ctx.reply("Currently I can only forward text messages to your Notion inbox.")
  }

  if (!isUsernameExists(ctx.message?.from.username)) {
    return ctx.reply("You need to add token first")
  }

  const token = await getTokenByUsername(ctx.message?.from.username)
  await authorizeNotion(token)
  return appendContentToPage(ctx.message.text)
})

bot.launch()

process.once("SIGINT", () => { 
  stopDB()
  bot.stop()
})
process.once("SIGTERM", () => { 
  stopDB()
  bot.stop()
})
