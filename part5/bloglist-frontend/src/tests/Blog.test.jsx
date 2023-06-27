/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog.jsx'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://localhost:3000',
    likes: 0,
    user: {
      username: 'testuser',
      name: 'Test User',
    },
  }
  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  screen.debug(div)
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the button calls event handler once', async () => {
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
  const mockHandler = jest.fn()

  const container = render(<Blog blog={blog} setBlogs={mockHandler} />)
  const user = userEvent.setup()
  const button = screen.getByText('like')
  screen.debug(button)
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

