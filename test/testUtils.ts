import { RenderOptions, RenderResult, render } from '@testing-library/react'

const customRender = (ui: React.ReactElement, options: RenderOptions = {}): RenderResult => render(ui, { ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
