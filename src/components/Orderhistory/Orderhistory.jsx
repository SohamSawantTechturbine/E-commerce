import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Orderhistory() {
  const [data,setdata]=useState();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:9000/getproductdetail', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            
           setdata(response?.data?.cart);
           console.log(data);
           // setQuantities(response.data.quantities);
          //  updateTotalPrice(response.data.cart);
          } catch (error) {
            console.error('Error fetching cart data:', error);
          }
        };
        
        fetchData();
      }, []); 
      console.log(data);
      const storedUsername = localStorage.getItem("username");
      return (
        <div className="container mx-auto px-4 ">
          <div className="mt-8">
            <p className="text-xl font-bold mb-4">{storedUsername}</p>
            {data && (
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-orange-300">
                  <tr>
                    <th className="px-4 py-2 text-left">Product Title</th>
                    <th className="px-4 py-2 text-left">Product Price</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Product Image</th>
                    <th className="px-4 py-2 text-left">Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className="bg-gray-100 border border-gray-300">
                      <td className="px-4 py-2">{item.productTitle}</td>
                      <td className="px-4 py-2">{item.productPrice}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2"><img src={item.productimage} alt={item.productTitle} className="w-16 h-16 object-cover" /></td>
                      <td className="px-4 py-2"><img src="download.jpg" alt="Download" className="h-10" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );}  
export default Orderhistory
