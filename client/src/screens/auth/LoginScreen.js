import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { login } from '../../actions/userActions'

function LoginScreen({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (

        <Row >
            <Col md={3}>
            </Col>
            <Col>
                <div className="card">
                <FormContainer >
                    <h1>Sign In</h1>
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                size="sm"
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                size="sm"
                                type='password'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Button size="sm" type='submit' variant='primary' className="btn-block">
                            Sign In
                        </Button>
                    </Form>

                    <Row className='py-3'>
                        <Col>
                            New Customer? <Link
                                to={redirect ? `/register2?redirect=${redirect}` : '/register2'}>
                                Register
                            </Link>
                            
                        </Col>
                        <Col>
                            Recover your account <Link
                                to={redirect ? `/reset_password?redirect=${redirect}` : '/reset_password'}>
                                reset password
                            </Link>

                        </Col>
                    </Row>

                </FormContainer>
                </div>

            </Col>
            <Col md={3}>
            </Col>
        </Row>
        
      
    )
}

export default LoginScreen
