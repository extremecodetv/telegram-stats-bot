'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
    let Promise = queryInterface.sequelize.Promise;

    return Promise.coroutine(function *(){
        yield Promise.all([
            queryInterface.createTable(
                'profiles',
                {
                  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
                  telegram_id: { type: Sequelize.INTEGER, unique: true },
                  first_name: Sequelize.STRING,
                  last_name: Sequelize.STRING,
                  username: { type: Sequelize.STRING, unique: true },
                  created_at: Sequelize.DATE,
                  updated_at: Sequelize.DATE
                }
            ),
            queryInterface.createTable(
                'chats',
                {
                    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
                    alias: { type: Sequelize.UUID, unique: true },
                    title: Sequelize.STRING,
                    telegram_id: { type: Sequelize.BIGINT, unique: true }
                }
            )
        ]);

        yield Promise.all([
            queryInterface.createTable(
                'chat_users',
                {
                    id: { 
                        type: Sequelize.INTEGER, 
                        primaryKey: true, 
                        autoIncrement: true 
                    },
                    profile_id: {
                        type: Sequelize.INTEGER,
                        references: {
                            model: "profiles",
                            key: "id"
                        }
                    },
                    chat_id: {
                        type: Sequelize.INTEGER, 
                        references: {
                            model: "chats",
                            key: "id"
                        }
                    },
                    is_admin: Sequelize.BOOLEAN
                }
            )
        ]);

        yield Promise.all([
            queryInterface.createTable(
                'activities',
                {
                    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
                    profile_id: {
                        type: Sequelize.INTEGER,
                        references: {
                            model: "profiles",
                            key: "id"
                        }
                    },
                    chat_user_id: {
                        type: Sequelize.INTEGER,     
                        references: {
                            model: "chat_users",
                            key: "id"
                        }
                    },
                    messages: Sequelize.INTEGER,
                    audios: Sequelize.INTEGER,
                    voices: Sequelize.INTEGER,
                    files: Sequelize.INTEGER,
                    links: Sequelize.INTEGER,
                    images: Sequelize.INTEGER,
                    stickers: Sequelize.INTEGER
                }
            )
        ]);

        return true;
    })();
  },

  down: (queryInterface, Sequelize) => {    
    let Promise = queryInterface.sequelize.Promise;

    return Promise.coroutine(function *(){
        yield Promise.all([
            queryInterface.dropTable('activities'),
            queryInterface.dropTable('chat_users')
        ]);

        yield Promise.all([
            queryInterface.dropTable('profiles'),
            queryInterface.dropTable('chats')
        ]);

        return true;
    })();
  }
};
