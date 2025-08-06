import React from 'react';
import './Header.css';


const Header = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('explore-menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
  className="header"
  style={{
    height: '34vw',
    margin: '30px auto',
    background: "url('/header_img.png') no-repeat",
    backgroundSize: 'cover',
    position: 'relative',
  }}
>

      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest 
          ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate 
          your dining experience, one delicious meal at a time.
        </p>
        <button onClick={scrollToMenu} id='explore-menu'>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
