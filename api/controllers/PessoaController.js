//Arquivo onde estão as regras do que acontecerá em cara método. Onde estão as regras do CRUD.
const database = require('../models')

//declarando classe PessoaController, lembrando que todas as declarações de classes começam com letra maiúscula e no singular. Usamos o static para que as informações de pessoas sejam as mesmas. Utilizamos também a const Pessoas que está dentro do model pessoas, que define as propriedades de pessoas.
//Try and catch tem como funcão passar pela requisição e caso não dê certo, caso tenha algum erro, o catch pega o erro e lança ele.


class PessoaController {
    static async pegaTodasAsPessoas(req,res) {
        try{
        const todasAsPessoas = await database.Pessoas.findAll()
        return res.status(200).json(todasAsPessoas)
        } catch(error) {
            return res.status(500).json(error.message)

        }
    }

    //Aqui temos que o ID é passado pelo parâmetro, dentro da url e assim acessamos o model para encontrar a cliente no banco de dados. Sempre que utilizamos o findOne do sequelize, precisamos também utilizar o where, pois é algo específico.

    static async pegaUmaPessoa(req, res) {
    const { id } = req.params
    try{
        const umaPessoa = await database.Pessoas.findOne( {
            where: {
                id: Number(id)
            }})
            return res.status(200).json(umaPessoa)
    } catch (error) {
        return res.status(500).json(error.message)
    }
    }

    //Criando método para criar novo usuário. Esse método recebe o seu parâmetro do corpo e não da URL, portanto utilizamos o req.body em uma constante para armazenar a informação. Passamos essa informação armazenada depois com o método create.

    static async criarPessoa (req, res) {
        const novaPessoa = req.body //se for uma informação específica, pode ser também por exemplo: req.body.name, req.body.email, req.body.idade, req.body.algumaCoisa
        try{
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //Método update talvez seja o mais complexo. Ele requer que seja identificado o ID passado pelo req.params que seja deletado e também as informações que são passadas pelo req.body.
    //Nesse caso, no método try não passamos inicialmente uma constante, pois a informação é enviada diretamente, mas para que possamos enviar essa informação de volta, precisamos sim capturar a informação através da const pessoaAtualizada, que puxa o ID da pessoa que foi atualizada. Lembrando também que o método uptade ele necessita que seja informado o where para que não faça atualização de todos os usuários do banco.
    static async atualizarPessoa (req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Pessoas.update(novasInfos, {where: {id: Number(id)}})
            const pessoaAtualizada = await database.Pessoas.findOne( {
                where: { id: Number(id)}})
                return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //Importantíssimo que o método destroy tenha o where, pois caso contrário ele deletará todo o banco. Nesse caso, precisamos identificar através do req.params que vem através da URl. Nesse caso, o retorno é feito direto no json com uma mensagem passando o id que foi deletado.
    static async deletarPessoa (req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.destroy({ where: {id: Number(id)}})
            return res.status(200).json({ mensagem: `id ${id} deletado` })

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //Para encontrarmos uma matrícula, não vamos criar o próprio controller de matrícula, pois ele só existe se houver uma pessoa atrelado a ele. Dessa forma, utilizamos ele junto com pessoas. Onde estudanteId na nossa constante vai ser equivalente a propriedade estudante_id da tabela matrículas. E o id será o matriculaId, pois estamos na tabela de matrículas. Após isso, precisamos definir a rota de matrículas, que também está dentro das rotas relacionadas a pessoas.
    static async pegaUmaMatricula(req, res) {
      const { estudanteId, matriculaId } = req.params
      try{
          const umaMatricula = await database.Matriculas.findOne( {
              where: {
                  id: Number(matriculaId),
                  estudante_id: Number(estudanteId)
              }})
              return res.status(200).json(umaMatricula)
      } catch (error) {
          return res.status(500).json(error.message)
      }
      }

      //Aqui utilizamos o conceito de spread na const nova matrícula quando estamos passando o req.body.
      static async criarMatricula (req, res) {
        const {estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try{
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizarMatricula (req, res) {
      const { estudanteId, matriculaId } = req.params
      const novasInfos = req.body
      try {
          await database.Matriculas.update(novasInfos, {
            where:
            {id: Number(matriculaId),
            estudante_id: Number(estudanteId)
          }})
          const matriculaAtualizada = await database.Matriculas.findOne( {
              where: { id: Number(matriculaId)
              }})
              return res.status(200).json(matriculaAtualizada)
      } catch (error) {
          return res.status(500).json(error.message)
      }
  }

  static async deletarMatricula (req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
        await database.Matriculas.destroy({ where: {id: Number(matriculaId)}})
        return res.status(200).json({ mensagem: `id ${matriculaId} deletado` })

    } catch (error) {
        return res.status(500).json(error.message)
    }
}
}

module.exports = PessoaController;

