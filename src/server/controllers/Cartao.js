const { head } = require("ramda")
const db = require("../db")

module.exports = {
  show(req, res) {
    const { digitos } = req.query
    console.log(digitos, cartoes)
    res.send(head(cartoes.filter(cartao => cartao.digitos == digitos)))
  },

  create(req, res) {
    const { id_comprador, bandeira, portador, digitos } = req.body

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
