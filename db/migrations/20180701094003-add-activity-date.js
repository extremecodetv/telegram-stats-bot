'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let Promise = queryInterface.sequelize.Promise;

    Promise.coroutine(function *() {
        yield Promise.all([
          queryInterface.addColumn(
            'activities',
            'date',
            {
              type: Sequelize.DATEONLY,
              allowNull: false
            }
          )
        ]);
    })();

    return true;
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('activities', 'date');
  }
};
