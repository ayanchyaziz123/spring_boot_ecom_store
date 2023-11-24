import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Row, Col, ListGroup, Image, Card, InputGroup, FormControl, Form, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen({ history }) {

    const [coupon_code, setCoupon_code] = useState('')
    const [coupon_code_status, setCoupon_code_status] = useState(0)
    const [user_id, setUser_id] = useState()
    const [total_discount, setTotal_discount] = useState(0)
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate
    const [count, setCount] = useState(0);
    const [coinPrice, setCoinPrice] =  useState(0);
    const [userCoins, setUserCoins] = useState(0);
    const [leftCoins, setLeftCoins] = useState(0);
    const [coupon_id, setCoupon_id] = useState(0);


    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + (item.offer_percentage ? parseFloat(item.price - ((item.price * item.offer_percentage) / 100)).toFixed(2) : item.price) * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.050) * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2) - total_discount - (count * 10);

  

    if (!cart.paymentMethod) {
        history.push('/payment')
    }

    useEffect(() => {
        
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [[success, history]])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,

        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>

                           
                            


                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Shipping</h3>

                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address},  {cart.shippingAddress.city}
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.phone},
                                {'  '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            
                            <h3>Payment Method</h3>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {cart.cartItems.length === 0 ? <Message variant='info'>
                                Your cart is empty
                            </Message> : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={`http://localhost:4000/${item.image}`} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} X &#2547; {item.offer_percentage ? parseFloat(item.price - ((item.price * item.offer_percentage) / 100)).toFixed(2) : item.price} = &#2547; {(item.qty * (item.offer_percentage ? parseFloat(item.price - ((item.price * item.offer_percentage) / 100)).toFixed(2) : item.price)).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4} >
                    <Card className="mb-2 p-2 bg-info">
                        
                    </Card>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>Order Summary</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>&#2547; {cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {/* <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>&#2547; {cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item> */}

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>&#2547; {cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>


            

                            
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>&#2547; {cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                    size="sm"
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
