'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Colors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // @todo:: need to add GroupId instead group_id
      // Colors.belongsTo(models.Groups)
    }
  }
  Colors.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    group_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Colors',
  });
  return Colors;
};