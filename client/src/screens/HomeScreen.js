import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Form, ListGroup } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import TopProducts from '../components/TopProducts'
import Category from '../components/Category'





function HomeScreen({ history }) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)


    const { error, loading, products, categories, page, pages, topProducts } = productList

    let keyword = history.location.search

    useEffect(() => {
        dispatch(listProducts(keyword))

    }, [dispatch, keyword])

    return (
        <div>


            <Row>
                <Col md={12}>
                    <TopProducts products={topProducts}/>
                </Col>
                <Col md={12}>
                    <Category categories={categories} />
                </Col>
            </Row>



            <h5 className="mt-5 mb-3 text-center">{keyword ? 'search results' : 'latest product for you'}</h5>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div className="pt-3">
                        <Row className='="p-2 bg-white'>
                           
                            <Col md={12}>


                                <Row>

                                    {products.map(product => (
                                        <Col className="m-0 p-0" key={product._id} sm={12} md={6} lg={4} xl={3} >
                                            <Product product={product} />
                                        </Col>
                                    ))}
                                </Row>
                                <Paginate page={page} pages={pages} keyword={keyword} />
                            </Col>
                        </Row>

                    </div>
            }

        </div>

    )
}

export default HomeScreen
