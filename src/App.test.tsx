import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Stage 0 smoke app', () => {
  it('shows the first fixed question and four options', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'EULERALLY' })).toBeInTheDocument()
    expect(screen.getByText('2 + 3 = ?')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /^[A-D]\. / })).toHaveLength(4)
  })

  it('marks a wrong answer, reveals the correct one, and locks the question', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'A. 4' }))

    expect(screen.getByRole('status')).toHaveTextContent('Wrong')
    expect(screen.getByText('Correct answer: 5')).toBeInTheDocument()

    const buttons = screen.getAllByRole('button', { name: /^[A-D]\. / })
    for (const button of buttons) expect(button).toBeDisabled()

    await user.click(buttons[1]!)
    expect(screen.getByRole('status')).toHaveTextContent('Wrong')
  })

  it('shows the second question after Next and resets the interaction', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'A. 4' }))
    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(screen.getByText('7 × 8 = ?')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeEmptyDOMElement()

    await user.click(screen.getByRole('button', { name: 'B. 56' }))
    expect(screen.getByRole('status')).toHaveTextContent('Correct')
    expect(screen.queryByText(/Correct answer:/)).not.toBeInTheDocument()
  })

  it('moves focus to the new question prompt after Next', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'A. 4' }))
    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(screen.getByText('7 × 8 = ?')).toHaveFocus()
  })

  it('announces the result and the correct answer in a single status region', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'A. 4' }))

    const statuses = screen.getAllByRole('status')
    expect(statuses).toHaveLength(1)
    expect(statuses[0]).toHaveTextContent('Wrong')
    expect(statuses[0]).toHaveTextContent('Correct answer: 5')
  })
})
