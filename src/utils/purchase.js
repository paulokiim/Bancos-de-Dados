import axios from 'axios'

const createPurchase = ({
  buyerId,
  shopId,
  amount,
  method,
}) => {
  axios
    .post('/compras', {
      id_comprador: buyerId,
      id_loja: shopId,
      valor: amount,
      metodo: method,
    })
    .then(({ data }) => {
      if (data.nome) {
        setCustomerFound(true)
        return setCustomer(data)
      }
    })
    .catch(console.error)
}

export {
  createPurchase
}
