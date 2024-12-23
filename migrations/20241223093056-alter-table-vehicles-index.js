'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE INDEX idx_vehicles ON vehicles (type_vehicle, code_vehicle, vehicle_number)`,
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.sequelize.query(`DROP INDEX idx_vehicles`);
  },
};
