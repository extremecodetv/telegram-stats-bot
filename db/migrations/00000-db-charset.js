'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let Promise = queryInterface.sequelize.Promise;

    Promise.coroutine(function *() {
        yield Promise.all([
            queryInterface.sequelize.query(
                `ALTER DATABASE ${queryInterface.sequelize.config.database}
                CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
            )
        ]);
    })();

    return true;
  },

  down: (queryInterface, Sequelize) => {
    return true;
  }
};

            