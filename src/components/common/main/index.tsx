import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Main = ({ children }: Props) => {
  return <main className="sm:col-start-3 mx-0.5 sm:col-span-10 md:col-start-3 md:col-span-8">{children}</main>
}
export default Main
