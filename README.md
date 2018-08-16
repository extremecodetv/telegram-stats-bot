# telegram-stats-bot
[![Dependencies](https://david-dm.org/TelegramTech/telegram-stats-bot.svg)](https://david-dm.org/TelegramTech/telegram-stats-bot.svg)
[![Code Style](https://camo.githubusercontent.com/9829cb01a7f7b1bc7ad5e52f5c5451cd97983189/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d416972626e622d6666356135662e737667)](https://camo.githubusercontent.com/9829cb01a7f7b1bc7ad5e52f5c5451cd97983189/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d416972626e622d6666356135662e737667)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/TelegramTech/telegram-stats-bot/blob/master/LICENSE)

Telegram бот для сбора статистики активности пользователей в чатах

## Deploy

Есть два стула

### Без Docker

Настроить переменные окружения, и подготовить пользователя MySQL заранее

```bash
npm i
npm i -g sequelize
sequelize db:create
sequelize db:migrate
npm run start
```

### Docker

Настроить переменные окружения в .env файле

```bash
docker-compose up --build --detach
```

## Лицензия

**The MIT License (MIT)**

Copyright © 2018 ExtremeCode GANG

```Artem Dontsov (@artemdontsov)```

```Ne Chelovek (@TochnoNeChelovek)```
