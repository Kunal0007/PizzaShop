import { React, useState, useEffect, createContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import ProductsPage from "./ProductsPage";
import SingleProduct from './SingleProduct'
import Navbar from "./NavBar";
import Cart from "./Cart";
import Login from "./auth/login";
import Logout from "./auth/logout";
import Register from './auth/register';
import { getCart, storeCart } from './helper';
import { initialState, reducer } from './reducer/userReducer';
import CartState from "./context/cart/CartState";
import Alerts from "./Alerts";
import Profile from "./Profile";

export const UserContext = createContext();
const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 2000);
  }

  return (
    <div>
      <Router>
        <UserContext.Provider value={{ state, dispatch }}>
          <CartState showAlert={showAlert}>
            <Navbar />
            <Alerts alert={alert} />
            <Switch>
              <Route path="/" exact><Home showAlert={showAlert} /></Route>
              <Route path="/product" exact><ProductsPage showAlert={showAlert}/></Route>
              <Route path="/product/:_id" ><SingleProduct showAlert={showAlert}/></Route>
              <Route path="/register" ><Register showAlert={showAlert}/></Route>
              <Route path="/login" ><Login showAlert={showAlert}/></Route>
              <Route path="/logout" ><Logout /></Route>
              <Route path="/cart" ><Cart /></Route>
              <Route path="/profile" ><Profile/></Route>
            </Switch>
          </CartState>
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
