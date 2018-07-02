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

const webHookMode = async (webHookUrl) => {
    await bot.deleteWebHook();
    await bot.setWebHook(webHookUrl);
    const port = Number(process.env.EXPRESS_APP_PORT);
    app.listen(port, () => {
        bot.on('message', handleAsync);
    });
};

const longPollingMode = async () => {
    bot.on('message', handleAsync);
};

(async () => {
    const longPolling = process.env.LONG_POLLING.indexOf('true') !== -1;

    if (longPolling) {
        await longPollingMode();
    } else {
        const webHookUrl = process.env.WEBHOOK_URL;
        if (!webHookUrl) {
            throw Error('Web hook url is empty');
        }

        await webHookMode(webHookUrl);
    }
})();
