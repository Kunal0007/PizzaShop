import React, { useState } from "react";
import CartContext from "./CartContext";


const CartState = (props) => {

    const host = "http://localhost:5000";

    const initialCart = [];

    const [cart, setCart] = useState(initialCart);

    const [total, setTotal] = useState(0);

    const getCart = async () => {
        const response = await fetch(`${host}/api/cart/fetchallItems`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        // console.log(json);
        setCart(json);
    }

    const addToCart = async (id, quantity) => {
        console.log("Adding new item to cart");

        const response = await fetch(`${host}/api/cart/addItem`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ id, quantity }) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        getCart();
        getTotal();
    }

    const removeItem = async (id, quantity) => {
        console.log("Removing new item to cart");

        const response = await fetch(`${host}/api/cart/removeItem`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ id, quantity }) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        getCart();
        getTotal();
        // const json = await response.json();
        console.log(json);

    }

    const getTotal = async () => {
        const response = await fetch(`${host}/api/cart/totalSum`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        // console.log(json);
        // console.log({ total: json });
        setTotal(json);
        console.log(total);
    }

    const deleteItem = async (id) => {

        const response = await fetch(`${host}/api/cart/deleteitem/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);

        console.log("Deleting item with id " + id);
        props.showAlert("Item Deleted", "info");
        const newCart = cart.filter((item) => { return item._id !== id });
        setCart(newCart);
    }

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, deleteItem, getCart, removeItem, getTotal, total }} >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartState

