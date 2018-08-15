const { bot } = require('./config');
const { handle } = require('./handler');
const AsyncLock = require('async-lock');
const app = require('./express');

const lock = new AsyncLock();
const handleAsync = (msg) => {
    lock.acquire('message', async () => await handle(msg)); //eslint-disable-line
};

const webHookMode = async (webHookUrl) => {
    await bot.deleteWebHook();
    await bot.setWebHook(webHookUrl);
    const port = Number(process.env.PORT);
    app.listen(port, () => {
        bot.on('message', handleAsync);
    });
};

(async () => {
    const webHookUrl = process.env.WEBHOOK_URL;
    if (!webHookUrl) {
        throw Error('Web hook url is empty');
    }

    await webHookMode(webHookUrl);
})();
