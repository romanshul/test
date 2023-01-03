'use strict';

const { Groups } = require('../models');

const fs = require('fs')
const {debuglog} = require("util");
let rowData = fs.readFileSync(__dirname + "/colorGroups.json")
let colorsData = JSON.parse(rowData)

    /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dataToSeed = []
    for(let i = 0; i < colorsData.colorGroups.length; i++) {
      let color = colorsData.colorGroups[i]
      let group = await Groups.findOne({where: {name: color.groupName}})
      if (group) {
        for (let k = 0; k < color.colors.length; k++) {
          let colorGroup = color.colors[k]
          dataToSeed.push({
            'name': colorGroup.name,
            'code': colorGroup.color,
            'group_id': group.id,
            'createdAt': new Date().toISOString(),
            'updatedAt': new Date().toISOString()
          })
        }
      }
    }

    await queryInterface.bulkInsert('Colors', dataToSeed, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     */
    await queryInterface.bulkDelete('Colors', null, {});
  }
};
