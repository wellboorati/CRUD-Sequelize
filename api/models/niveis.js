'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Niveis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    //Uma turma podem ter vários nível, por isso a relação de um para muitos. E nesse caso, nível não tem nenhum chave estrangeira. 
    static associate(models) {
      Niveis.hasMany(models.Turmas, {
        foreignKey: 'nivel_id'
      })

    }
  }
  Niveis.init({
    descr_nivel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Niveis',
  });
  return Niveis;
};