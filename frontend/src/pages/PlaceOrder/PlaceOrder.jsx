import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

    const {getTotalCartAmount, token, food_list, cartItems, setCartItems, url } = useContext(StoreContext);

    const [method, setMethod] = useState('');

    const [data, setData] = useState({
      firstName:"",
      lastName:"",
      email:"",
      street:"",
      city:"",
      state:"",
      zipcode:"",
      country:"", 
      phone:""
    })

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const placeOrder = async (event) => {
      event.preventDefault();
      let orderItems = [];
      food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      })

      let orderData = {
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+2,
      }

      switch(method) {
          case 'stripe':
            try {
              let response = await axios.post(url + "/api/order/place", orderData, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });

              if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
              } else {
                alert("Stripe Payment Error");
              }
            } catch (error) {
              console.error("Stripe Error:", error);
              alert("Stripe Error");
            }
            break;

          case 'cod':
  try {
    const response = await axios.post(`${url}/api/order/cod`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data.success) {
      alert("Order placed successfully with Cash on Delivery");
      setCartItems({});
      navigate("/myorders"); 
    } else {
      alert("COD order failed: " + response.data.message);
    }
  } catch (error) {
    console.error("COD Error:", error);
    alert("COD order error: " + error.response?.data?.message || error.message);
  }
  break;


          default:
            alert("Please select a payment method");
        }  
    }

    const navigate = useNavigate();
    useEffect(()=> {
      if (!token) {
        navigate('/cart')
      }
      else if (getTotalCartAmount() === 0) {
        navigate('/cart')
      }
    }, [token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city}type="text" placeholder="City" />
          <input required name='state' onChange={onChangeHandler} value={data.state}type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
          </div>
          <div className="payment-methods">
            <p>Payment Method</p>
            <label>
              <input type="radio" value="stripe" name="method" onChange={(e) => setMethod(e.target.value)} />
              Stripe
            </label>
            <label>
              <input type="radio" value="cod" name="method" onChange={(e) => setMethod(e.target.value)} />
              Cash on Delivery
            </label>
          </div>
          <button type="submit" disabled={!method}>PROCEED TO PAYMENT</button>
        </div>

      </div>
    </form>
  );
};

export default PlaceOrder;
