const { head } = require("ramda")
const db = require("../db")

module.exports = {
  show(req, res) {
    const { digitos } = req.query

    const text = "SELECT * FROM bd.cartao WHERE digitos = $1"
    const values = [digitos]

    db.query(text, values, (err, result) => {
      if (err) {
        console.log(err.stack)
        res.status(400).send({ error: "Nao foi possivel realizar a consulta" })
      } else {
        // console.log("Show Cartoes", result.rows[0])
        res.send(result.rows[0])
      }
    })
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

    const text = "DELETE FROM bd.cartao WHERE digitos = $1 RETURNING *;"
    const values = [digitos]

    db.query(text, values, (err, result) => {
      if (err) {
        console.log(err.stack)
        res.status(204).send({ error: "Nao foi possivel deletar" })
      } else {
        console.log(result.rows[0])
        res.send(200, result.rows[0])
      }
    })
  }
}
