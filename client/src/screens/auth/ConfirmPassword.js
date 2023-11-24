import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Message from '../../components/Message';



const ConfirmPassword = ({ match, history }) => {

    const id = match.params.id;
    const token = match.params.token;
    const baseURL = `http://localhost:4000/api/user/resetPassword_verification/${id}/${token}`;
    const baseURL2 = `http://localhost:4000/api/user/updatePassword/${id}/${token}`;
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [userInfo, setUser_info] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState('');


    if (userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        history.push('/')
        window.location.reload();
    }

    const passwordHandle = async (e) => {
        e.preventDefault()
        try {
            const data = {
                password: password,
                password2: password2,
            }
            await axios.put(baseURL2, data).then(res => {
                setUser_info(res.data.userInfo)
            })
        }
        catch (error) {
            setError(error.response && error.response.data.detail
                ? error.response.data.detail
                : "network error");
        }
    }



    useEffect(async () => {
        try {
            await axios.get(baseURL).then(res => {
                setIsValid(true);
            })
        }
        catch (error) {
            setError(error.response && error.response.data.detail
                ? error.response.data.detail
                : "network error");
        }
    }, [id, token, userInfo])

    return (
        <div>

            {
                isValid == true ?
                    <>
                        <Row>
                            <Col sm={4}>
                            </Col>
                            <Col sm={4}>
                                <h5>Confirm your new password</h5>
                                {error && <Message variant='danger'>{error}</Message>}
                                <form onSubmit={passwordHandle}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type='password'
                                    placeholder='Enter password'
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </Form.Control>

                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type='password'
                                    placeholder='Enter confirm password'
                                    onChange={(e) => setPassword2(e.target.value)}
                                >
                                </Form.Control>

                                <Button type="submit" size="sm" className="btn-block">Submit</Button>
                                </form>

                            </Col>
                            <Col sm={4}>
                            </Col>
                        </Row>
                    </>

                    :
                    <>
                     {error && <Message variant='danger'>{error}</Message>}
                    </>
            }


        </div>
    )
}

export default ConfirmPassword;