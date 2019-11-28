import React, { useState } from 'react'
import {
  Stack,
} from 'office-ui-fabric-react'
import { Card, Checkout } from '.'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox'
import { Text } from 'office-ui-fabric-react/lib/Text'
import { TestImages } from '@uifabric/example-data'

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling'

const header = mergeStyles({
  width: '100%',
  backgroundColor: '#ddd',
  boxShadow: 'rgba(0, 0, 0, 0.133) 0px 1.6px 3.6px 0px, rgba(0,0,0,0.11) 0px 0.3px 0.9px 0px',
  height: 72,
  marginBottom: 32,
  paddingTop: 16,
  paddingLeft: 16,
  paddingBottom: 16,
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'vertical',
  alignItems: 'center',
  justifyContent: 'space-around',
})

const search = mergeStyles({
  width: 500,
})

const cards = {
  width: '60vw',
  marginLeft: 'auto',
  marginRight: 'auto',
}


const App = () => {
  const [ showModal, setShowModal ] = useState(false)
  const [ product, setProduct ] = useState({})

  const openCheckout = (data) => {
    setProduct(data)
    setShowModal(true)
  }

  return (
    <div>
      <div className={header}>
        <Text variant="xxLargePlus">Lojinha BD</Text>
        <SearchBox className={search} placeholder="Buscar produtos..." />
      </div>
      <Stack horizontalAlign="space-around" horizontal wrap className={cards}>
        <Card id={0} openCheckout={openCheckout} />
        <Card id={1} openCheckout={openCheckout} />
        <Card id={2} openCheckout={openCheckout} />
        <Card id={3} openCheckout={openCheckout} />
        <Card id={4} openCheckout={openCheckout} />
        <Card id={5} openCheckout={openCheckout} />
        <Card id={6} openCheckout={openCheckout} />
        <Card id={7} openCheckout={openCheckout} />
        <Card id={8} openCheckout={openCheckout} />
        <Card id={9} openCheckout={openCheckout} />
      </Stack>
      <Checkout amount={product.price} showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default App
