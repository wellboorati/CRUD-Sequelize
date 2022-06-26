//Importando o express e também as rotas a serem utilizadas
const express = require('express')
const routes = require('./routes')

//Utilizando o express e a definindo a porta
const app = express()
const port = 3003

routes(app)

//Mensagem impressa quando o servidor estiver normal
app.listen(port, () => console.log('Servidor rodando'))

module.exports = app