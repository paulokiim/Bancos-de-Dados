import axios from 'axios'

const createTransaction = ({
  purchaseId,
  date,
  amount,
  method,
  stat,
}) => {
  axios
    .post('/transacao', {
      id_compra: purchaseId,
      data: date,
      valor: amount,
      metodo: method,
      status: stat,
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
  createTransaction
}
