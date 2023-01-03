'use strict';

const {faker} = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

function createRandomUser() {
    let pass = bcrypt.hashSync('qwerty', 10)
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: pass,
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
    };
}

const USERS = []

Array.from({ length: 10 }).forEach(() => {
    USERS.push(createRandomUser());
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', USERS, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
