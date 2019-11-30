const { head } = require("ramda");
const db = require("../db");

const compras = [];

module.exports = {
  show(req, res) {
    const { id } = req.query;
    res.send(head(compras.filter(compra => compras.id_compra == id)));
  },

  create(req, res) {
    const { id_comprador, id_loja, valor, metodo } = req.body;

    const parsedValor = Math.floor(valor * 100);
    const data = new Date().toISOString();
    const data_futura = new Date(parseInt(data) + 1000000).toISOString();

    const compraText =
      "INSERT INTO bd.compra (fk_id_comprador, fk_id_loja, data, valor) VALUES ($1, $2, $3, $4) RETURNING *;";
    const compraValues = [id_comprador, id_loja, data, parsedValor];

    db.query(compraText, compraValues, (err, result) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(result.rows[0]);
        const resultado = result.rows[0];

        const transacaoText =
          "INSERT INTO bd.transacao (fk_id_compra, data, valor, metodo, status) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
        const transacaoValues = [
          resultado.id_compra,
          data,
          parsedValor,
          metodo,
          1
        ];

        db.query(transacaoText, transacaoValues, (err, result) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log(result.rows[0]);
            const transacao = result.rows[0];

            if (metodo === "boleto") {
              const recebedor = "Lojinha BD";
              const { id_transacao } = transacao;
              const { id_compra, fk_id_comprador } = resultado;
              const codigo_barra =
                "34191.79001 01043.510047 91020.150008 2 80870026000";
              const boletoText =
                "INSERT INTO bd.boleto (fk_id_transacao, fk_id_compra, codigo_barra, valor, vencimento, pagador, recebedor) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
              const boletoValues = [
                id_transacao,
                id_compra,
                codigo_barra,
                parsedValor,
                data_futura,
                fk_id_comprador,
                recebedor
              ];

              db.query(boletoText, boletoValues, (err, result) => {
                if (err) {
                  console.log(err.stack);
                } else {
                  console.log(result.rows[0]);
                  res.send(201, result.rows[0]);
                }
              });
            }
          }
        });
      }
    });
  }
};
