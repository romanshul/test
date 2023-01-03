'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Groups extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Groups.hasMany(models.Colors, {foreignKey: 'group_id'})
        }
    }
    Groups.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Groups',
    });
    return Groups;
};
