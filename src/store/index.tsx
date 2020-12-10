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

const reducer = typeof window !== `undefined` ? wrapWithDevtools(rootReducer) : rootReducer

const AppProvider = ({ state, children }: Props) => {
  const [store, dispatch] = createStore(reducer, state)
  typeof window !== `undefined` && initDevtools(store, dispatch, { actionCreators })
  return (
    <Provider store={store} dispatch={dispatch}>
      {children}
    </Provider>
  )
}

export { AppProvider as Provider, useDispatch }
