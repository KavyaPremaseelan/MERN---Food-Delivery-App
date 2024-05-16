import React, { useContext, useEffect } from 'react';
import './FoodItem.css';
import { assets, food_list } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const FoodItem = ({ id, name, price, description, image }) => {
    
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
    const display = async (id) => {
        try {
            const response = await axios.get('http://localhost:4000/api/food/list');
            // Check if response.data.data is an array
            if (Array.isArray(response.data.data)) {
                // Extract _id values from each object in the array
                const ids = response.data.data.map(item => item._id);
                for(let i=0;i<ids.length;i++)
                    {
                        if(id==ids)
                            {
                            console.log("found")
                            break;
                            }
                    }
            } else {
                console.error('Response data is not an array');
            }
        } catch (error) {
            console.error('Error fetching food list:', error);
        }
    };


    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         // try {
    //         //     const response = await axios.get('http://localhost:4000/api/food/list');
    //         //     // Check if response.data.data is an array
    //         //     if (Array.isArray(response.data.data)) {
    //         //         // Extract _id values from each object in the array
    //         //         const ids = response.data.data.map(item => item._id);
    //         //         console.log(ids); // Log the array of _id values
    //         //     } else {
    //         //         console.error('Response data is not an array');
    //         //     }
    //         // } catch (error) {
    //         //     console.error('Error fetching food list:', error);
    //         // }
    //         // console.log()
    //     };
    //     fetchData();
    // }, []);
    

    

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img src={url + "/images/" + image} alt="" className="food-item-img" />
                {!cartItems[id]
                    ?
                    <img className='add' src={assets.add_icon_white} onClick={() => addToCart(id)} alt="" />
                    : <div className='food-item-counter'>
                        <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    {/* <p>{id}</p> */}
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className='food-item-price'>${price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
