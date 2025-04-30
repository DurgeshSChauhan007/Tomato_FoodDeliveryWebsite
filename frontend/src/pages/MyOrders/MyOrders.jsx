import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  // Fetch orders when token is available
  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`, 
        {},
        { headers: { token } } // Authorization header
      );
      setData(response.data.data); // Store fetched orders
    } catch (error) {
      console.error('Error fetching orders:', error.response?.data || error.message);
      alert('Failed to fetch orders. Please try again.');
    }
  };

  useEffect(() => {
    if (token) fetchOrders(); // Fetch orders if token exists
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data?.map((order, index) => (
          <div key={index} className="my-order-order">
            <img src={assets.parcel_icon} alt="Order Parcel Icon" />
            <p>
              {order.items.map((item) => `${item.name} x ${item.quantity}`).join(', ')}
            </p>
            <p>${order.amount}</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span>
              <b>{order.status}</b>
            </p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
