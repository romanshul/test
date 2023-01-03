'use strict';

const { User } = require('../models');
const jwt = require("jsonwebtoken");
require('dotenv').config()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await User.findAll()
    for (const u of users) {
      try {
        const email = u.email
        const id = u.id
        const token = jwt.sign(
            {user_id: id, email},
            process.env.JWT_SECRET,
            {
              expiresIn: "22h",
            }
        );

        let u_ = await User.findOne({where: {id: u.id}})
        u_.token = token
        u_.save()
      } catch (e) {
        console.log(e)
      }
    }
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
