import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';




const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("menu");
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);



    const{getTotalCartAmount, token, setToken, food_list} =useContext(StoreContext);

    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            setShowSearch(false);
        }
    };

    const filteredFoods = food_list.filter(food =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const logout = () =>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        toast.success("Logout successfully!");
        
    }

    const location = useLocation();

    useEffect(() => {
    setSearchQuery("");
    }, [location.pathname]);

  return (
    <div className='navbar'>
    <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
    <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
    </ul>
    <div className="navbar-right">
        <img 
            src={assets.search_icon} 
            alt="search" 
            className="navbar-search-toggle" 
            onClick={() => setShowSearch(!showSearch)} 
        />

        {showSearch && (
        <div className="navbar-search">
            <input 
            type="text" 
            placeholder="Search food..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            />
        </div>
        )}

        {showSearch && searchQuery && (
        <div className="search-results">
            {filteredFoods.length > 0 ? (
            filteredFoods.map(food => (
                <Link 
                    to={`/food/${food._id}`} 
                    key={food._id} 
                    className="search-item" 
                    onClick={() => setShowSearch(false) && setSearchQuery("")}
                    >
                <img src={`http://localhost:4000/images/${food.image}`} alt={food.name} />
                <p>{food.name}</p>
                </Link>
            ))
            ) : (
            <p className='not-found'>No matching food items found.</p>
            )}
        </div>
        )}





        <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
            <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
            <div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className='nav-profile-dropdown'>
                    <li onClick={()=> navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr />
                    <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
            </div>
        )}
    </div>
</div>

  )
}

export default Navbar