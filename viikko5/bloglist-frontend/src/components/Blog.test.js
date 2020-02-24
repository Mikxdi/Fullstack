import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders some content', () => {
    const blog = {
        title: 'alfa',
        author: 'j. hallis',
        url: 'epätoivo.fi',
        likes: '12',
        user: {
            name: "pekka"
        } 
    }
    const user = {
        name: 'pekka'
    }
    const component = render(
        <Blog blog={blog} user={user}/>
    )

    expect(component.container).toHaveTextContent(
        'alfa'
    )
    expect(component.container).toHaveTextContent(
        'j. hallis'
      )
})

test('Click renders all information', async () => {
    const blog = {
        title: 'alfa',
        author: 'j. hallis',
        url: 'epätoivo.fi',
        likes: '12',
        user: {
            username: "pekka"
        } 
    }
    const user = {
        name: 'pekka'
    }
    const component = render(
        <Blog blog={blog} user={user}/>
    )

    const button = component.getByText('näytä lisätietoja')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'alfa'
    )
    expect(component.container).toHaveTextContent(
        'j. hallis'
    )

    expect(component.container).toHaveTextContent(
        'epätoivo.fi'
    )
    expect(component.container).toHaveTextContent(
        '12'
    )
})

test('Click calls event handler twice', async () =>{
    const blog = {
        title: 'alfa',
        author: 'j. hallis',
        url: 'epätoivo.fi',
        likes: '12',
        user: {
                username: "pekka"
        } 
    }

    const mockHandler = jest.fn()
    const user = {
        name: 'pekka'
    }
    const component = render(
      <Blog blog={blog} handleLikeClick={mockHandler} user = {user}/>
    )
    const button1 = component.getByText('näytä lisätietoja')
    fireEvent.click(button1)
  
    const button2 = component.getByText('tykkää')
    fireEvent.click(button2)
    fireEvent.click(button2)
  
    expect(mockHandler.mock.calls.length).toBe(2)
})
