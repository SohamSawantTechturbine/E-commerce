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


  let slides = [
    "https://m.media-amazon.com/images/I/61aURrton0L._SX3000_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/Apr/Shoes/Unrec/Canara/Alls/3000pc._CB558905583_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Consumables/GW/Mar18/QC/PC_GW_Hero_3000x1200_01._CB579486410_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Unrec/TallHero_3000X1200_Unrec._CB593464763_.jpg"
  ];

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
    console.log(savedProducts)
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
    
    <div className="flex justify-center items-center  bg-yellow-50 shadow-lg  ">
  

  
  <div className="max-w-7.5 xl mx-auto px-4 ">  
  <Coursel className="max-h-4 w-full rounded-lg border" slides={slides} />
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
      <div key={product.id} className="bg-white border border border-black rounded-lg overflow-hidden shadow-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 duration-300 ... ">
        <img src={product.image} alt={product.title} className="w-full h-56 object-cover " />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
          <h4 p className='text-black mb-2'>price:- ${product.price}</h4>
          <p className="text-gray-600 mb-2">category:-{product.category}</p>
          <p className="text-gray-600">description:-{product.description}</p>
          <div className='flex '>
           <p className='mt-2'> Rating :- </p>
      {[...Array(Math.floor(product.rating.rate))].map((_, index) => (
        <img key={index}  className="w-15 h-10 py-2"src="data:image/png;base64,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" alt="star" />
      ))}
    </div>
          {/* <div className='flex'>
          <h3>price</h3>
          <h4 className="line-through" style={{ textDecorationColor: 'red' }}>${product.price}</h4>
          <p className="text-gray-600 mb-2 ">{discountprice(product.price)}</p>
         </div> */}
         
          <button className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-30 mt-5' onClick={() => handleAddToCart(product)}>Add To Cart</button>
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