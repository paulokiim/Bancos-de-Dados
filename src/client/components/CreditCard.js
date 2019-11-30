import React, { Fragment } from 'react'
import { any, anyPass, isEmpty, pick, values } from 'ramda'
import {
  ActionButton,
  MaskedTextField,
  MessageBar,
  Stack,
  TextField,
} from 'office-ui-fabric-react'
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling'

import {
  getCreditCard,
  createCreditCard,
  deleteCreditCard,
} from '../../utils/creditCard'


const hasUnderline = string => {
  return string ? String(string).includes('_') : false
}
const isEmptyOrHasUnderline = anyPass([isEmpty, hasUnderline])


const button = mergeStyles({
  marginTop: 10,
})


const CreditCard = ({
  creditCard,
  setCreditCard,
  creditCardFound,
  setCreditCardFound,
  customer,
  customerFound,
}) => {
  const createCreditCardDisabled = (
    !customerFound || any(
      isEmptyOrHasUnderline,
      values(customer)
    )
  ) || (
    creditCardFound || any(
      isEmptyOrHasUnderline,
      values(pick(['portador', 'digitos'], creditCard))
    )
  )

  const deleteCreditCardDisabled = (
    !creditCardFound || any(
      isEmptyOrHasUnderline,
      values(pick(['portador', 'digitos'], creditCard))
    )
  )

  return (
    <Fragment>
      <Stack>
        <Stack.Item>
          <MaskedTextField
            label="Número do cartão"
            mask="9999 9999 9999 9999"
            onChange={(_, value) => {
              setCreditCard({ ...creditCard, digitos: value })
              getCreditCard(value, setCreditCardFound, setCreditCard)
            }}
            value={creditCard.digitos}
          />
          <TextField
            label="Nome do portador"
            mask="9999 9999 9999 9999"
            value={creditCard.portador}
            onChange={(_, value) => setCreditCard({ ...creditCard, portador: value })}
            disabled={creditCardFound}
          />
          {
            (
              !customerFound
              || any(isEmptyOrHasUnderline, values(customer))
            ) &&
            <Fragment>
              <br/>
              <MessageBar>
                Salve seus dados de usuário para poder armazenar seus cartões
              </MessageBar>
            </Fragment>
          }
          <Stack horizontal horizontalAlign="end">
            <Stack.Item>
              <ActionButton
                iconProps={{ iconName: 'Save'}}
                className={button}
                onClick={() => createCreditCard({
                  buyerId: customer.id_comprador,
                  cardHolder: creditCard.portador,
                  digits: creditCard.digitos,
                }, setCreditCardFound, setCreditCard)}
                disabled={createCreditCardDisabled}
              >
                Salvar cartão
              </ActionButton>
              <ActionButton
                iconProps={{ iconName: 'Delete'}}
                className={button}
                onClick={() => {
                  deleteCreditCard(creditCard.digitos)
                  setCreditCard({ portador: '', digitos: '' })
                  setCreditCardFound(false)
                }}
                disabled={deleteCreditCardDisabled}
              >
                Apagar cartão
              </ActionButton>
            </Stack.Item>
          </Stack>
        </Stack.Item>
      </Stack>
    </Fragment>
  )
}

export default CreditCard
