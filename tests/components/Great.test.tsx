import { render, screen } from '@testing-library/react'

import Greet from '../../src/components/Greet'

describe('Greet', () => {
  it('should render hello with name when provide the name', () => {
    render(<Greet name='Ahmed' />)

    const heading = screen.getByRole('heading')

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/ahmed/i)
  })

  it('should render login button when not provide the name', () => {
    render(<Greet />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/login/i)
  })
})
