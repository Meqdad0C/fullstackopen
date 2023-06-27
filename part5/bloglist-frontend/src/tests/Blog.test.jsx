/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog.jsx'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://localhost:3000',
    likes: 0,
    id: '649931bd26441a326295a084',
    user: {
      id: '64979cafc3c2825be9fb32fd',
      username: 'ciri',
      name: 'Ciri',
    },
  }

  test('renders content', () => {
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })

  test('clicking the buttons calls event handler once', async () => {
    const mockHandler = { doLike: jest.fn(), doRemove: jest.fn() }
    render(<Blog blog={blog} handlers={mockHandler} />)
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.doLike.mock.calls).toHaveLength(2)
  })
})
