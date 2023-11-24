import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Button, InputGroup, FormControl, Form, Image } from 'react-bootstrap';
import axios from 'axios';
import AdminSideBar from '../admin_components/AdminSideBar';
import Message from '../components/Message';
import Loaders from '../components/Loader';




const baseURLCreate = 'http://localhost:4000/api/category/createCategory';
const baseURLgetAllCategories = 'http://localhost:4000/api/category/getAllCategories';

const CategoryScreen = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState();
    const [success, setSuccess] = useState('');
    const [categories, setCategories] = useState('');
    const [category, setCategory] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [catId, setCatId] = useState(null);
    const [loading, setLoadding] = useState(false);
    const admin = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${admin.token}`
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image);


        try {

            await axios.post(baseURLCreate, formData, config).then(res => {
                setCategories(res.data.categories);
                setSuccess(res.data.message);
                setError('');
            })

        }
        catch (error) {

            setSuccess('');
            setError(error.response && error.response.data.detail
                ? error.response.data.detail
                : "network error");
        }

    }

    const handlegetCategory = async (e, id) => {
        e.preventDefault();
        const baseURLgetCat = `http://localhost:4000/api/category/getCategory/${id}`;
        try {
            await axios.get(baseURLgetCat, config).then(res => {
                setCategory(res.data.category);
                setError('');
                setSuccess(res.data.message);
            })
        }
        catch (error) {
            setSuccess('');
            setError(error.response && error.response.data.detail
                ? error.response.data.detail
                : "network error");
        }
    }

    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to delete this category?')) {
            const baseURLdelete = `http://localhost:4000/api/category/deleteCategory/${id}`;
            try {
                await axios.delete(baseURLdelete, config).then(res => {
                    setCategories(res.data.categories);
                    setError('');
                    setSuccess(res.data.message);
                })
            }
            catch (error) {
                setSuccess('');
                setError(error.response && error.response.data.detail
                    ? error.response.data.detail
                    : "network error");
            }
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const baseURLgetCat = `http://localhost:4000/api/category/updateCategory/${catId}`;
        console.log(catId)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image);
        if (!name || !description) {
            alert("All fields must be filled");
            return;
        }
        try {
            await axios.put(baseURLgetCat, formData, config).then(res => {
                setCategory(res.data.updateCategory);
                setError('');
                setSuccess(res.data.message);
            })
        }
        catch (error) {
            setSuccess('');
            setError(error.response && error.response.data.detail
                ? error.response.data.detail
                : "network error");
        }

    }

    useEffect(async () => {
        try {
            setLoadding(true);
            await axios.get(baseURLgetAllCategories, config).then(res => {
                setCategories(res.data.categories);
                setError('');
                // setSuccess(res.data.message);
            })
            setLoadding(false);
        }
        catch (error) {
            setSuccess('');
            setLoadding(false);
            setError(error.response && error.response.data.detail
                ? error.response.data.detail
                : "network error");
        }
        if (category) {
            setName(category.name);
            setDescription(category.description);
            setImage(category.image);
            setIsUpdate(true);
            setCatId(category._id);
        }

    }, [category])


    return (
        <div>
            <h3>Category screen</h3>
            <Row>
                <Col md={3}>
                    <AdminSideBar />
                </Col>
                <Col>
                    {success && <Message variant='success'>{success}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    <form onSubmit={isUpdate == false ? handleCreate : handleUpdate}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter  name'
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control

                                type='text'
                                placeholder='Enter des'
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='file'
                                onChange={(e) => { setImage(e.target.files[0]) }}
                            >
                            </Form.Control>
                        </Form.Group>
                        {
                            isUpdate == false ?
                                <>
                                    <Button type="submit" variant="info " id="button-addon2" size="md">
                                        Add
                                    </Button>
                                </>
                                :
                                <>
                                    <Button type="submit" variant="info" id="button-addon2" size="md">
                                        Update
                                    </Button>
                                </>
                        }
                    </form>

                    <hr></hr>
                    {loading && <Loaders />}
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {

                                categories && categories.map((val, ind) => {
                                    return (<>
                                        <tr>
                                            <td>{ind}</td>
                                            <td>{val.name}</td>
                                            <td>  <Image src={`http://localhost:4000/${val.image}`} width={40}
                                                height={40} rounded /></td>
                                            <td><Button onClick={(e) => { handlegetCategory(e, val._id) }} size="sm" className="btn btn-warning"><i class="fas fa-edit"></i>
                                            </Button> <Button onClick={(e) => { handleDelete(e, val._id) }} className="btn btn-danger" size="sm"><i class="fas fa-trash"></i></Button></td>

                                        </tr>
                                    </>)
                                })
                            }

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}

export default CategoryScreen;