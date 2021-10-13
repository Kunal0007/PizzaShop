import { React, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import CartContext from './context/cart/CartContext';
import { UserContext } from './App';

const Navbar = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  }

  const { cart } = useContext(CartContext);
  const { state, dispatch } = useContext(UserContext);

  return (
    <>
      <header className="header" id="header">
        <div className="nav container">
          <Link to="/" className="nav__logo">SHOP</Link>

          <div className="nav__menu">
            <ul className="nav__list grid">
              <li className="nav__item">
                <Link to="/" className="nav__link">Home</Link>
              </li>
              <li className="nav__item">
                <Link to="/product" className="nav__link">Product</Link>
              </li>
              {
                !localStorage.getItem('token') ?
                  <>
                    <li className="nav__item">
                      <Link to="/register" className="nav__link">Register</Link>
                    </li>
                    <li className="nav__item">
                      <Link to="/login" className="nav__link" >Login</Link>
                    </li>
                  </>
                  :
                  <>
                    <li className="nav__item">
                      <Link to="/logout" onClick={handleLogout} className="nav__link" >Logout</Link>
                    </li>
                  </>
              }
              <li className="nav__item">
                <Link to="/cart">
                  <div className="nav__link cart">
                    <span className="material-icons-outlined" style={{ verticalAlign: 'bottom' }}>shopping_cart</span>
                    {/* <img src="/images/cart.png" style={{ width: '1.2rem', verticalAlign: 'bottom' }} alt="cart-icon" /> */}
                  </div>
                </Link>
              </li>
              {
                !localStorage.getItem('token') ?
                  <></> :
                  <>
                    <li className="nav__item">
                      <Link to="/profile">
                        <span className="material-icons-outlined nav__link" style={{ fontSize: '2rem', verticalAlign: 'bottom' }}>
                          account_circle
                        </span>
                      </Link>
                    </li>
                  </>
              }
            </ul>
          </div>

        </div>
      </header>
    </>
  );
};

export default Navbar;