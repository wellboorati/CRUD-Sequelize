'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Turmas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data_inicio: {
        type: Sequelize.DATEONLY
      },
      //Precisamos referenciar que o docente_id está vindo do model Pessoas através da chave id, se chamando inclusive docente_id. Não pode ser nulo e é um integer. A mesma coisa acontece em relação a nível que é referenciado através do ID vindo da tabela nível. Lembrando que essa referenciação não é feita automaticamente quando rodamos o npx sequelize-cli
      docente_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Pessoas', key: 'id'}
      },
       nivel_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Niveis', key: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Turmas');
  }
};
