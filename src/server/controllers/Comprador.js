const { head } = require("ramda")
const db = require("../db")
const { parseDataBancoPraFront } = require("../../utils/functions")

const compradores = [
  {
    id_comprador: 21418,
    nome: "Igor Antun",
    cpf: "123.456.789-09",
    data_nascimento: "22/12/1999"
  }
]

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

        const { data_nascimento } = result.rows[0]

        // const arrayData = data.split("-")
        const dataTratada = `${data_nascimento.getDate()}/${data_nascimento.getMonth() +
          1}/${data_nascimento.getFullYear()}`
        console.log("data", dataTratada)

        // const resultado = { ...result.rows[0], data_nascimento: dataTratada }
        // console.log("Data tratada", dataTratada, resultado)
        res.send(result.rows[0])
      }
    })
  },

  create(req, res) {
    const { nome, cpf, data_nascimento } = req.body

    const id_comprador = Math.floor(Math.random() * 90000) + 10000

    const comprador = {
      id_comprador,
      nome,
      cpf,
      data_nascimento
    }

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
        res.send(201, comprador)
      }
    })

    // compradores.push(comprador)
  }
}
