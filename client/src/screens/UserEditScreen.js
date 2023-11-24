import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Image, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetailsAdmin, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import axios from 'axios'




function UserEditScreen({ match, history }) {

    const userId = match.params.id

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [profile_pic, setProfile_pic] = React.useState('');
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [verified, setVerified] = React.useState(false);
    const[err, setErr] = useState('');
    const[message, setMessage] = useState('');
    const baseURL = "http://localhost:4000/api/user/DPchangeByAdmin"

    const dispatch = useDispatch()

    const userDetailsAdmin = useSelector(state => state.userDetailsAdmin)
    const { error, loading, user } = userDetailsAdmin

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate


    const handleVerified = (e) =>{
        if(verified) setVerified(false)
        else setVerified(true);
    }

    const handleAdmin = (e) =>{
        if(isAdmin) setIsAdmin(false);
        else setIsAdmin(true);
    }

    const handleFile = async (e) => {
        const formData = new FormData();
        const admin = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${admin.token}`
            }
        }
        formData.append('profile_pic', e.target.files[0])
        formData.append('userId', userId);
        try {
            await axios.post(baseURL, formData, config).then(res => {
                setMessage(res.data.message);
                window.location.reload();
            })
        }
        catch (error) {
            setErr(error.response && error.response.data.detail
                ? error.response.data.detail
                : "network error");
        }


    }

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            window.location.reload();
        } else {
            if (!user.firstName || user._id !== userId) {
                dispatch(getUserDetailsAdmin(userId))
            } else {
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email)
                setProfile_pic(user.profile_pic);
                setVerified(user.verified);
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, user, userId, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ userId: user._id, firstName, lastName, email, isAdmin, verified }))
    }

    return (
        <div>
            <Link to='/admin/userlist'>
                Go Back
            </Link>



            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : <>
                    <Row>
                        <Col md={4}>
                        {message && <Message variant='success'>{message}</Message>}
                        {err && <Message variant='danger'>{err}</Message>}
                        {error && <Message variant='danger'>{error}</Message>}
                            <Image src={`http://localhost:4000/${profile_pic}`} width={200}
                                height={200} rounded />

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
                        <Col md={6}>
                            <Form onSubmit={submitHandler}>

                                <Form.Group controlId='name'>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control

                                        type='first name'
                                        placeholder='Enter last name'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        disabled
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='last name'>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control

                                        type='name'
                                        placeholder='Enter last name'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        disabled
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled
                                    >
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='verified'>
                                    <Form.Check
                                        type='checkbox'
                                        label='Is verified'
                                        checked={verified}
                                        onChange={handleVerified}
                                    >
                                    </Form.Check>
                                </Form.Group>

                                <Form.Group controlId='isadmin'>
                                    <Form.Check
                                        type='checkbox'
                                        label='Is Admin'
                                        checked={isAdmin}
                                        onChange={handleAdmin}
                                    >
                                    </Form.Check>
                                </Form.Group>

                                <Button type='submit' variant='primary'>
                                    Update
                                </Button>

                            </Form>
                        </Col>
                    </Row>

                    </>}



        </div>

    )
}

export default UserEditScreen