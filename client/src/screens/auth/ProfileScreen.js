import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table, Container, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import { listMyOrders } from '../../actions/orderActions'
import axios from 'axios'

const baseURL = "http://localhost:4000/api/user/DPchange";

function ProfileScreen({ history }) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [profile_pic, setProfile_pic] = useState('');
    const [err, setErr] = useState('');

    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success, wrong, msg } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const handleFile = (e) => {

        const formData = new FormData();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        formData.append('profile_pic', e.target.files[0])
        axios.post(baseURL, formData, config).then((res) => {
            const data = res.data.file_name;
            // Get the existing data
            var existing = localStorage.getItem('userInfo');

            // If no existing data, create an array
            // Otherwise, convert the localStorage string to an array
            existing = existing ? JSON.parse(existing) : {};
            // Add new data to localStorage Array
            existing['profile_pic'] = data;
            // Save back to localStorage
            localStorage.setItem('userInfo', JSON.stringify(existing));
            setProfile_pic(data);
            window.location.reload();
        }).catch(error => {
            setErr(error.response && error.response.data.detail
                ? error.response.data.detail
                : "network error");
        })

    }
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {

            if (!user || !user.firstName || success || userInfo._id !== user._id) {

                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())

            } else {

                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);
                setProfile_pic(user.profile_pic);
            }
        }

    }, [dispatch, history, user, userInfo, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (!password) {
            setMessage('did not give password')
        } else {
            dispatch(updateUserProfile({
                'firstName': firstName,
                'lastName': lastName,
                'email': email,
                'password': password,
            }))
            setMessage('')
        }

    }
    return (
        <div>
            <Row>
                <Col md={2}>

                    <Image src={`http://localhost:4000/${profile_pic}`} width={140}
                        height={140} rounded />

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
                </Col>
                <Col md={3}>
                    <h2 >Profile</h2>

                    {message && <Message variant='danger'>{message}</Message>}
                    {msg && <Message variant='success'>{msg}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {wrong && <Message variant='danger'>{wrong}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                type='name'
                                placeholder='Enter name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                size="sm"
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='name'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                required
                                type='name'
                                placeholder='Enter name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                size="sm"
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                required
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                disabled
                                onChange={(e) => setEmail(e.target.value)}
                                size="sm"
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <span>You cant change password here. this field is just required for updating others field</span>
                            <Form.Label>Password</Form.Label>
                            <Form.Control

                                type='password'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                size="sm"
                            >
                            </Form.Control>
                        </Form.Group>




                        <Button type='submit' variant='primary' size="sm">
                            Update
                        </Button>

                    </Form>
                </Col>

                <Col md={7}>
                    <h2 >My Recent Orders</h2>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant='danger'>{errorOrders}</Message>
                    ) : (
                        <Table striped responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>৳{order.totalPrice}</td>
                                        <td>{order.isPaid ? <i className='fas fa-check' style={{ color: 'green' }}></i> : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className='btn-sm'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default ProfileScreen