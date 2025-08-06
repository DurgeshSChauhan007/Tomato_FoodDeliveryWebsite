import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './FoodDetails.css';

const FoodDetails = () => {
  const { id } = useParams();
  const {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    url
  } = useContext(StoreContext);

  const foodItem = food_list.find(food => food._id === id);

  if (!foodItem) return <p>Food item not found.</p>;

  const quantity = cartItems[id] || 0;

  return (
    <div className="food-details">
      <h1>{foodItem.name}</h1>
      <img src={`${url}/images/${foodItem.image}`} alt={foodItem.name} />
      <p>Price: ₹{foodItem.price}</p>
      <p>Description: {foodItem.description}</p>

      <div className="cart-controls">
        {quantity === 0 ? (
          <button className="add-btn" onClick={() => addToCart(id)}>Add to Cart</button>
        ) : (
          <div className="quantity-controls">
            <button onClick={() => removeFromCart(id)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => addToCart(id)}>+</button>
          </div>
        )}
        <Link className='go-to-cart' to={'/cart'} >Go to Cart</Link>
      </div>

      <button onClick={() => window.history.back()} className="back-btn">← Go Back</button>
    </div>
  );
};

export default FoodDetails;
