## Development

1. > `./ngrok http https://localhost`
2. Copy Forwarding address
3. Paste to env variable NGROK_URL
4. Check that setted correct bot token
5. run TS compiler for ts files (via VSCode)
6. run `yarn dev`

## Tech stack

- Telegram bot API by Telegraf (Node.js);
- Google APIs (Sheets)

## TODOs

- [x] Стартовое меню с кнопками главных действий
- [x] Замена прослушивания по тексту, на прослушивание по командам. Сейчас из-за этого брешь в сценариях.
- [x] Указание названия главы вместо номера колонки с главой
- [ ] Отображения статистики участника из таблицы
- [ ] Публикация изображения таблицы в чате марафона
