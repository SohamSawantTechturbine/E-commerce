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
        <div className="container mx-auto px-4 bg-gray-300">
          <div className="mt-8">
            <p className="text-xl font-bold mb-4 flex justify-center items-center">{storedUsername}</p>
            {data && (
              <table className="table-auto w-full border-collapse border border-black">
                <thead className="bg-orange-300 ">
                  <tr>
                    <th className='px-4 py-2 text-left border border-black '>Phone Number</th>
                    <th className="px-4 py-2 text-left border border-black">Product Title</th>
                    <th className="px-4 py-2 text-left border border-black">Product Price</th>
                    <th className="px-4 py-2 text-left border border-black">Quantity</th>
                    <th className="px-4 py-2 text-left border border-black">Product Image</th>
                    <th className="px-4 py-2 text-left border border-black">Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className="bg-white border border border-black">
                      <td className='px-4 py-2 border border-black '>{item.phone}</td>
                      <td className="px-4 py-2 border border-black">{item.productTitle}</td>
                      <td className="px-4 py-2 border border-black">{item.productPrice}</td>
                      <td className="px-4 py-2 border border-black">{item.quantity}</td>
                      <td className="px-4 py-2 border border-black"><img src={item.productimage} alt={item.productTitle} className="w-16 h-16 object-cover" /></td>
                      <td className="px-4 py-2 border border-black"><img src="download.jpg" alt="Download" className="h-10" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );}  
export default Orderhistory
