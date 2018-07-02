'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let Promise = queryInterface.sequelize.Promise;

    Promise.coroutine(function *() {
        yield Promise.all([
          queryInterface.addColumn(
            'chats',
            'username',
            {
              type: Sequelize.STRING
            }
          ),
          queryInterface.addColumn(
            'chats',
            'photo_id',
            {
              type: Sequelize.STRING
            }
          ),
          queryInterface.addColumn(
            'chats',
            'description',
            {
              type: Sequelize.STRING
            }
          ),
          queryInterface.addColumn(
            'chats',
            'count',
            {
              type: Sequelize.INTEGER
            }
          )
        ]);
    })();

    return true;
  },

  down: (queryInterface, Sequelize) => {
    let Promise = queryInterface.sequelize.Promise;

    Promise.coroutine(function *() {
        yield Promise.all([
          queryInterface.removeColumn('chats', 'username'),
          queryInterface.removeColumn('chats', 'photo_id'),
          queryInterface.removeColumn('chats', 'description'),
          queryInterface.removeColumn('chats', 'count')
        ]);
    })();

    return true;
  }
};
