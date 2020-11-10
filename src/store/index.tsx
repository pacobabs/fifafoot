import React, { useContext, useReducer, ReactNode } from 'react'
import { createContext } from 'use-context-selection'
import { initDevtools, wrapWithDevtools } from 'reduce-devtools-extension'
import rootReducer from './reducers'
import * as actionCreators from './actions'
import { IStateContext, State, IDispatchContext, Dispatch } from './types'

type Props = {
  store: State
  children: ReactNode
}

const StateContext: IStateContext = createContext<undefined | State>(undefined)

const DispatchContext: IDispatchContext = createContext<undefined | Dispatch>(undefined)

const reducer = wrapWithDevtools(rootReducer)

const Provider = (props: Props) => {
  console.count('PROVIDER')
  const { store, children } = props
  const [state, dispatch] = useReducer(reducer, store)
  initDevtools(store, dispatch, { actionCreators })
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  )
}

const useDispatch = () => {
  return useContext(DispatchContext)
}

export { Provider, StateContext as Context, useDispatch }
