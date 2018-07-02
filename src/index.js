const { bot } = require('./config');
const { handle } = require('./handler');
const AsyncLock = require('async-lock');
const app = require('./express');

// NodeJS: 0
// Artem Vitalyevich: 1
const lock = new AsyncLock();
const handleAsync = (msg) => {
    lock.acquire('message', async () => await handle(msg)); //eslint-disable-line
};

const webHookMode = async () => {
    await bot.deleteWebHook();
    await bot.setWebHook('https://db2e6b78.ngrok.io/bot');
    app.listen(3001, () => {
        bot.on('message', handleAsync);
    });
};

const longPollingMode = async () => {
    bot.on('message', handleAsync);
};

(async () => {
    await longPollingMode();
})();
