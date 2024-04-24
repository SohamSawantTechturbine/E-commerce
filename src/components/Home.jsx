import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Coursel from './Couresel/Coursel';

toast.configure();

export const Home = ({ searchTerm }) => {
  const { usernameInput, cartdata, setcartdata, products, setProducts, isLogin, setIsLogin } = useAuthContext();

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
    // console.log(product);

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
          console.log(data.cart)
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

  function discountprice (price){
     const dicount=price-5;
     return dicount;

  }
  return (
    <>
    
    <div className="flex justify-center items-center h-full bg-yellow-50 shadow-lg  ">
  

  
  <div className="max-w-9xl mx-auto px-4 ">  

    <h1 className="text-3xl font-bold mb-8 ml-20">Welcome to our ShopCart Store ....Happy shopping</h1>
 
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-2">
      <button className='rounded-lg p-2 mb-4 bg-red-100' onClick={() => navigate(`/home?category=men's clothing`)}>men's clothing</button>
      <button className='rounded-lg p-2 mb-4 bg-red-100' onClick={() => navigate(`/home?category=women's clothing`)}>women's clothing</button>
      <button className='rounded-lg p-2 mb-4 bg-red-100' onClick={() => navigate('/home?category=jewelery')}>jewelery</button>
      <button className='rounded-lg p-2 mb-4 bg-red-100' onClick={() => navigate('/home?category=electronics')}>electronics</button>
    </div>
   
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:col-span-10 h-45 w-45">
  {products
    .filter((product) =>
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((product) => (
      <div key={product.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 duration-300 ... ">
        <img src={product.image} alt={product.title} className="w-full h-56 object-cover " />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
          <p p className='text-gray-600 mb-2'>price:- ${product.price}</p>
          <p className="text-gray-600 mb-2">category:-{product.category}</p>
          <p className="text-gray-600">description:-{product.description}</p>
          {/* <div className='flex'>
          <h3>price</h3>
          <h4 className="line-through" style={{ textDecorationColor: 'red' }}>${product.price}</h4>
          <p className="text-gray-600 mb-2 ">{discountprice(product.price)}</p>
         </div> */}
         
          <button className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={() => handleAddToCart(product)}>Add To Cart</button>
        </div>
      </div>
    ))}
</div>

<div className="flex justify-center">
<button className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-full mt-4 lg:col-span-10 mr-50" onClick={handleProceedToCart}>Proceed to Cart</button>
</div>

  </div>
  
</div>


    </>
  );
};