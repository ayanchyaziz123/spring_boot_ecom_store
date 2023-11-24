import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Category = ({ categories }) => {
    console.log("cat ", categories)
    return (
        <>  <h5 className="mt-4 mb-4 text-center">categories</h5>
        <Row className='p-0 bg-secondary  p-2 bg-white'>
            {
                categories && categories.map((val, ind) => {
                    return (
                        <>
                            <Col md={2} className='p-0 m-0 cardd'>

                                <div className="card text-center">

                                    <Link to={`/cat_home/${val._id}`}>
                                        <Card.Img src={`http://localhost:4000/${val.image}`} style={{maxHeight: '80px', maxWidth: '80px', minHeight: '80px', minWidth: '80px'}} className="mt-1"/>
                                    </Link>

                                    <Card.Body >
                                        <Link to={`/cat_home/${val._id}`} >
                                            <Card.Title as="div" >
                                                <strong >{val.name}</strong>
                                            </Card.Title>
                                        </Link>

                                    </Card.Body>
                                </div>

                            </Col>
                        </>
                    )
                })
            }
        </Row>
        </>
    )
}
export default Category;