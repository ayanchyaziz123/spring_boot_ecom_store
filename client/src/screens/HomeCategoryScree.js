import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import Loaders from '../components/Loader';

const HomeCategoryScreen = ({ match }) => {
    const id = match.params.id;
    const [products, setProducts] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoadding] = useState(false);


    var total = products && products.review && products.review.length > 0 ? products.review.reduce((accum, item) => accum + item.rating, 0) : 0;

    // State with list of all checked item
   
    const [checkList, setChekList] = useState([]);
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };
    const [checked, setChecked] = useState([]);
    const baseURL = `http://localhost:4000/api/category/getFilterCategories/${id}/data?brand=${checked}`;


  

   

    // Generate string of checked items
    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";

    // Return classes based on whether item is checked
    var isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";


    useEffect(async () => {
    
        try {
            setLoadding(true);
            await axios.get(baseURL).then(res => {
                setProducts(res.data.products);
                setError('');
                setChekList(res.data.brands);
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
        
    }, [id, checked])


    return (
        <>
            <Row>
                <Col md={2} className="mr-1">

                    <div className="app mt-2">
                        <div className="checkList">
                            <div className="title">Brand</div>
                            <div className="list-container">
                                {checkList && checkList.length > 0 && checkList.map((item, index) => (
                                    <div key={index}>
                                        <input value={item} type="checkbox" onChange={handleCheck} />
                                        <span className={isChecked(item)}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            {`brand checked are: ${checkedItems}`}
                        </div>
                    </div>


                </Col>
                <Col md={9}>
                    <Row>
                        
                        {   loading ? <Loaders/> :
                            products && products.map((product, ind) => {
                                return (
                                    <>
                                        <Col md={3} className="m-0 p-0">
                                            <div className="card my-2 p-2 text-center">
                                                <strong className="ct">{product.review.length > 0 ? <span class="badge badge-info"><i class="fas fa-star"></i> TOP REVIEWED</span> : <br></br>}</strong>
                                                <Link to={`/product/${product._id}`}>
                                                    <Card.Img src={`http://localhost:4000/${product.image}`} className="img-fluid ps rounded mx-auto d-block" />
                                                </Link>

                                                <Card.Body >
                                                    <Link to={`/product/${product._id}`} >
                                                        <Card.Title as="div" >
                                                            <strong >{product.name}</strong>
                                                        </Card.Title>
                                                    </Link>

                                                    <Card.Text as="div" >
                                                        <div className="my-3">
                                                            <Rating value={total / product.review.length} text={`${product.review.length} reviews`} color={'#f8e825'} />
                                                        </div>
                                                    </Card.Text>

                                                    <Card.Text as="h6" >
                                                        &#2547;{product.is_offer ? product.price - ((product.price * product.offer_percentage) / 100) : product.price}
                                                        <br></br><span class="text-tl">{product.is_offer ? '৳' + product.price : null}</span> {product.is_offer ? '-' + product.offer_percentage + '%' : null}
                                                    </Card.Text>
                                                </Card.Body>
                                            </div>
                                        </Col>
                                    </>
                                )

                            })
                        }
                    </Row>
                </Col>
            </Row>
        </>
    )
}


export default HomeCategoryScreen;