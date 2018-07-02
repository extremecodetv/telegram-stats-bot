require('dotenv').config();

module.exports = {
    db: require('./db').development,
    bot: require('./bot')
};
