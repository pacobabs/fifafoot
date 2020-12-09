import React, { ReactNode } from 'react'
import { createStore, Provider, useDispatch } from 'react-reduce-hooks'
import { initDevtools, wrapWithDevtools } from 'reduce-devtools-extension'
import rootReducer from './reducers'
import * as actionCreators from './actions'
import { State } from './types'

type Props = {
  state: State
  children: ReactNode
}

const reducer = wrapWithDevtools(rootReducer)

const AppProvider = ({ state, children }: Props) => {
  console.count('PROVIDER')
  const [store, dispatch] = createStore(reducer, state)
  initDevtools(store, dispatch, { actionCreators })
  return (
    <Provider store={store} dispatch={dispatch}>
      {children}
    </Provider>
  )
}

export { AppProvider as Provider, useDispatch }
