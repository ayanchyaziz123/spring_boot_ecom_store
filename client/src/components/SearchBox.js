import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className=' shadow search-bar'
                placeholder="Search for products"
                size="sm"
            ></Form.Control>

            <Button
                type='submit'
                variant='info'
                className='p-2 search-bar-button text-white'
                size="sm"
            >
                <i class="fas fa-search"></i>
            </Button>
        </Form>
    )
}

export default SearchBox
