const { head } = require('ramda')
const db = require('../db')

const compras = []

module.exports = {
  show(req, res) {
    const { id } = req.query
    res.send(head(compras.filter(compra => compras.id_compra == id)))
  },

  create(req, res) {
    const {
      id_comprador,
      id_loja,
      valor,
      metodo,
    } = req.body

    const data = new Date().now();

    const text = 'INSERT INTO bd.compra (fk_id_comprador, fk_id_loja, data, valor) VALUES ($1, $2, $3, $4);'
    const values = [id_comprador, id_loja, data, valor];

    const id_compra = Math.floor(Math.random() * 90000) + 10000
    const id_transacao = Math.floor(Math.random() * 90000) + 10000
    const id_boleto = Math.floor(Math.random() * 90000) + 10000
    const data = Date.now()
    const data_futura = Date.now() + 1000000

    if (metodo === 'boleto') {
      // CRIAR BOLETO NO BANCO DE DADOS COM OS DADOS RECEBIDOS
      // CRIAR TRANSAÇÃO COM MÉTODO BOLETO E DADOS RECEBIDOS
      const boletoText = 
        'INSERT INTO bd.boleto (id_transacao, id_compra, codigo_barra, valor, vencimento, pagador, receberdor) VALUES ($1, $2, $3, $4, $5, $6, $7)';

      const boleto = {
        id_transacao,
        id_compra,
        codigo_barra: '34191.79001 01043.510047 91020.150008 2 80870026000',
        valor,
        vencimento: data_futura,
        pagador: id_comprador,
        recebedor: 'Lojinha BD',
      }

      console.log(boleto)
    } else if (metodo === 'creditCard') {
      // CRIAR TRANSAÇÃO COM MÉTODO CARTÃO DE CRÉDITO E DADOS RECEBIDOS
      // NÃO ESTAMOS SALVANDO NADA DOS DADOS DO CARTÃO UTILIZADO?
    } else {
      res.send(400)
    }

    const compra = {
      id_compra,
      id_comprador,
      id_loja,
      data,
      valor
    }

    compras.push(compra)
    res.send(201, compra)
  },
}
