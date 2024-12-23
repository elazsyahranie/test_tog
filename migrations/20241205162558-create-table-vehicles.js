'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('vehicles', {
        id: {
          allowNull: false,
          unsigned: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
        },
        type_vehicle: {
          type: Sequelize.ENUM,
          values: ['car', 'truck', 'bus', 'van', 'motorcycle'],
          allowNull: false,
        },
        code_vehicle: {
          type: Sequelize.STRING(22),
        },
        vehicle_number: {
          type: Sequelize.STRING(10),
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  async down(queryInterface, _Sequelize) {
    try {
      await queryInterface.dropTable('vehicles');
    } catch (error) {
      throw error;
    }
  },
};
