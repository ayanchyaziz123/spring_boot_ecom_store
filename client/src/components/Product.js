import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'


function Product({ product }) {
    var total = product && product.review && product.review.length > 0 ? product.review.reduce((accum,item) => accum + item.rating, 0) : 0;
    return (
        <div className="card my-2 p-2 text-center">
            <strong className="ct">{product.review.length > 0  ? <span class="badge badge-info"><i class="fas fa-star"></i> TOP REVIEWED</span> : <br></br> }</strong>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={`http://localhost:4000/${product.image}`} className="img-fluid ps rounded mx-auto d-block"/>
            </Link>

            <Card.Body >
                <Link to={`/product/${product._id}`} >
                    <Card.Title as="div" >
                        <strong >{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div" >
                    <div className="my-3">
                        <Rating value={total/product.review.length} text={`${product.review.length} reviews`} color={'#f8e825'} />
                    </div>
                </Card.Text>


                <Card.Text as="h6" >
                    &#2547;{product.is_offer ?  product.price - ((product.price * product.offer_percentage)/100) : product.price}
                    <br></br><span class="text-tl">{product.is_offer ? '৳' + product.price : null}</span> {product.is_offer ? '-'+product.offer_percentage+'%' : null}
                </Card.Text>
            </Card.Body>
        </div>
    )
}

export default Product
