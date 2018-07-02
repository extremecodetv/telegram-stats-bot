'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let Promise = queryInterface.sequelize.Promise;

    Promise.coroutine(function *() {
        yield Promise.all([
          queryInterface.addColumn(
            'chat_users',
            'joined',
            {
              type: Sequelize.DATEONLY
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
          queryInterface.removeColumn('chat_users', 'joined'),
        ]);
    })();

    return true;
  }
};
