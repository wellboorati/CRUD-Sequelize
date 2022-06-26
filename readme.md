Esse projeto foi feito enquanto estava estudando sobre Sequelize, portanto, o readme abaixo é um rascunho sobre o processo do que precisa ser feito. 

PASSO A PASSO FEITO PARA ESTUDOS ABAIXO: 

PASSO A PASSO SEQUELIZE:

1º Criar tabela no diagrama para ter uma base do que precisa ser feito

2º Criar os modelos (models) através do npx sequelize-cli, lembrando que nesse caso não da espaço após a virgula. O sequelize vai gerar o model e também o migration.
npx sequelize-cli model:create --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string
npx sequelize-cli model:create --name (nome da tabela) --attributes (nome do atributo:valor do atributo)
*migração = As migrações são formas de mudar as tabelas de maneira rastreável.

3º Rodando as migrações
comando para fazer alterações no banco utilizando as migrações:
npx sequelize-cli db:migrate

4º Popular o banco através do seeders:
Pode popular a tabela no próprio SQL ou podemos fazer atraves do seeders e comando npx sequelize-cli

no SQL: insert into Pessoas( nome, ativo, email, role, createdAt, updatedAt) values ("Carla", 1, "carla@gmail.com, "estudante", NOW(), NOW())

no terminal usando npx:
npx sequelize-cli seed:generate --name demo-pessoa
npx sequelize-cli seed:generate --name (nome da tabela que será populada)
Dessa forma, o sequelize cria o arquivo com o nome dado na pasta seeders. Depois disso, vem a parte manual de populá-la no VSCode.

5º Enviando as tabelas do seeders para o banco de dados:
Após colocar manualmente os nomes no VSCode no seeder criado, precisamos enviar isso para o banco usando o terminal com o comando:

npx sequelize-cli db:seed:all

6º Criar as rotas que conversam com os modelos que já foram criados, visto também que já temos os arquivos no banco de dados.

7º Criar as regras do CRUD no controller.
Create, Read, Update and Delete.

8º Fazendo as associações e relações entre tabelas:

8.1 Criar as tabelas faseadas. Começar pela mais simples onde ela não tem nenhuma chave estrangeira.
Aqui, utilizamos o mesmo comando para criação de tabela no passo 2. Onde o comando npx do sequelize-cli faz a criação do modelo e da migração.

8.2 A criação do modelo nós só colocamos os atributos naturais (exceto chave estrangeira), essa correlação será feita posteriormente.

9º Fazendo as associações:
As associações são feitas utilizando os métodos. Basicamente utilizamos o hasOne e o hasMany para a tabela que envia informações e o BelongsTo e BelongsToMany para o que recebe as informações. Devemos também passar qual é a foreingKey e o seu nome.

A HasOne(B)
A BelongsTo(B)
A HasMany(B)
A BelongsToMany(B)
ex:
Pessoas.hasMany(models.Matriulas), {
  foreignKey: 'turma_id'
}
Matriculas.belongsTo(models.Pessoas)

10º Referenciando tabelas: Adicionando colunas que se relacionam entre tabelas dentro do arquivo de migrações (que não foram criadas anteriormente e precisam ser criadas na mão) e precisa inclusive associar ao model.

docente_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Pessoas', key: 'id'}
      },
Após a crição das foreinKey, podemos então rodar o código para as migrações serem feitas no banco:
npx sequelize-cli db:migrate

Após rodar esse comando acima, as tabelas são feitas de maneira correta  no banco de dados.

APÓS RODAR OS COMANDOS ACIMA, REPETE O PASSO DE POPULAR TABELAS E TAMBÉM PARA FAZER AS MIGRAÇÕES PARA O BANCO DE DADOS, REPETINDO OS PASSOS ANTERIORES.

11º Populando tabelas:
As tabelas são populadas através dos seeds, para isso criamos o arquivo dentro da pasta seeders, seguindo o model com as informações necessarias para que seja criado. No exemplo abaixo seria o seeder da tabela pessoas.
Além disso, para rodarmos os seeders, precisamos executar o comando no terminal:
npx sequelize-cli seed:generate --name demo-nivel
os seeds precisam ser criados em ordem, um por um.

SEEDERS:
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Pessoas', [
        {
        nome: 'Ana Souza',
        ativo: true,
        email:'ana@ana.com' ,
        role: 'estudante',
        createdAt: new Date(),
        updateAt: new Date(),
      },
   ], {});
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Pessoas', null, {});

  }
};

12º Para levar os seeders do código ao banco de dados, precisamos executar os seguintes comendos:
npx sequelize-cli db:seed:all

13º Criando as rotas e controladores dos demais arquivos.
Exceto as tabelas que tem para serem alteradas, precisam antes ter o ID de alguma outra tabela relacionada.

14º CRUD para a tabela onde depende necessariamente do ID de outra tabela, precisa ser feito dentro da própria tabela onde está relacionada. Tanto no controller quanto em suas rotas. No caso do arquivo em questão, falamos da MATRÍCULA que está relacionada com PESSOAS.
