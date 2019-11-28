import React, { Fragment } from 'react'
import { any, anyPass, isEmpty, omit, values } from 'ramda'
import {
  ActionButton,
  MaskedTextField,
  Stack,
  TextField,
} from 'office-ui-fabric-react'
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling'

import {
  getCustomer,
  createCustomer,
} from '../../utils/customer'


const hasUnderline = string => {
  return string ? String(string).includes('_') : false
}
const isEmptyOrHasUnderline = anyPass([isEmpty, hasUnderline])


const button = mergeStyles({
  marginTop: 10,
})


const Customer = ({
  customer,
  setCustomer,
  customerFound,
  setCustomerFound,
}) => {
  const createCustomerDisabled = (
    customerFound || any(
      isEmptyOrHasUnderline,
      values(omit(['id_comprador'], customer))
    )
  )

  return (
    <Fragment>
      <MaskedTextField
        label="CPF"
        mask="999.999.999-99"
        onChange={(_, value) => {
          setCustomer({ ...customer, cpf: value })
          getCustomer(value, setCustomerFound, setCustomer)}
        }
        value={customer.cpf}
      />
      <TextField
        label="Nome completo"
        onChange={(_, value) => {
          setCustomer({ ...customer, nome: value })
          console.log(customer)
        }}
        value={customer.nome}
        disabled={customerFound}
      />
      <MaskedTextField
        label="Data de nascimento"
        mask="99/99/9999"
        onChange={(_, value) => {
          setCustomer({ ...customer, data_nascimento: value })
        }}
        value={customer.data_nascimento}
        disabled={customerFound}
      />
      <Stack horizontal horizontalAlign="end">
        <Stack.Item>
          <ActionButton
            iconProps={{ iconName: 'Save'}}
            onClick={() => createCustomer({
              name: customer.nome,
              cpf: customer.cpf,
              birthday: customer.data_nascimento,
            }, setCustomerFound, setCustomer)}
            disabled={createCustomerDisabled}
            className={button}
          >
            Salvar dados
          </ActionButton>
        </Stack.Item>
      </Stack>
    </Fragment>
  )
}

export default Customer
