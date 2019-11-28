const express = require('express')

const Cartao = require('./controllers/Cartao')
const Compra = require('./controllers/Compra')
const Comprador = require('./controllers/Comprador')

const routes = express.Router()

// Cartões
routes.get('/cartoes', Cartao.show)
routes.post('/cartoes', Cartao.create)
routes.delete('/cartoes', Cartao.delete)

// Compras
routes.get('/compras', Compra.show)
routes.post('/compras', Compra.create)

// Compradores
routes.get('/compradores', Comprador.show)
routes.post('/compradores', Comprador.create)

module.exports = routes
