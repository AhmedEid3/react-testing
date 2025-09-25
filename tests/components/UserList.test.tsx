import { render, screen } from '@testing-library/react'

import UserList from '../../src/components/UserList'
import { User } from '../../src/entities'

describe('UserList', () => {
  it('should render no users if users are empty array', () => {
    render(<UserList users={[]} />)

    const text = screen.getByText(/no users/i)

    expect(text).toBeInTheDocument()
  })

  it('should render a list of users', () => {
    const users: User[] = [
      {
        id: 1,
        name: 'Ahmed Eid',
      },
      {
        id: 2,
        name: 'Obaida Ahmed',
      },
    ]

    render(<UserList users={users} />)

    users.forEach(user => {
      const link = screen.getByRole('link', { name: user.name })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', `/users/${user.id}`)
    })
  })
})
