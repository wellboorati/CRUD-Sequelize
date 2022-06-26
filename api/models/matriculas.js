'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matriculas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //Matriculas podem tem vários estudantes cadastrados, mas somente 1 matrícula por estudante, por isso o belongs.
    static associate(models) {
      Matriculas.belongsTo(models.Pessoas, {
        foreignKey: 'estudante_id'
      })
      Matriculas.belongsTo(models.Turmas, {
        foreignKey: 'turma_id'
      })
    }
  }
  Matriculas.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Matriculas',
  });
  return Matriculas;
};
