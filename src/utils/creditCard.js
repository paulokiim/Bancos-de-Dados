import axios from 'axios'

const creditCardRegex = /^\d{4}\ \d{4}\ \d{4}\ \d{4}$/

const createCreditCard = ({
  buyerId,
  cardHolder,
  digits,
}, setCreditCardFound, setCreditCard) => {
  if (buyerId && digits.match(creditCardRegex) && cardHolder) {
    const brand = {
      41: 'visa',
      52: 'master'
    }

    axios
      .post('/cartoes', {
        id_comprador: buyerId,
        bandeira: brand[digits.substring(0, 2)] || 'visa',
        portador: cardHolder,
        digitos: digits,
      })
      .then(({ data }) => {
        if (data.digitos) {
          setCreditCardFound(true)
          return setCreditCard(data)
        }

        setCreditCardFound(false)
      })
      .catch(console.error)
  }
}

const getCreditCard = (digits, setCreditCardFound, setCreditCard) => {
  if (digits.match(creditCardRegex)) {
    axios
      .get(`/cartoes?digitos=${digits}`)
      .then(({ data }) => {
        if (data.digitos) {
          setCreditCardFound(true)
          return setCreditCard(data)
        }

        setCreditCardFound(false)
      })
      .catch(console.error)
  }
}

const deleteCreditCard = (digits) => {
  axios
    .delete(`/cartoes?digitos=${digits}`)
    .then(console.log)
    .catch(console.error)
}

export {
  createCreditCard,
  getCreditCard,
  deleteCreditCard,
}
