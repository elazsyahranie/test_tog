'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('location_histories', {
        id: {
          allowNull: false,
          unsigned: true,
          primaryKey: true,
          type: Sequelize.STRING(120),
        },
        vehicle_id: {
          allowNull: false,
          unsigned: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'vehicles',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        location: {
          type: Sequelize.GEOMETRY('POINT'),
        },
        speed: {
          type: Sequelize.FLOAT(10, 6),
          defaultValue: 0,
        },
        direction: {
          type: Sequelize.FLOAT(10, 6),
          allowNull: false,
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
      await queryInterface.dropTable('location_histories');
    } catch (error) {
      throw error;
    }
  },
};
