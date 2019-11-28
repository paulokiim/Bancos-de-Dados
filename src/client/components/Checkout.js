import React, { useState, Fragment } from 'react'
import {
  DefaultButton,
  CompoundButton,
  Stack,
  Modal,
  Separator,
  MessageBar,
} from 'office-ui-fabric-react'
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling'
import { FontIcon } from 'office-ui-fabric-react/lib/Icon'
import { Text } from 'office-ui-fabric-react/lib/Text'

import Customer from './Customer'
import PaymentMethod from './PaymentMethod'
import CreditCard from './CreditCard'
import FinishPurchase from './FinishPurchase'


const modal = mergeStyles({
  padding: 20,
})

const checkout = mergeStyles({
  width: 600,
  padding: '24px 14px 24px 14px',
})

const icon = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  marginTop: 16,
  marginBottom: 16,
  color: 'lightseagreen',
})


const CheckoutComponent = ({
  amount,
  showModal,
  setShowModal
}) => {
  const [ paymentMethod, setPaymentMethod ] = useState('creditCard')
  const [ customerFound, setCustomerFound ] = useState(true)
  const [ customer, setCustomer ] = useState({
    id_comprador: '',
    nome: '',
    cpf: '',
    data_nascimento: '',
  })
  const [ creditCardFound, setCreditCardFound ] = useState(true)
  const [ creditCard, setCreditCard ] = useState({
    id_cartao: '',
    id_comprador: '',
    bandeira: '',
    portador: '',
    digitos: '',
  })
  const [ finished, setFinished ] = useState(false)

  return (
    <Fragment>
      <Modal
        isOpen={showModal}
        onDismiss={() => {
          setFinished(false)
          setShowModal(false)
        }}
        isBlocking={false}
        className={modal}
      >
        <Stack className={checkout}>
          {
            !finished &&
              <Fragment>
                <Separator>Dados pessoais</Separator>
                <Stack.Item>
                  <Customer
                    customer={customer}
                    setCustomer={setCustomer}
                    customerFound={customerFound}
                    setCustomerFound={setCustomerFound}
                  />
                </Stack.Item>

                <br/>
                <Separator>Forma de pagamento</Separator>
                <br/>

                <Stack.Item>
                  <PaymentMethod setPaymentMethod={setPaymentMethod} />
                </Stack.Item>
                {
                  paymentMethod === 'creditCard' &&
                    <Fragment>
                      <br/>
                      <Separator>Cartão de crédito</Separator>
                      <Stack.Item>
                        <CreditCard
                          creditCard={creditCard}
                          setCreditCard={setCreditCard}
                          creditCardFound={creditCardFound}
                          setCreditCardFound={setCreditCardFound}
                          customer={customer}
                          customerFound={customerFound}
                        />
                      </Stack.Item>
                    </Fragment>
                }

                <br/>
                <Separator>Finalizar compra</Separator>

                <FinishPurchase
                  customer={customer}
                  customerFound={customerFound}
                  creditCard={creditCard}
                  creditCardFound={creditCardFound}
                  paymentMethod={paymentMethod}
                  setFinished={setFinished}
                  amount={amount}
                />
              </Fragment>
            }
            {
              finished &&
                <Fragment>
                  <Stack.Item align="center">
                    <FontIcon iconName="Shop" className={icon} />
                  </Stack.Item>
                  <Stack.Item align="center">
                    <Text variant="xLarge">Compra realizada com sucesso!</Text>
                  </Stack.Item>
                </Fragment>
            }
        </Stack>
      </Modal>
    </Fragment>
  )
}

export default CheckoutComponent
