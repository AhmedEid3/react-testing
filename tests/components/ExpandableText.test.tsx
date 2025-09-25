import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ExpandableText from '../../src/components/ExpandableText'

describe('ExpandableText', () => {
  it('should render full article when it not exceeded the limit', () => {
    const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, tempora.'
    render(<ExpandableText text={text} />)

    const article = screen.getByRole('article')

    expect(article).toBeInTheDocument()
    expect(article).toHaveTextContent(text)
  })

  it('should render short article and show more button when the article exceeded the limit', () => {
    const text =
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint omnis quasi voluptas quod dolor corporis officia sed nam minus! Facere commodi repellendus doloribus eligendi consequatur culpa maiores. Eligendi, odit cumque possimus recusandae magnam ex neque harum atque nam quidem sequi sed numquam nostrum similique nisi mollitia quae ut exercitationem ab vero. Fugit iure laudantium exercitationem quibusdam sequi! Adipisci voluptatem, neque nobis dolor, corrupti magni sed nesciunt modi accusantium voluptatibus nemo est possimus totam velit, officia ex iste? A quis sint vel, veniam quidem eligendi. Odit laudantium qui blanditiis, quae vitae et impedit nostrum vel magni iusto, exercitationem asperiores ut architecto.'
    render(<ExpandableText text={text} />)

    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/show more/i)
  })

  it('should render full article and show less button when the button clicked', async () => {
    const text =
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint omnis quasi voluptas quod dolor corporis officia sed nam minus! Facere commodi repellendus doloribus eligendi consequatur culpa maiores. Eligendi, odit cumque possimus recusandae magnam ex neque harum atque nam quidem sequi sed numquam nostrum similique nisi mollitia quae ut exercitationem ab vero. Fugit iure laudantium exercitationem quibusdam sequi! Adipisci voluptatem, neque nobis dolor, corrupti magni sed nesciunt modi accusantium voluptatibus nemo est possimus totam velit, officia ex iste? A quis sint vel, veniam quidem eligendi. Odit laudantium qui blanditiis, quae vitae et impedit nostrum vel magni iusto, exercitationem asperiores ut architecto.'
    render(<ExpandableText text={text} />)

    const button = screen.getByRole('button')
    const user = userEvent.setup()
    await user.click(button)
    expect(button).toHaveTextContent(/show less/i)

    const article = screen.getByRole('article')
    expect(article).toHaveTextContent(text)
  })
})
