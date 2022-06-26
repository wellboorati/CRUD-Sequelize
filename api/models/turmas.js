'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turmas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //Uma turma pode ter várias matrículas, por isso a relação um para muitos.
    static associate(models) {
      Turmas.hasMany(models.Matriculas, {
        foreignKey: 'turma_id'
      })
      //Turma tem 2 chaves estrangeiras, pois recebe muitas pessoas e turmas podem ter vários níveis.
      Turmas.belongsTo(models.Pessoas, {
        foreignKey: 'docente_id'
      })
      Turmas.belongsTo(models.Niveis, {
        foreignKey: 'nivel_id'
      })

    }
  }
  Turmas.init({
    data_inicio: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Turmas',
  });
  return Turmas;
};
