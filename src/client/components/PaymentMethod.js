import React, { Fragment } from 'react'
import {
  Stack,
  ChoiceGroup,
} from 'office-ui-fabric-react'

const PaymentMethod = ({ setPaymentMethod }) =>
  <Fragment>
    <Stack horizontal horizontalAlign="center">
      <ChoiceGroup
        defaultSelectedKey="creditCard"
        options={[
          {
            key: 'creditCard',
            iconProps: { iconName: 'PaymentCard' },
            text: 'Cartão de crédito',
          },
          {
            key: 'boleto',
            iconProps: { iconName: 'PageList' },
            text: 'Boleto'
          },
        ]}
        onChange={(_, option) => setPaymentMethod(option.key)}
      />
    </Stack>
  </Fragment>

export default PaymentMethod
