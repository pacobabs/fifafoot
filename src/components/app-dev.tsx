import React, { ReactNode } from 'react'
import state from '@services/store.json'
import { Provider } from '@store'

type Props = {
  element: ReactNode
}

const App = ({ element }: Props) => {
  return <Provider state={state}>{element}</Provider>
}

export default App
