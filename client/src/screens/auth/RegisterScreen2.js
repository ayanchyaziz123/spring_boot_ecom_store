import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { register } from '../../actions/userActions'
import axios from 'axios'

const baseURL = "http://localhost:8080/user/create";

function RegisterScreen2({ location, history }) {

    const [firstName, setFirst_name] = useState('')
    const [lastName, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [profile_pic, setProfile_pic] = useState('');
    const [message, setMessage] = useState('')
    const [isOk, setIsOk] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoadding] = useState(false)
    const [success, setSuccess] = useState(false);


    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'


    // useEffect(() => {
    //     if (success) {
    //         history.push('/otp_screen');
    //     }
    // }, [success]);

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != password2) {
            setError('Passwords do not match')
        } else {
            //dispatch(register(name, email, password, mobile))
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName)
            formData.append('email', email)
            formData.append('password', password);
            formData.append('password2', password2);
            //formData.append('profile_pic', profile_pic);

            setLoadding(true)
    
                axios.post(baseURL, formData).then((response) => {
                    setError('')
                    setMessage(response.data);
                    setSuccess(true);  
                }).catch(error =>{
                    setMessage('')
                    setError(error.response && error.response.data.detail
                        ? error.response.data.detail
                        : "network error");
                })
            setLoadding(false)
            
        }
       

    }

    const handleFile = (e) =>{
        setProfile_pic(e.target.files[0]);
    }

    return (

        <FormContainer>
            <div className="card p-4">
                <h1>Register</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                {message &&  <Message variant='success'>{message}</Message>}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='f name'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            required
                            size="sm"
                            type='name'
                            placeholder='Enter first name'
                            value={firstName}
                            onChange={(e) => setFirst_name(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='l name'>
                        <Form.Label>last Name</Form.Label>
                        <Form.Control
                            required
                            size="sm"
                            type='name'
                            placeholder='Enter last name'
                            value={lastName}
                            onChange={(e) => setLast_name(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
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
                            required
                            size="sm"
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            required
                            size="sm"
                            type='password'
                            placeholder='Confirm Password'
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='profile pic'>
                        <Form.Label>profile photo</Form.Label>
                        <Form.Control
                            required
                            size="sm"
                            type='file'
                            onChange={handleFile}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button size="sm" type='submit' variant='primary' className="btn-block mt-4">
                        Register
                    </Button>

                </Form>

                <Row className='py-3'>
                    <Col>
                        Have an Account? <Link
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                            Sign In
                        </Link>
                    </Col>
                </Row>
            </div>
        </FormContainer >

    )
}

export default RegisterScreen2;
