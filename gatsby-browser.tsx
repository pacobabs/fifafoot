import React, { ReactNode } from 'react'
import Root from '@components/app-dev'

type Props = {
  element: ReactNode
}

export const wrapRootElement = ({ element }: Props) => <Root element={element} />
