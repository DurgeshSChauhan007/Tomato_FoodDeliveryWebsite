import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Function to fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list"); // Fixed the URL
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching orders");
    }
  };

  // Handler for changing order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      });

      if (response.data.success) {
        toast.success("Order status updated successfully");
        await fetchAllOrders(); // Refresh orders after status update
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]); // Add dependency array to fetch orders when URL changes

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    return index === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `;
                  })}
                </p>
                <p className="order-item-name">
                  {`${order.address.firstName} ${order.address.lastName}`}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ", "}</p>
                  <p>{`${order.address.city}, ${order.address.state}, ${order.address.zipcode}`}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders available.</p> // Fallback message if no orders exist
        )}
      </div>
    </div>
  );
};

export default Orders;
