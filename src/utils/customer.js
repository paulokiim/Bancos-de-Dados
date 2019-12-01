import axios from "axios"

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/

const createCustomer = (
  { name, cpf, birthday },
  setCustomerFound,
  setCustomer
) => {
  axios
    .post("/compradores", {
      nome: name,
      cpf,
      data_nascimento: birthday
    })
    .then(({ data }) => {
      if (data.nome) {
        setCustomerFound(true)
        return setCustomer(data)
      }

      setCustomerFound(false)
    })
    .catch(console.error)
}

const getCustomer = (cpf, setCustomerFound, setCustomer) => {
  if (cpf.match(cpfRegex)) {
    axios
      .get(`/compradores?cpf=${cpf}`)
      .then(({ data }) => {
        if (data.nome) {
          setCustomerFound(true)
          return setCustomer(data)
        }

        setCustomerFound(false)
      })
      .catch(setCustomerFound(false))
  }
}

export { createCustomer, getCustomer }
