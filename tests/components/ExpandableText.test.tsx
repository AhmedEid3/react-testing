import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ExpandableText from '../../src/components/ExpandableText'

describe('ExpandableText', () => {
  const limit = 255
  const longText = 'a'.repeat(limit + 1)
  const truncatedText = longText.slice(0, limit) + '...'

  it('should not render the article if the text is an empty', () => {
    const { container } = render(<ExpandableText text='' />)

    expect(container).toBeEmptyDOMElement()
  })

  it('should render the full text article if the text less than or equal to the limit', () => {
    const shortText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, laudantium?'
    render(<ExpandableText text={shortText} />)

    const article = screen.getByRole('article')

    expect(article).toBeInTheDocument()
    expect(article).toHaveTextContent(shortText)
  })

  it('Should render initially truncated text with show more button', () => {
    render(<ExpandableText text={longText} />)

    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()
    expect(article).toHaveTextContent(truncatedText)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/show more/i)
  })

  it('Should render full text with show less button when click to show more button and vice versa', async () => {
    render(<ExpandableText text={longText} />)

    const button = screen.getByRole('button')
    const user = userEvent.setup()
    await user.click(button)

    const article = screen.getByRole('article')

    expect(article).toHaveTextContent(longText)
    expect(button).toHaveTextContent(/show less/i)

    await user.click(button)
    expect(article).toHaveTextContent(truncatedText)
    expect(button).toHaveTextContent(/show more/i)
  })
})
