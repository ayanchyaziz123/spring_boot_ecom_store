import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Message from '../../components/Message';


const baseUrl = "http://localhost:4000/api/user/resetPassword";

const ResetPassword = ({ location, history }) => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');


    const form_handeler = async (e) => {
        e.preventDefault();
        if(!email)
        {
            console.log("did not give email");
            return;
        }
        else if (email) {
            const data = {
                email: email
            }
            try {
                await axios.post(baseUrl, data).then(res => {
                    setMessage(res.data.message)
                    setError('');
                })
            }
            catch (error) {
                setMessage('');
                setError(error.response && error.response.data.detail
                    ? error.response.data.detail
                    : "network error");
            }

        }
    }

    useEffect(()=>{

    }, [error, message])

        return (
            <div className="large-devices-margin">
                <Row>
                    <Col sm={4}>
                    </Col>
                    <Col sm={4}>
                        <Form onSubmit={form_handeler}>
                            <h3>Reset Password</h3>
                            {message && <Message variant='success'>{message}</Message>}
                            {error && <Message variant='danger'>{error}</Message>}

                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type='email'
                                    placeholder='Enter Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Button type="submit" size="sm" className=" btn-block">Reset</Button>
                        </Form>

                    </Col>
                    <Col sm={4}>
                    </Col>
                </Row>


            </div>
        )
    }
export default ResetPassword;