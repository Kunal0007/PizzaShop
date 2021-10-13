import { React, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import CartContext from './context/cart/CartContext'

const Cart = () => {

  const history = useHistory();
  const { cart, addToCart, deleteItem, getCart, removeItem, getTotal, total } = useContext(CartContext)

  const decreaseItem = (e, id) => {
    e.preventDefault();
    removeItem(id, 1);
  }

  const increaseItem = (e, id) => {
    e.preventDefault();
    addToCart(id, 1);
  }

  useEffect(() => {
    
    if(localStorage.getItem('token')){
      getCart();
      getTotal();
    }
    else{
      history.push("/login");
    }
   
  }, [])

  return (

    !cart.length
      ? <img style={{
        position: 'absolute',
        left: '25%'
      }} src="/images/empty-cart.png" alt="empty-cart" />
      :
      <>
        <div className="cart__container">
          <h2 className="cart__title">Cart Items</h2>
          <ul className="grid" style={{ margin: '2rem 5rem' }}>
            {
              cart.map(product => {
                return (
                  <li key={product._id}>
                    <div className="cart__item grid">
                      <div className="item__info">
                        <img width="60px" src={product.productbyId.image} alt="" />
                        <h3>{product.productbyId.name}</h3>
                      </div>
                      <div>
                        <b>{product.productbyId.size}</b>
                      </div>
                      <div>
                        <button className="quantity__btn" onClick={(event) => { decreaseItem(event, product.id) }}>-</button>
                        <b className="quantity">{product.quantity}</b>
                        <button className="quantity__btn" onClick={(event) => { increaseItem(event, product.id) }} >+</button>
                      </div>
                      <div>
                        <b>₹ {product.productbyId.price * product.quantity}</b>
                      </div>
                      <div>
                        <button className="delete__btn" onClick={() => { deleteItem(product._id) }} >DELETE</button>
                      </div>
                      {/* <div>
                        <button onClick={() => { decreament(product._id) }} className="quantity__btn">-</button>
                        <b className="quantity">{getQuantity(product._id)}</b>
                        <button onClick={() => { increament(product._id) }} className="quantity__btn">+</button>
                      </div>
                      <div>
                        <b>₹ {getSum(product._id, product.price)}</b>
                      </div>
                      <div>
                        <button onClick={() => { handleDelete(product._id) }} className="delete__btn">DELETE</button>
                      </div> */}
                    </div>
                  </li>
                );
              })
            }
            <hr />
            <div style={{ textAlign: 'end' }}>
              <h3>Grand Total : ₹ {total}</h3>
            </div>
            {/* <div style={{ textAlign: 'end' }}>
              <button onClick={handleOrderNow} className="order__btn">ORDER NOW</button>
            </div> */}
          </ul>
        </div>
      </>
  );
};

export default Cart;