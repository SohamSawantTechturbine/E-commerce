
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Home = ({ searchTerm }) => {
  const { usernameInput, cartdata, setcartdata } = useAuthContext();
  const [products, setProducts] = useState([]);
  JSON.parse(localStorage.getItem("cartdata"))
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
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
  }, []);

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("userData"));

    user.forEach((i) => {
      if (i.username) {
        setcartdata((prev) => ([...prev, product]));
      } else {
        navigate("/");
      }
    });
  };

  const handleProceedToCart = () => {
    navigate('/addcart');
  };

  const onCategoryFilter = (category) => {
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    const filteredProducts = savedProducts.filter((product) =>
      product.category.toLowerCase() === category.toLowerCase()
    );
    setProducts(filteredProducts);
  };

 

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Welcome to our ShopCart  Store   ..Happy shopping</h1>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-2">
            <button className='rounded-lg p-2 mb-4' onClick={() => onCategoryFilter("men's clothing")}>men's clothing</button>
            <button className='rounded-lg p-2 mb-4' onClick={() => onCategoryFilter("women's clothing")}>women's clothing</button>
            <button className='rounded-lg p-2 mb-4' onClick={() => onCategoryFilter("jewelery")}>jewelery</button>
            <button className='rounded-lg p-2 mb-4' onClick={() => onCategoryFilter("electronics")}>electronics</button>
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



