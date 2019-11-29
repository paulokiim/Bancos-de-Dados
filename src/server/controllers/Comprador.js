const { head } = require("ramda")
const db = require("../db")

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
    res.send(head(compradores.filter(comprador => comprador.cpf == cpf)))
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

    const text =
      "INSERT INTO bd.comprador (nome, cpf, data_nascimento) values ($2, $2, $3);"
    const values = [nome, cpf, data_nascimento]

    db.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows[0])
      }
    })

    // compradores.push(comprador)
    res.send(201, comprador)
  }
}
