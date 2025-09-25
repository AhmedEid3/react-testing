import { render, screen } from '@testing-library/react'

import ProductImageGallery from '../../src/components/ProductImageGallery'

describe('ProductImageGallery', () => {
  it('should not render the component when no images', () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('should render a list on images', () => {
    const images = ['https://placehold.co/200', 'https://placehold.co/300', 'https://placehold.co/400']

    render(<ProductImageGallery imageUrls={images} />)

    const imageList = screen.getAllByRole('img')

    expect(imageList).toHaveLength(3)
    imageList.forEach((image, index) => {
      expect(image).toHaveAttribute('src', images[index])
    })
  })
})
