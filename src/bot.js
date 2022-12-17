import axios from "axios"
import { Telegraf } from "telegraf"
import {
  WEBHOOK_URL,
  BOT_TOKEN
} from "./constants/index.js"

export const dialogState= {}

if (!BOT_TOKEN || !WEBHOOK_URL) throw new Error("No token or webhook url")

export const bot = new Telegraf(BOT_TOKEN)

export async function onStart(ctx) {
  const username = ctx.message?.from.username
  if (!username) throw new Error("No username found")

    // const keyboard = Markup.keyboard([
    //   Markup.button.callback(Answers.ADD_CHAPTER, "add_chapter"),
    //   Markup.button.callback(Answers.HANDBOOK, 'handbook'),
    //   Markup.button.callback(Answers.TABLE, 'table'),
    // ]).resize()
    
    return await ctx.reply(
      `Hello, ${username}`,
      // keyboard
    )
}

export async function setWebhook() {
  await axios(WEBHOOK_URL)
}

export async function test(ctx) {
  // console.log(ctx.message)
  console.log("🚀 ~ test ~ TEST", ctx)
}