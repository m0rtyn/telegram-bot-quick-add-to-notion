import { TELEGRAM_BOT_URL } from "./bot.js"

export const WEB_APP_URL = process.env.NGROK_URL // process.env.BOT_URL
// export const WEB_APP_URL =
//   process.env.NODE_ENV === "development" ? NGROK_URL : BOT_URL

export const WEBHOOK_URL = TELEGRAM_BOT_URL + "/setWebhook?url=" + WEB_APP_URL
