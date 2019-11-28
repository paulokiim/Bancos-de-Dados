import React from 'react'
import { Card } from '@uifabric/react-cards'
import {
  Text,
  FontIcon,
  Image,
  ImageFit,
} from 'office-ui-fabric-react'
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling'

import products from '../../utils/products'

const currencyOptions = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }
const currencyFormat = amount => amount.toLocaleString('pt-BR', currencyOptions)

const card = mergeStyles({
  margin: 12,
  paddingBottom: 16,
})

const text = mergeStyles({
  display: 'block',
  marginLeft: 16,
})

const icon = mergeStyles({
  fontSize: 32,
  height: 32,
  width: 50,
})

const CardComponent = ({ id, openCheckout }) => {
  const product = products[id]
  const { image, description, price } = product

  return (
    <Card onClick={() => openCheckout(product)} className={card}>
      <Card.Section fill verticalAlign="end">
        <Image
          src={image}
          alt={description}
          imageFit={ImageFit.cover}
          width={285}
          height={285}
        />
      </Card.Section>
      <Card.Section horizontal horizontalAlign="start">
        <Card.Item grow={2} horizontalAlign="start">
          <Text variant="xLarge" className={text}>{currencyFormat(price)}</Text>
            <Text variant="small" className={text}>
              em até 12x de {currencyFormat(price / 12)} sem juros
            </Text>
          <Text variant="medium" className={text}>
            {description}
          </Text>
        </Card.Item>
        <Card.Item align="center" grow>
          <FontIcon iconName="ShoppingCart" className={icon} />
        </Card.Item>
      </Card.Section>
    </Card>
  )
}

export default CardComponent
