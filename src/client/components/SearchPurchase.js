import React, { useState, Fragment } from "react";
import {
  DefaultButton,
  CompoundButton,
  Stack,
  Modal,
  Separator,
  MessageBar
} from "office-ui-fabric-react";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { FontIcon } from "office-ui-fabric-react/lib/Icon";
import { Text } from "office-ui-fabric-react/lib/Text";

import Customer from "./Customer";
const modal = mergeStyles({
  padding: 20
});

const checkout = mergeStyles({
  width: 600,
  padding: "24px 14px 24px 14px"
});

const icon = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  marginTop: 16,
  marginBottom: 16,
  color: "lightseagreen"
});

const SearchPurchaseComponent = () => {
  const [customerFound, setCustomerFound] = useState(true);
  const [customer, setCustomer] = useState({
    id_comprador: "",
    nome: "",
    cpf: "",
    data_nascimento: ""
  });
  const [finished, setFinished] = useState(false);

  return (
    <Fragment>
      <Modal
        isOpen={true}
        onDismiss={() => {
          setFinished(false);
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
              <Separator>Finalizar compra</Separator>

            </Fragment>
          )}
          {finished && (
            <Fragment>
              <Stack.Item align="center">
                <FontIcon iconName="Shop" className={icon} />
              </Stack.Item>
              <Stack.Item align="center">
                <Text variant="xLarge">Compra realizada com sucesso!</Text>
              </Stack.Item>
            </Fragment>
          )}
        </Stack>
      </Modal>
    </Fragment>
  );
};

export default SearchPurchaseComponent;
