const { join } = require('path');
const { config } = require('dotenv');

config({ path: join(__dirname, './../../.env') });
const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST
} = process.env;

const url = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:3306/${DB_NAME}`;

module.exports = {
    development: {
        url,
        dialect: 'mysql'
    }
};
