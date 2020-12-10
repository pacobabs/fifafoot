import React, { ReactNode } from 'react'
import App from '@components/app'

type Props = {
  element: ReactNode
}

export const wrapRootElement = ({ element }: Props) => <App element={element} />
