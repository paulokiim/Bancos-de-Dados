import React, { useState, Fragment } from "react"
import {
  DefaultButton,
  CompoundButton,
  Stack,
  Modal,
  Separator,
  MessageBar
} from "office-ui-fabric-react"
import { mergeStyles } from "office-ui-fabric-react/lib/Styling"
import { FontIcon } from "office-ui-fabric-react/lib/Icon"
import { Text } from "office-ui-fabric-react/lib/Text"
import FinishSearch from "./FinishSearch"

import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList"

import Customer from "./Customer"
const modal = mergeStyles({
  padding: 20
})

const checkout = mergeStyles({
  width: 800,
  padding: "24px 14px 24px 14px"
})

const icon = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  marginTop: 16,
  marginBottom: 16,
  color: "lightseagreen"
})

const SearchPurchaseComponent = ({
  showPurchaseModal,
  setShowPurchaseModal
}) => {
  const [customerFound, setCustomerFound] = useState(true)
  const [customer, setCustomer] = useState({
    id_comprador: "",
    nome: "",
    cpf: "",
    data_nascimento: ""
  })

  const [items, setItems] = useState([
    {
      key: 1,
      id_compra: 1,
      valor: 232,
      data: "15/10/2009",
      digitos: 3333,
      portador: "Alexandree"
    },
    {
      key: 2,
      id_compra: 2,
      valor: 232,
      data: "15/10/2009",
      digitos: 2222,
      portador: "Jose"
    },
    {
      key: 2,
      id_compra: 3,
      valor: 232,
      data: "15/10/2009",
      digitos: 2222,
      portador: "Jose"
    },
    {
      key: 2,
      valor: 21432,
      id_compra: 4,
      data: "15/10/2009",
      digitos: 2222,
      portador: "Jseofino"
    }
  ])

  const columns = [
    {
      key: "column1",
      name: "Id da Compra",
      fieldName: "id_compra",
      minWidth: 50,
      maxWidth: 100,
      isResizable: true
    },
    {
      key: "column2",
      name: "Valor",
      fieldName: "valor",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    },
    {
      key: "column3",
      name: "Data",
      fieldName: "data",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    },
    {
      key: "column4",
      name: "Últimos 4 digitos",
      fieldName: "digitos",
      minWidth: 200,
      maxWidth: 300,
      isResizable: true
    },
    {
      key: "column5",
      name: "Nome Portador",
      fieldName: "portador",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    }
  ]

  // const comprasJustificadas = retorno.map((compra, index) => ({
  //   key: index,
  //   id_compra: compra.id_compra
  //   // Montar aqui o objeto para inserir na tabela, com o formato
  // }))

  const [finished, setFinished] = useState(false)

  return (
    <Fragment>
      <Modal
        isOpen={showPurchaseModal}
        onDismiss={() => {
          setFinished(false)
          setShowPurchaseModal(false)
        }}
        isBlocking={false}
        className={modal}
      >
        <Stack className={checkout}>
          {!finished && (
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

              <br />

              <br />
              <Separator>Buscar</Separator>

              <FinishSearch
                customer={customer}
                customerFound={customerFound}
                setFinished={setFinished}
              />
            </Fragment>
          )}
          {finished && (
            <Fragment>
              <Separator>Histórico de Compras</Separator>
              <DetailsList
                items={items}
                columns={columns}
                // setKey="set"
                // layoutMode={DetailsListLayoutMode.justified}
                // selectionPreservedOnEmptyClick={true}
                // ariaLabelForSelectionColumn="Toggle selection"
                // ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                // checkButtonAriaLabel="Row checkbox"
              />
            </Fragment>
          )}
        </Stack>
      </Modal>
    </Fragment>
  )
}

export default SearchPurchaseComponent
