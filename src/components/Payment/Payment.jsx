import React from 'react'
import { useAuthContext } from '../../context'
import { useLocation } from 'react-router-dom';
function Payment() {
    const{totalPrice,cartdata}=useAuthContext();
    const location = useLocation();
    const { products, quantities } = location.state;
    return (
      <>
          <div className="flex h-full">
              <div className="max-w-md w-full py-7 px-5 bg-white border-yellow-500 border-4 shadow-lg rounded-lg mr-4">
                  <div className='card-header mb-4'>
                      <h4 className="text-lg font-semibold">Basic Information</h4>
                  </div>
                  <div className='card-body'>
                      <div className="flex mb-4">
                          <div className='mr-1'>
                              <label htmlFor="firstname" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                              <input type='text' id="firstname" name="firstname" className='form-input'/>
                          </div>
                          <div className='mb-4'>
                              <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                              <input type='text' id="lastname" name="lastname" className='form-input'/>
                          </div>
                      </div>
                      <div className="flex mb-4">
                          <div className='mr-1'>
                              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                              <input type='text' id="phone" name="phone" className='form-input'/>
                          </div>
                          <div className='mb-4'>
                              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                              <input type='text' id="email" name="email" className='form-input'/>
                          </div>
                      </div>
                      <div className='flex mb-4'>
                          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Full Address</label>
                          <textarea id="address" rows="4" className='form-textarea border border-gray-700 rounded-md h-35 w-full md:w-96'></textarea>
                      </div>
                      <div className='flex mb-4'>
                          <div className='mr-1'>
                              <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
                              <input type='text' id="city" name="city" className='form-input'/>
                          </div>
                          <div className='mb-4'>
                              <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">State</label>
                              <input type='text' id="state" name="state" className='form-input'/>
                          </div>
                      </div>
                      <div className="flex justify-end">
                          <img src="https://www.aalliancelifts.com/img/b2.jpg" alt="Image" className="w-32 h-32 object-cover rounded-full"/>
                      </div>
                  </div>
              </div>
              <div className="flex-1">
                  <div className="w-full">
                      <table className="table-auto border border-collapse border-gray-400 w-full">
                          <thead className="bg-yellow-200">
                              <tr>
                                  <th className="w-1/2 border border-gray-400 py-2">Product</th>
                                  <th className="w-1/2 border border-gray-400 py-2">Quantity</th>
                              </tr>
                          </thead>
                          <tbody>
                             
                              {cartdata.map((product, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-400 py-2">{product.title}</td>
                                        { <td className="border border-gray-400 py-2">{quantities[product.id]||1}</td> }
                                    </tr> ))}
                                 <td className='font-bold'> TotalPrice</td>
                                 <td>${totalPrice}</td>
                              
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
       {   console.log(cartdata)}
       {console.log("-----")}
       {console.log(products)}
      </>
  );
}

export default Payment
