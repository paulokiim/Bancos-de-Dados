const { head } = require("ramda")
const db = require("../db")
const { parseDataBancoPraFront } = require("../../utils/functions")

module.exports = {
  show(req, res) {
    const { cpf } = req.query

    const text = "SELECT * FROM bd.comprador WHERE cpf = $1"
    const values = [cpf]

    db.query(text, values, (err, result) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(result.rows[0])
        let resposta = result.rows[0]

        //Se houver resultado trata os dados
        if (result.rows[0]) {
          const { data_nascimento } = result.rows[0]

          // Trata string de datas
          let mesNascimento = data_nascimento.getMonth() + 1
          if (mesNascimento < 10) {
            mesNascimento = `0${mesNascimento}`
          }

          let diaNascimento = data_nascimento.getDate()
          if (diaNascimento < 10) {
            diaNascimento = `0${diaNascimento}`
          }

          const dataTratada = `${diaNascimento}/${mesNascimento}/${data_nascimento.getFullYear()}`

          resposta = { ...result.rows[0], data_nascimento: dataTratada }
        }

        res.send(resposta)
      }
    })
  },

  create(req, res) {
    const { nome, cpf, data_nascimento } = req.body

    const arraySplit = data_nascimento.split("/")
    const dataNascimentoTratada = `${arraySplit[2]}-${arraySplit[1]}-${arraySplit[0]}`

    const text =
      "INSERT INTO bd.comprador (nome, cpf, data_nascimento) values ($1, $2, $3) RETURNING *;"
    const values = [nome, cpf, dataNascimentoTratada]

    db.query(text, values, (err, result) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(result.rows[0])
        res.send(201, result.rows[0])
      }
    })
  }
}
