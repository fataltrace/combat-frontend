import { render, screen } from '@testing-library/react'
import HomePage from './index.jsx'

test('renders home page', () => {
  render(<HomePage />)

  const linkElement = screen.getByText(/Home page/i)

  expect(linkElement).toBeInTheDocument()
})