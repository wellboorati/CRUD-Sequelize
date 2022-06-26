//Criando o modelo para pessoas, que conversa diretamente com o banco de dados. Esse arquivo não cria as tabelas, ele consulta as informações.
//Para criar tabela e migração utilizamos o comando abaixo, onde o name é sempre com letra maiúscula, depois vem o atributo e com o que esse atributo é. Lembrando que não precisamos colocar o ID, ele é gerado automaticamente.
//Exemplo usado para criar o model niveis.
//npx sequelize-cli model:create --name Niveis --attributes descr_nivel:string

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('Pessoas', {
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});

  //Para associarmos as tabelas, precisamos utilizar os métodos HasOne, BelongsTo, HasMany e BelongsToMany. o método funciona assim: A.hasMany(B); e A.belongsTo e passar o foreignKey como um objeto para identificar a chave estrangeira associada.
  //Professores podem ter muitas turmas para dar aula, por isso a relação um para muitos.
  Pessoas.associate = function(models) {
    Pessoas.hasMany(models.Turmas, {
      foreignKey: 'docente_id'
    })
    //Matrículas podem ter várias pessoas (estudantes) cadastrados. Por isso um para muitos.
    Pessoas.hasMany(models.Matriculas, {
      foreignKey: 'estudante_id'
    })
  };
  return Pessoas;
};
