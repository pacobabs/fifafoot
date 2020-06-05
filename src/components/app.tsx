import React, { ReactNode } from 'react'
import store from '@services/store.json'
import { Provider, useDevtools } from '@store'

type Props = {
  element: ReactNode
}

const App = ({ element }: Props) => {
  console.count('APP')
  useDevtools(store)
  return <Provider store={store}>{element}</Provider>
}

export default App
