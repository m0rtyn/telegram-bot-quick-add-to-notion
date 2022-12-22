import axios from "axios"
import { Telegraf, Markup } from "telegraf"
import {
  WEBHOOK_URL,
  BOT_TOKEN,
  Answers,
} from "./constants/index.js"
import { isUsernameExists } from "./db.js"

export const dialogState= {}

if (!BOT_TOKEN || !WEBHOOK_URL) throw new Error("No token or webhook url")

export const bot = new Telegraf(BOT_TOKEN)

export async function onStart(ctx) {
  const username = ctx.message?.from.username
  if (!username) throw new Error("No username found")

  if (isUsernameExists(username)) {
    return await ctx.reply(`Hi, ${username}. You already connect a Notion database.`)
  }

  const keyboard = Markup.keyboard([
    Markup.button.callback(Answers.ADD_TOKEN, "add_token"),
  ]).resize()
  
  return await ctx.reply(
    `Hello, ${username}`,
    keyboard
  )
}

export async function setWebhook() {
  await axios(WEBHOOK_URL)
}

export async function test(ctx) {
  // console.log(ctx.message)
  console.log("🚀 ~ test ~ TEST", ctx)
}