import React, { ReactNode } from 'react'
import store from '@services/store.json'
import { Provider } from '@store'

type Props = {
  element: ReactNode
}

const App = ({ element }: Props) => {
  console.log('APP test husky')
  return <Provider store={store}>{element}</Provider>
}

export default App
