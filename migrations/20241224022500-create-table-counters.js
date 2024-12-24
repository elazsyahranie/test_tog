'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('counters', {
        id: {
          allowNull: false,
          unsigned: true,
          primaryKey: true,
          type: Sequelize.STRING(120),
        },
        last_update: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        last_number: {
          type: Sequelize.BIGINT,
        },
        createdAt: {
          field: 'created_at',
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
      await queryInterface.dropTable('counters');
    } catch (error) {
      throw error;
    }
  },
};
