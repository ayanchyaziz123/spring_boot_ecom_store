import {React, useState, useEffect} from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import AdminSideBar from '../admin_components/AdminSideBar';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

const baseURL = "http://localhost:4000/api/product/dashboard";






const DashboardScreen = ({history}) =>{

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const [newCustomers, setNewCustomers] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [error, setError] = useState(false);
    const [profit, setProfit] = useState(null);

    useEffect(() => {

        if (!userInfo) {
                history.push('/login')
        }
        else{
            if(!userInfo.isAdmin)
            {
                history.push('/')
            }
            axios.get(baseURL).then(response=>{
                setNewCustomers(response.data.recent_users);
                setPendingOrders(response.data.pending_orders);
            })
        }

    }, [history, userInfo])

    const data = profit;
 


   


    return(
        <div>
            <h3>Dashboard Screen</h3>
            <Row >
                <Col md={3}>
                    <AdminSideBar/>
                </Col>
                <Col md={4}>
                    <Card
                        bg="info"
                        className="mb-2 text-white text-center"
                    >
                        <Card.Header className="nav-text"><i class="fas fa-shopping-cart"></i> Pending Orders </Card.Header>
                        <Card.Body>
                            <Card.Title>{pendingOrders} </Card.Title>
                
                        </Card.Body>
                    </Card>
                    <hr></hr>
               
                </Col>
                <Col md={4}>
                    <Card
                        bg="dark"
                        className="mb-2 text-white text-center"
                    >
                        <Card.Header className="nav-text"><i class="fas fa-users"></i> Users</Card.Header>
                        <Card.Body>
                            <Card.Title>{newCustomers && newCustomers} </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>

              
            </Row>
        </div>
    )
}

export default DashboardScreen;