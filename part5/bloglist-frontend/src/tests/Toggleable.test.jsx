/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Toggleable from '../components/Toggleable.jsx'
import userEvent from '@testing-library/user-event/index'
import React from 'react'

describe('<Toggleable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Toggleable buttonLabel="show...">
        <div className="testDiv">Toggleable content</div>
      </Toggleable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('Toggleable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})
