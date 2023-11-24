import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/auth/LoginScreen'

import ProfileScreen from './screens/auth/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

import DashboardScreen from './screens/DashboardScreen'
import RegisterScreen2 from './screens/auth/RegisterScreen2'
import ResetPassword from './screens/auth/ResetPassword';
import CategoryScreen from './screens/CategoryScreen';
import EmailVerifyScreen from './screens/auth/EmailVerifyScreen'
import ConfirmPassword from './screens/auth/ConfirmPassword'
import HomeCategoryScreen from './screens/HomeCategoryScree'



function App() {
  return (
    <Router>
      <Header />
      <br></br>


      <main className="py-3 mt-5 ">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/cat_home/:id' component={HomeCategoryScreen}  />
          <Route path='/login' component={LoginScreen} />
          <Route path='/api/user/password/verify/:id/:token' component={ConfirmPassword} />
        <Route path='/register2' component={RegisterScreen2} />
        <Route path='/api/user/verify/:id/:token' component={EmailVerifyScreen} />
        <Route path='/reset_password' component={ResetPassword} />
          <Route path='/profile' component={ProfileScreen} />
         
          <Route path='/shipping' component={ShippingScreen}/> 
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />

          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />

          <Route path='/admin/productlist' component={ProductListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />

          <Route path='/admin/orderlist' component={OrderListScreen} />
       
          
          <Route path='/dashboard' component={DashboardScreen} />
        <Route path="/category" component={CategoryScreen} />
        </Container>
          
      
      </main>
      <Footer />
    </Router>
  );
}

export default App;
