import React, { Fragment } from "react"
import { CompoundButton, Stack } from "office-ui-fabric-react"
import { mergeStyles } from "office-ui-fabric-react/lib/Styling"

import { getPurchase } from "../../utils/purchase"

const button = mergeStyles({
  marginTop: 10
})

const FinishSearch = ({ setFinished, customer, setItems }) => {
  return (
    <Fragment>
      <Stack.Item align="end">
        <CompoundButton
          primary
          onClick={() => {
            getPurchase(
              {
                id_comprador: customer.id_comprador
              },
              setItems
            )
            setFinished(true)
          }}
          className={button}
        >
          Finalizar busca
        </CompoundButton>
      </Stack.Item>
    </Fragment>
  )
}

export default FinishSearch
