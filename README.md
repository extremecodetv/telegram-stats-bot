# telegram-stats-bot

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
