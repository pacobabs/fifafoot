import React, { useContext, useReducer, ReactNode } from 'react'
import { createContext } from 'use-context-selection'
import { initDevtools, composeWithDevtools } from '@reduce-devtools'
import rootReducer from './reducers'
import * as actionCreators from './actions'
import { IStateContext, State, IDispatchContext, Dispatch } from './types'

type Props = {
  store: State
  children: ReactNode
}

const StateContext: IStateContext = createContext<undefined | State>(undefined)

const DispatchContext: IDispatchContext = createContext<undefined | Dispatch>(undefined)

const reducer = composeWithDevtools(rootReducer)

const Provider = (props: Props) => {
  console.count('PROVIDER')
  const { store, children } = props
  const [state, dispatch] = useReducer(reducer, store)
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  )
}

const useDispatch = () => {
  return useContext(DispatchContext)
}

const useDevtools = (store: State) => {
  const dispatch = useContext(DispatchContext)
  initDevtools(store, dispatch, { actionCreators })
}

export { Provider, StateContext as Context, useDispatch, useDevtools }
