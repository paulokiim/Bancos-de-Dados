const { head } = require('ramda')
const db = require('../db')

let cartoes = [{
  id_cartao: 213217,
  id_comprador: 1234567,
  bandeira: 'visa',
  portador: 'Igor Antun',
  digitos: '4111 1111 1111 1111',
}]

module.exports = {
  show(req, res) {
    const { digitos } = req.query
    console.log(digitos, cartoes)
    res.send(head(cartoes.filter(cartao => cartao.digitos == digitos)))
  },

  create(req, res) {
    const {
      id_comprador,
      bandeira,
      portador,
      digitos
    } = req.body

    const id_cartao = Math.floor(Math.random() * 90000) + 10000

    const cartao = {
      id_cartao,
      id_comprador,
      bandeira,
      portador,
      digitos,
    }

    cartoes.push(cartao)
    res.send(201, cartao)
  },

  delete(req, res) {
    const { digitos } = req.query
    cartoes = cartoes.filter(cartao => cartao.digitos != digitos)
    res.sendStatus(200)
  }
};
