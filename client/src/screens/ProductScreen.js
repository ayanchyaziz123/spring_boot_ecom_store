import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Row, Col, Image, ListGroup, Button, Card, Form, Modal } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


const baseURL = "http://127.0.0.1:8000/api/products/";

function ProductScreen({ match, history }) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(null)
    // const [predictPrice, setPredict_price] = useState(null);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
   

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product, reviews } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,


        
    } = productReviewCreate

    const product_id = product ? product._id : null;
    var total = product && product.review && product.review.length > 0 ? product.review.reduce((accum,item) => accum + item.rating, 0) : 0;
    
    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match, successProductReview, reviews])

    const addToCartHandler = () => {
        console.log("product Ids", match.params.id)
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
            rating,
            comment
        }
        ))
    }
    console.log("Product ", product);
    console.log("proD ", product);
    return (
        <div>
            
          
               
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    
                            
                                            <Image style={{maxHeight: '400px'}} src={`http://localhost:4000/${product.image}`} alt={product.name} fluid rounded />
                                      
                                    <Card className="p-2 mt-4 border border-white">
                                        <div>Description: {ReactHtmlParser(product.description)}</div>
                                    </Card>
                                    <diV className="mt-5 mb-5">

                                    </diV>
                                   
                                    <diV className="mt-5 mb-5">

                                    </diV>
                                </Col>


                                <Col md={4}>
                                   
                                    <ListGroup variant="primary">
                                    <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Rating value={total / product.review ? product.review.length : null} text={`${product.review ? product.review.length : null} reviews`} color={'#f8e825'} />
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <span className="h3">&#2547;{product.is_offer ? product.price - ((product.price * product.offer_percentage) / 100) : product.price}</span>
                                            <br></br><span class="text-tl">{product.is_offer ? '৳' + product.price : null}</span> <b>{product.is_offer ? '-' + product.offer_percentage + '%' : <br></br>}</b>
                                        <br></br>


        

                                        </ListGroup.Item>

                                       
                                    

                                        <ListGroup.Item>
                                            <p>Name: {product.name}</p>
                                            <hr></hr>
                                            <p>Category: {product.category && product.category.name}</p>
                                            <hr></hr>
                                            <p>Brand: {product.brand}</p>
                                            <hr></hr>
                                           
                                        </ListGroup.Item>
                                    </ListGroup>
                                   
                                </Col>

                           


                                <Col md={2}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>৳ {product.price}</strong>
                                
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {

                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}


                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className='btn-block'
                                                    disabled={product.countInStock == 0}
                                                    size="sm"
                                                    type='button'>
                                                    Add to Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                  
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                   
                                    <Card className="p-2 border border-white">
                                   <h4>Reviews</h4>
                                    {reviews &&  reviews.length === 0 && <Message variant='info' size="sm">No Reviews</Message>}

                                    <ListGroup variant='flush'>
                                        {reviews && reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.user.firstName}</strong>
                                                <Rating value={review.rating} color='#f8e825' />
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}

                                        <ListGroup.Item>
                                            <h4>Write a review</h4>

                                            {loadingProductReview && <Loader />}
                                            {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                            size="sm"
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Review</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                            size="sm"
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='primary'
                                                        size="sm"
                                                        className='btn btn-success'
                                                    >
                                                        Submit
                                                    </Button>
                                                    
                                                    {/* <Button 
                                                      variant='info' size='sm'> add
                                                    </Button> */}

                                                </Form>
                                            ) : (
                                                    <Message size="sm" variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                                )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                    </Card>
                                    <Link to='/'  className='btn btn-primary my-3  btn-sm'>Go Back</Link>  
                                </Col>
                            </Row>
                        </div>
                    )

            }

           
        </div >
    )
}

export default ProductScreen
