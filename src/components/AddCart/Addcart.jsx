import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context';
import { useNavigate } from 'react-router-dom';


function Addcart() {
  
  const { cartdata, setcartdata, totalPrice, setTotalPrice ,producttitle,setproducttitle } = useAuthContext();
  const navigate = useNavigate();
 

  const [quantities, setQuantities] = useState(() => {
    const storedQuantities = JSON.parse(localStorage.getItem('quantities'));
    return storedQuantities || {};
  });
  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem('cartData'));
    if (storedCartData) {
      setcartdata(storedCartData);
    }
  }, []);

  useEffect(() => {
    updateTotalPrice(cartdata);
    localStorage.setItem('cartData', JSON.stringify(cartdata));
  }, [cartdata, quantities]);

  const removeFromCart = (productId) => {
    const updatedCart = cartdata.filter((product) => product.id !== productId);
    setcartdata(updatedCart);
    updateTotalPrice(updatedCart);
  };

  const updateTotalPrice = (cart) => {
      const totalPrice = Math.ceil(cart.reduce((acc, product) => acc + product.price * (quantities[product.id] || 1), 0));
    setTotalPrice(totalPrice);
  };

  const navigateToPayment = () => {
    navigate("/payment", { state: { products: cartdata, quantities: quantities } } );
  };
  useEffect(() => {
    localStorage.setItem('quantities', JSON.stringify(quantities));
  }, [quantities]);

  const addQuantity = (productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 1) + 1
    }));
  
  };

  const removeQuantity = (productId) => {
    if (quantities[productId] > 1) {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [productId]: (prevQuantities[productId] || 0) - 1
      }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cart Page</h1>
      {cartdata.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mt-8 mb-4">Cart Items:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartdata.map((product) => (
              <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2"  >{product.title}</h3>
               
                <p className="text-gray-600 mb-2">${product.price}</p>
                <p className="text-gray-600 mb-2">Quantity: {quantities[product.id] || 1}</p>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
                <button className="text-white bg-red-600 rounded px-4 py-2 mt-2" onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
                <button className="text-white bg-green-600 rounded px-4 py-2 mt-2 ml-2" onClick={() => addQuantity(product.id)}>+</button>
                <button className="text-white bg-blue-600 rounded px-4 py-2 mt-2 ml-2" onClick={() => removeQuantity(product.id)}>-</button>
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
