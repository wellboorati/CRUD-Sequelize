//Index routes é o arquivo referência se tratando de tudo que estamos utilizando nas rotas. body-parser para conseguirmos fazer a mudança para json.

const bodyParser = require('body-parser')
const pessoas = require('./pessoasRoute')
const niveis = require('./niveisRoute')
const turmas = require('./turmasRoute')

//Utilizando a rota e o bodyparser que forem importados.
module.exports = app => {
    app.use(bodyParser.json())
    app.use(pessoas)
    app.use(niveis)
    app.use(turmas)
    }
