'use strict';

const fs = require('fs')
let rowData = fs.readFileSync(__dirname + "/colorGroups.json")
let colorGroupsData = JSON.parse(rowData)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
    colorGroupsData = colorGroupsData.colorGroups.map((group) => ({
      name: group.groupName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }))

    await queryInterface.bulkInsert('Groups', colorGroupsData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Groups', null, {});
  }
};
