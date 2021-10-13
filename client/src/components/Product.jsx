import { React, useContext, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import CartContext from './context/cart/CartContext';

const Product = (props) => {
    const [isAdding, setIsAdding] = useState(false);
    
    const history = useHistory();

    const { addToCart } = useContext(CartContext);

    const { product, showAlert } = props;

    const handleClick = (e) => {
        e.preventDefault();

        if (localStorage.getItem('token')) {
            addToCart(product._id, 1);

            showAlert("Added to Cart", "success");

            setIsAdding(true);

            setInterval(() => {
                setIsAdding(false);
            }, 800);
        }
        else {
            history.push("/login");
            showAlert("Please Login", "warning");
        }

    }

    // const addToCart = (event, product) => {

    //     let _cart = { ...cart };

    //     if (!_cart.items) {
    //         _cart.items = {};
    //     }

    //     if (_cart.items[product._id]) {
    //         _cart.items[product._id] += 1;
    //     } else {
    //         _cart.items[product._id] = 1;
    //     }

    //     if (!_cart.totalItem) {
    //         _cart.totalItem = 0;
    //     }

    //     _cart.totalItem += 1;

    //     setCart(_cart);
    // }

    return (
        <div>
            <li className="product__item">
                <Link to={`/product/${product._id}`}>
                    <div className="product__img grid">
                        <img src={ `${product.image}` } width="220px" height="220px" alt="" />
                    </div>
                </Link>
                <div style={{ textAlign: 'center' }}>
                    <h3 className="product__title">{product.name}</h3>
                    <span className="product__size">{product.size}</span>
                </div>

                <div className="product__info">
                    <span>₹ {product.price}</span>
                    <button disabled={isAdding} className={` add ${isAdding ? 'added' : 'none'} `} onClick={handleClick}>
                        ADD{isAdding ? 'ED' : ''}
                    </button>
                </div>
            </li>
        </div>
    )
}

export default Product
