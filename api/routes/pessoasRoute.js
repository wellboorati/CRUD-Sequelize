//Desestruturação importando express e também as regras de negócio do controller.

const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

//rotas proveniente do controller
router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)
//método para criação de novo usuário, utilizando o método post para isso.
router.post('/pessoas', PessoaController.criarPessoa)
//a rota uptade precisa ser passada com o método PUT, pois o mesmo é o responsável por modificar informações específicas.
router.put('/pessoas/:id', PessoaController.atualizarPessoa)
//
router.delete('/pessoas/:id', PessoaController.deletarPessoa)
//A rota de matrícula inicialmente precisa passar por pessoas e aí sim ir até matrículas.
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)
//Para criar matrícula, utilizamos o método post e também temos que primeiro identificar o estudante, por isso fazemos a rota dentro de pessoas utilizando pessoacontroller.
router.post('/pessoas/:estudanteId/matricula', PessoaController.criarMatricula)

router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizarMatricula)

router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deletarMatricula)



//exportando as rotas a serem usadas
module.exports = router

