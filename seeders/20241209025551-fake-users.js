'use strict';

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const slugify = require('slugify');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    try {
      const countryCodes = [
        '+1', // United States, Canada
        '+44', // United Kingdom
        '+62', // Indonesia
        '+91', // India
        '+81', // Japan
        '+49', // Germany
        '+33', // France
        '+39', // Italy
        '+34', // Spain
        '+55', // Brazil
        '+86', // China
        '+61', // Australia
        '+27', // South Africa
        '+7', // Russia
        '+20', // Egypt
        '+60', // Malaysia
        '+52', // Mexico
        '+41', // Switzerland
        '+31', // Netherlands
        '+47', // Norway
        '+48', // Poland
        '+81', // Japan
        '+82', // South Korea
        '+98', // Iran
        '+966', // Saudi Arabia
        '+92', // Pakistan
        '+91', // India
        '+90', // Turkey
        '+53', // Cuba
        '+46', // Sweden
        '+32', // Belgium
        '+420', // Czech Republic
        '+43', // Austria
        '+351', // Portugal
        '+34', // Spain
        '+966', // Saudi Arabia
        '+971', // United Arab Emirates
      ];

      const generateFakeUsers = async (num) => {
        const users = [];
        const password = await bcrypt.hash('12345678', 10);
        for (let i = 0; i < num; i++) {
          const first_name = `${faker.person.firstName()}`;
          const last_name = `${faker.person.middleName()} ${faker.person.lastName()}`;
          const full_name = `${first_name} ${last_name}`;

          const email = `${full_name
            .replace(/\s+/g, '_')
            .toLowerCase()}${uuidv4()
            .replace(/[-]/g, '')
            .slice(0, 3)}@yopmail.com`;

          const country_phone = faker.helpers.arrayElement(countryCodes);
          const phone = faker.phone.number().replace(/[^\d]/g, '');
          const full_phone = `${country_phone}${phone}`;

          const slugifyIt = slugify(full_name, {
            replacement: '-',
            remove: undefined,
            lower: true,
            trim: true,
          });
          const slugifiedName = `${slugifyIt}-${uuidv4().slice(0, 6)}`;

          users.push({
            id: uuidv4(),
            first_name,
            last_name,
            full_name,
            gender: faker.helpers.arrayElement(['male', 'female']),
            email,
            username: slugifiedName,
            country_phone,
            phone,
            full_phone,
            password,
            role: 'user',
            about: faker.lorem.paragraph(),
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          });
        }

        return users;
      };

      // Generate and insert 50 fake companies
      const fakeUsers = await generateFakeUsers(10000);

      return queryInterface.bulkInsert('users', fakeUsers);
    } catch (error) {
      throw error;
    }
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
