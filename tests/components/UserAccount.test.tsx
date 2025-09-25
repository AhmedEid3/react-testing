import { render, screen } from '@testing-library/react'

import UserAccount from '../../src/components/UserAccount'
import { User } from '../../src/entities'

describe('UserAccount', () => {
  const user: User = {
    id: 1,
    name: 'Ahmed',
    isAdmin: true,
  }

  it('should render user name', () => {
    render(<UserAccount user={user} />)
    const name = screen.getByText(new RegExp(user.name, 'i'))
    expect(name).toBeInTheDocument()
  })

  it('should render edit button if user is admin', () => {
    render(<UserAccount user={user} />)
    const editButton = screen.getByRole('button')
    expect(editButton).toBeInTheDocument()
    expect(editButton).toHaveTextContent(/edit/i)
  })

  it('should hidden edit button if user is not admin', () => {
    render(<UserAccount user={{ ...user, isAdmin: false }} />)
    const editButton = screen.queryByRole('button')
    expect(editButton).not.toBeInTheDocument()
  })
})
