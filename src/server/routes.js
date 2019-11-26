const express = require("express");

const Cartao = require("./controllers/Cartao");
const Compra = require("./controllers/Compra");
const Boleto = require("./controllers/Boleto");
const Loja = require("./controllers/Loja");
const Transacao = require("./controllers/Transacao");
const Comprador = require("./controllers/Comprador");

const routes = express.Router();

routes.get("/transacao", Transacao.index);

module.exports = routes;
