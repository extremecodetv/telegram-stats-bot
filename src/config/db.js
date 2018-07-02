require('dotenv').config();

module.exports = {
    development: {
        url: process.env.DB_URI,
        dialect: 'mysql',
        define: {
            charset: 'utf8mb4',
            dialectOptions: {
                collate: 'utf8mb4_general_ci'
            }
        }
    }
};
