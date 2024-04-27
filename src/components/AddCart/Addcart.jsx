import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Addcart() {
  const { cartdata, setcartdata, totalPrice, setTotalPrice,setIsLogin,isLogin } = useAuthContext();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  
  const addQuantity = async (productId) => {
    const product = cartdata.find((product) => product.productId === productId);
    try {
      const updatedQuantities = { ...quantities };
  //    console.log(updatedQuantities)
      updatedQuantities[productId] = (updatedQuantities[productId] || product.quantity) + 1;
      setQuantities(updatedQuantities);
      updateTotalPrice(cartdata, updatedQuantities);

      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:9000/addQuantity/${productId}`, { quantity: updatedQuantities[productId] }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };
  const removeQuantity = async (productId) => {
    const product = cartdata.find((product) => product.productId === productId);
    
    if (product.quantity > 1) {
      try {
        const updatedQuantities = { ...quantities };
        
        updatedQuantities[productId] = (updatedQuantities[productId] || product.quantity) - 1;
        setQuantities(updatedQuantities);
        updateTotalPrice(cartdata, updatedQuantities);
  
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:9000/removeQuantity/${productId}`, { quantity: updatedQuantities[productId] }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  };
  
  
  const updateTotalPrice = (cart) => {
   // console.log(cart)
   // console.log(quantities)
    const totalPrice = cart?.reduce((acc, product) => {
      const productPrice = parseFloat(product.productPrice);
      const quantity = product.quantity 
      return acc + productPrice * quantity;
    }, 0);
    setTotalPrice(totalPrice);
  };

  useEffect(() => {

    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9000/getcartdata', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setcartdata(response?.data?.cart);
        setQuantities(response.data.quantities);
        updateTotalPrice(response.data.cart);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
  
    fetchCartData();
  }, [removeQuantity,addQuantity]); 



  const removeFromCart = async (productId) => {
    try {
      const updatedCart = cartdata.filter((product) => product.productId !== productId);
      setcartdata(updatedCart);
      setQuantities((prevQuantities) => {
        const newQuantities = { ...prevQuantities };
        delete newQuantities[productId];
        return newQuantities;
      });
  
      // Remove item from backend
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:9000/removeFromCart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      updateTotalPrice(updatedCart, quantities);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const navigateToPayment = () => {
    navigate("/payment", { state: { products: cartdata, quantities: quantities } });
  };
  const navigatetoorderpage=()=>{
    navigate("/orderhistory")
  }
  return (
    <div className="container  mx-auto p-4 bg-gray-100">
    <div className="flex items-center justify-between max-w-9xl">
      <h1 className="text-3xl font-bold mb-4 ml-60">Cart Page</h1>
      <img className="h-10 w-20 cursor-pointer" onClick={navigatetoorderpage} src="https://i0.wp.com/www.alphr.com/wp-content/uploads/2022/10/featured-42.png?fit=600%2C300&ssl=1" alt="Pay Now" />
    </div>
  
  

      {isLogin&&cartdata && cartdata.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mt-8 mb-4 ">Cart Items:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {cartdata.map((product, index) => (
              <div key={index} className="bg-white border border-black  justify-center items-center shadow-2xl rounded-lg p-4 bg-gray-100 ">
                <h3 className="text-lg font-semibold mb-2 mr-5 ml-32">{product.productTitle}</h3>  
                <p className="text-black ml-2  mb-2">price$:-{product.productPrice}</p>
                <p className="text-black  ml-2 mb-2">quantity:-{product.quantity }</p>
                <img src={product.productimage} alt={product.title} className="w-full h-48 object-cover mb-4" /> 
                <button className="text-white bg-red-600 rounded px-4 py-2 mt-2 ml-4" onClick={() => removeFromCart(product.productId)}>Remove from Cart</button>
                <button className="text-white bg-green-600 rounded px-4 py-2 mt-2 ml-10" onClick={() => addQuantity(product.productId)}>+</button>
                <button className="text-white bg-blue-600 rounded px-4 py-2 mt-2 ml-2" onClick={() => removeQuantity(product.productId)}>-</button>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-8">
            <div className="grid grid-cols-2 gap-4">
              <h3 className="text-xl font-semibold rounded-lg p-2">Total Price: ${totalPrice}</h3>
              <img className="h-20 w-30 cursor-pointer" onClick={navigateToPayment} src="https://img.freepik.com/premium-vector/black-finger-push-pay-button-icon-concept-online-shopping-retail-ecommerce-web-trade-business-simple-flat-trend-modern-payment-logotype-graphic-design-isolated-white-background_775815-746.jpg" alt="Pay Now" />
            </div>
            
          </div>
        </div>
      ) : (
        <p className="mt-8">No items in the cart.</p>

      )}
      
            
    </div>
  );
}

export default Addcart;
