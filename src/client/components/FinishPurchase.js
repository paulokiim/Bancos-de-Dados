import React, { Fragment } from 'react'
import { any, anyPass, isEmpty, omit, values } from 'ramda'
import {
  CompoundButton,
  MessageBar,
  Stack,
} from 'office-ui-fabric-react'
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling'

import {
  createPurchase,
} from '../../utils/purchase'


const currencyOptions = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }
const currencyFormat = amount => amount.toLocaleString('pt-BR', currencyOptions)
const hasUnderline = string => {
  return string ? String(string).includes('_') : false
}
const isEmptyOrHasUnderline = anyPass([isEmpty, hasUnderline])


const button = mergeStyles({
  marginTop: 10,
})


const FinishPurchase = ({
  customer,
  customerFound,
  creditCard,
  creditCardFound,
  paymentMethod,
  setFinished,
  amount,
}) => {
  const paymentDisabled = (
    paymentMethod === 'boleto'
      ? !customerFound || isEmptyOrHasUnderline(customer.cpf)
      : (
          (!customerFound || isEmptyOrHasUnderline(customer.cpf))
          || (!creditCardFound || isEmptyOrHasUnderline(creditCard.digitos))
        )
  )

  return (
    <Fragment>
      {
        paymentDisabled &&
        <Fragment>
          <br/>
          <MessageBar>
            Salve seus dados de usuário e seu cartão para finalizar a compra
          </MessageBar>
        </Fragment>
      }
      <Stack.Item align="end">
        <CompoundButton
          primary
          secondaryText={`${paymentMethod === 'creditCard' ? '1x de ' : ''}${currencyFormat(amount)}`}
          onClick={() => {
            createPurchase({
              buyerId: customer.id_comprador,
              shopId: 'asd',
              amount,
              method: paymentMethod,
            })
            setFinished(true)
          }}
          disabled={paymentDisabled}
          className={button}
        >
          Finalizar compra
        </CompoundButton>
      </Stack.Item>
    </Fragment>
  )
}

export default FinishPurchase
