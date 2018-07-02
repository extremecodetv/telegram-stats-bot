'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let Promise = queryInterface.sequelize.Promise;

    Promise.coroutine(function *() {
        yield Promise.all([
          queryInterface.addColumn(
            'activities',
            'commands',
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
          queryInterface.removeColumn('activities', 'commands'),
        ]);
    })();

    return true;
  }
};
