import './App.css';
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react"; 
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./Product/ProductDetails";
import Products from "./Product/Products";
import Search from "./Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import { loadUser } from "./actions/userAction";
import store from "./store";
import UserOptions from './component/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
 function App() {
  const {isAuthenticated, user} = useSelector((state) =>state.user)
  React.useEffect(() => {
    WebFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser());
  }, [])
 
  return  (
  <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user}/>}       
       <Route exact path="/" component={Home} />
       <Route exact path="/product/:id" component={ProductDetails} />
       <Route exact path="/products" component={Products} />
       <Route path="/products/:keyword" component={Products} />
       <Route exact path="/search" component={Search} />
       <Route exact path="/login" component={LoginSignUp} />
       <Route exact path="/cart" component={Cart} />
       <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
       <ProtectedRoute exact path="/account" component={Profile} /> 
       <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
       <ProtectedRoute exact path="/shipping" component={Shipping} />
       <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} /> 
       <Route 
       exact 
       path="/password/forgot" 
       component={ForgotPassword} />
       <Route exact
       path="/password/reset/:token"
       component={ResetPassword} />
       <Footer />
    </Router>
  )
} 

export default App;
