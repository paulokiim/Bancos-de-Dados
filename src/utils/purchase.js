import axios from "axios"

const createPurchase = ({ buyerId, shopId, amount, method }) => {
  axios
    .post("/compras", {
      id_comprador: buyerId,
      id_loja: shopId,
      valor: amount,
      metodo: method
    })
    .then(({ data }) => {
      if (data.nome) {
        setCustomerFound(true)
        return setCustomer(data)
      }
    })
    .catch(console.error)
}

const getPurchase = ({ id_comprador }, setItems) => {
  console.log("idcomprador front", id_comprador)
  axios
    .get(`/compras?id_comprador=${id_comprador}`)
    .then(resposta => {
      console.log("resposta compras", resposta.data)

      const comprasJustificadas = resposta.data.map(compra => ({
        key: compra.id_compra,
        ...compra
      }))

      console.log("func popular items", comprasJustificadas)
      setItems(comprasJustificadas)
    })
    .catch(console.error)
}

export { createPurchase, getPurchase }
