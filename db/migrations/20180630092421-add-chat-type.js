'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let Promise = queryInterface.sequelize.Promise;

    Promise.coroutine(function *() {
        yield Promise.all([
          queryInterface.addColumn(
            'chats',
            'type',
            {
              type: Sequelize.STRING,
              allowNull: false
            }
          )
        ]);
    })();

    return true;
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('chats', 'type');
  }
};
