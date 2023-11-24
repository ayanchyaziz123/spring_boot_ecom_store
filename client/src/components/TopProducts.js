import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {Container} from 'react-bootstrap';
import Loader from './Loader'
import Message from './Message'

function TopProducts({products}) {

    


    return (<div className="bg-primary">
                <Carousel  autoPlay="true" infiniteLoop="true" useKeyboardArrows="true"  interval="3000" stopOnHover="true" className="br" >
                    
                    {products && products.map((product, ind)   => (
                        <Link to={`/product/${product._id}`}>

                        <div >
                            
                            <img src={`http://localhost:4000/${product.image}`} />
                            <p className="legend"> <h6 className="text-white">Top product {ind + 1} : {product.name} <br></br> price &#x9F3;({product.price})  </h6> </p>
                        
                        </div>
                        </Link>

                    ))}
                   
        
                </Carousel>
            </div>

    )
}

export default TopProducts
