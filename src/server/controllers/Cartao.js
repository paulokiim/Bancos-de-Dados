const { head } = require("ramda")
const db = require("../db")

module.exports = {
  show(req, res) {
    const { digitos } = req.query

    let cartoes = [{}]
    const text = "SELECT * FROM bd.cartao WHERE digitos = $1"
    const values = [digitos]

    let resposta = null
    db.query(text, values, (err, result) => {
      if (err) {
        console.log(err.stack)
      } else {
        // console.log("Show Cartoes", result.rows[0])
        resposta = result.rows[0]
      }
    })
    // console.log(digitos, cartoes)
    res.send(resposta)
  },

  create(req, res) {
    const { id_comprador, bandeira, portador, digitos } = req.body

    // console.log("tipo", typeof digitos)
    // const digitosTratados = digitos.trim()
    // console.log(digitosTratados)

    const text =
      "INSERT INTO bd.cartao (fk_id_comprador, bandeira, portador, digitos) VALUES ($1, $2, $3, $4) RETURNING *;"
    const values = [id_comprador, bandeira, portador, digitos]

    db.query(text, values, (err, result) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(result.rows[0])
        res.send(201, result.rows[0])
      }
    })
  },

  delete(req, res) {
    const { digitos } = req.query
    cartoes = cartoes.filter(cartao => cartao.digitos != digitos)
    res.sendStatus(200)
  }
}
