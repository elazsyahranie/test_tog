'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4,
          },
          first_name: {
            type: Sequelize.STRING,
          },
          last_name: {
            type: Sequelize.STRING,
          },
          full_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          role: {
            type: Sequelize.ENUM,
            defaultValue: 'user',
            values: ['user', 'admin'],
            // allowNull: false,
          },
          gender: {
            type: Sequelize.ENUM,
            values: ['male', 'female'],
            allowNull: false,
          },
          about: {
            type: Sequelize.TEXT,
          },
          country_phone: {
            type: Sequelize.STRING,
          },
          phone: {
            type: Sequelize.STRING,
          },
          full_phone: {
            type: Sequelize.STRING,
          },
          isVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
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
          deleted_at: {
            defaultValue: null,
            type: Sequelize.DATE,
          },
        },
        { transaction },
      );

      // await queryInterface.addConstraint('users', {
      //   type: 'unique',
      //   fields: ['email'],
      //   name: 'UNIQUE_USERS_EMAIL',
      //   transaction,
      // });

      // await queryInterface.addConstraint('users', {
      //   fields: ['role'],
      //   type: 'check',
      //   where: {
      //     gender: ['male', 'female'],
      //   },
      //   name: 'check_role_valid_values',
      //   defaultValue: 'user',
      //   transaction,
      // });

      // await queryInterface.addConstraint('users', {
      //   fields: ['gender'],
      //   type: 'check',
      //   where: {
      //     gender: ['male', 'female'],
      //   },
      //   name: 'check_gender_valid_values',
      //   transaction,
      // });

      await queryInterface.sequelize.query(
        `CREATE COLLATION IF NOT EXISTS numeric (provider = icu, locale = 'en-u-kn-true')`,
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface, _Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('users');

      await queryInterface.sequelize.query(
        `DROP TYPE IF EXISTS "enum_users_gender"`,
        { transaction },
      );

      await queryInterface.sequelize.query(
        `DROP TYPE IF EXISTS "enum_users_role"`,
        { transaction },
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
