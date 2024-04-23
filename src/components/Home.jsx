import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context';
import axios from 'axios';
import { useNavigate, useLocation,Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const Home = ({ searchTerm }) => {
  const { usernameInput, cartdata, setcartdata,products,setProducts ,isLogin,setIsLogin} = useAuthContext();
  
  useEffect(() => {
    console.log("Updated cartdata:", cartdata);
  }, [cartdata]);
  
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.search ? new URLSearchParams(location.search).get('category') : null;
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:9000/product-data');
  //       setProducts(response.data);
  //       localStorage.setItem('products', JSON.stringify(response.data));
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post('http://localhost:9000/product-data');
        setProducts(response.data);
        localStorage.setItem('products', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      fetchProducts();
    }
    const token = localStorage.getItem("token");
    console.log(token)
   
    if (token) {
      setIsLogin(true);
   
        // navigate("/home")
      }
  }, []);
 
  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    //console.log(isLogin);

    if (isLogin) {
      fetch("http://localhost:9000/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ product }),
     })
        .then((response) => {
          console.log(response.cart)
          if (response.ok) {
            // Item added successfully
            return response.json();
         
           }
        }).then((data) => {
          // Update the cart data in the frontend
          console.log( data.cart)
          setcartdata((prev) => [...prev, data.cart]);
          console.log(cartdata)
      })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
        });
    } else {
      // User is not authenticated, redirect them to the login page
      navigate("/");
    }
   console.log(cartdata)
  //  console.log(product);
     };


      const handleProceedToCart = () => {
    navigate('/addcart');
  };
  
  useEffect(() => {
    // Filter products based on category query parameter
    if (category) {
      const savedProducts = JSON.parse(localStorage.getItem('products'));
      const filteredProducts = savedProducts.filter((product) =>
        product.category.toLowerCase() === category.toLowerCase()
      );
      setProducts(filteredProducts);
    }
  }, [category]);

  return (
    <> 
      <div className="flex justify-center items-center h-full">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Welcome to our ShopCart  Store   ....Happy shopping</h1>
       
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-2">
            <button className='rounded-lg p-2 mb-4' onClick={() => navigate(`/home?category=men's clothing`)}>men's clothing</button>
            <button className='rounded-lg p-2 mb-4' onClick={() => navigate(`/home?category=women's clothing`)}>women's clothing</button>
            <button className='rounded-lg p-2 mb-4' onClick={() => navigate('/home?category=jewelery')}>jewelery</button>
            <button className='rounded-lg p-2 mb-4' onClick={() => navigate('/home?category=electronics')}>electronics</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter((product) =>
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
                  <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
                  <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                  <p className="text-gray-600 mb-2">${product.price}</p>
                  <p className="text-gray-600 mb-2">{product.category}</p>
                  <p className="text-gray-600">{product.description}</p>
                  <br />
                  <button className='text-gray-600 bg-red-600' onClick={() => handleAddToCart(product)}>Add To Cart</button>
                </div>
              ))}
          </div>
          <button className="text-gray-600 bg-red-600 mt-4" onClick={handleProceedToCart}>Proceed to Cart</button>
        </div>
      </div>
     
      
    </>
  );
};