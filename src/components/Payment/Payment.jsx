import React, { useState } from 'react';
import { useAuthContext } from '../../context';
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function Payment() {
    const { totalPrice, cartdata } = useAuthContext();
    const location = useLocation();
    const { products, quantities } = location.state;
    const storedData = localStorage.getItem("AfterPaymentDetail");
     const defaultPaymentDetails = []; 
    const [paymentDetails, setpaymentDetails] = useState(storedData ? JSON.parse(storedData) : defaultPaymentDetails);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [addressValid, setAddressValid] = useState(true);
    const [cityValid, setCityValid] = useState(true);
    const [stateValid, setStateValid] = useState(true);

    const validateForm = () => {
        const isFirstNameValid = firstName.trim() !== '';
        const isLastNameValid = lastName.trim() !== '';
        const isPhoneValid = /^\d{10}$/.test(phone);
        const isEmailValid = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(email);
        const isAddressValid = address.trim() !== '';
        const isCityValid = city.trim() !== '';
        const isStateValid = state.trim() !== '';

        setFirstNameValid(isFirstNameValid);
        setLastNameValid(isLastNameValid);
        setPhoneValid(isPhoneValid);
        setEmailValid(isEmailValid);
        setAddressValid(isAddressValid);
        setCityValid(isCityValid);
        setStateValid(isStateValid);

        return isFirstNameValid && isLastNameValid && isPhoneValid && isEmailValid && isAddressValid && isCityValid && isStateValid;
    };

    // const handleData = (e) => {
    //     e.preventDefault();
    //     const isFormValid = validateForm();

    //     if (isFormValid) {
    //       alert('Form submission successful');
          
    //   let newdata = [firstName, lastName, phone, email, address, city, state,totalPrice];
    //       setpaymentDetails((prev)=> ([...prev , newdata]))
    //         localStorage.setItem('AfterPaymentDetail', JSON.stringify(paymentDetails));
    //     } else {
    //         console.log('Form submission failed. Please check your inputs.');
    //     }
    // };
    const handleData = (e) => {
      e.preventDefault();
      const isFormValid = validateForm();
  
      if (isFormValid) {
        
       //   const newdata = [firstName, lastName, phone, email, address, city, state, totalPrice];
          const newdata={
                 firstname:firstName,
                 lastname:lastName,
                 Phone:phone,
                 Email:email,
                 Address:address,
                 City:city,
                 State:state,
                 TotalPrice:totalPrice
          }
          setpaymentDetails((prev) => {
              const updatedPaymentDetails = [{...prev, newdata}];
              localStorage.setItem('AfterPaymentDetail', JSON.stringify(updatedPaymentDetails));
              { toast("your payement succesfull")}
              return updatedPaymentDetails;
          });
      } else {
          console.log('Form submission failed. Please check your inputs.');
      }
  };
  

    const validateFirstName = () => {
        setFirstNameValid(firstName.trim() !== '');
    };

    const validateLastName = () => {
        setLastNameValid(lastName.trim() !== '');
    };

    const validatePhone = () => {
        setPhoneValid(/^\d{10}$/.test(phone));
    };

    const validateEmail = () => {
        setEmailValid(/\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(email));
    };

    const validateAddress = () => {
        setAddressValid(address.trim() !== '');
    };

    const validateCity = () => {
        setCityValid(city.trim() !== '');
    };

    const validateState = () => {
        setStateValid(state.trim() !== '');
    };

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
                                <input type='text' id="firstname" name="firstname" className={`form-input ${firstNameValid ? '' : 'border-red-500'}`} value={firstName} onChange={(e) => setFirstName(e.target.value)} onBlur={validateFirstName} />
                                {!firstNameValid && <p className="text-red-500 text-xs italic">First name is required.</p>}
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                                <input type='text' id="lastname" name="lastname" className={`form-input ${lastNameValid ? '' : 'border-red-500'}`} value={lastName} onChange={(e) => setLastName(e.target.value)} onBlur={validateLastName} />
                                {!lastNameValid && <p className="text-red-500 text-xs italic">Last name is required.</p>}
                            </div>
                        </div>
                        <div className="flex mb-4">
                            <div className='mr-1'>
                                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                                <input type='text' id="phone" name="phone" className={`form-input ${phoneValid ? '' : 'border-red-500'}`} value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={validatePhone} />
                                {!phoneValid && <p className="text-red-500 text-xs italic">Phone number must be 10 digits.</p>}
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                <input type='text' id="email" name="email" className={`form-input ${emailValid ? '' : 'border-red-500'}`} value={email} onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail} />
                                {!emailValid && <p className="text-red-500 text-xs italic">Please enter a valid Gmail address.</p>}
                            </div>
                        </div>
                        <div className='flex mb-4'>
                            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Full Address</label>
                            <textarea id="address" rows="4" className={`form-textarea border border-gray-700 rounded-md h-35 w-full md:w-96 ${addressValid ? '' : 'border-red-500'}`} value={address} onChange={(e) => setAddress(e.target.value)} onBlur={validateAddress} />
                            {!addressValid && <p className="text-red-500 text-xs italic">Address is required.</p>}
                        </div>
                        <div className='flex mb-4'>
                            <div className='mr-1'>
                                <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
                                <input type='text' id="city" name="city" className={`form-input ${cityValid ? '' : 'border-red-500'}`} value={city} onChange={(e) => setCity(e.target.value)} onBlur={validateCity} />
                                {!cityValid && <p className="text-red-500 text-xs italic">City is required.</p>}
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">State</label>
                                <input type='text' id="state" name="state" className={`form-input ${stateValid ? '' : 'border-red-500'}`} value={state} onChange={(e) => setState(e.target.value)} onBlur={validateState} />
                                {!stateValid && <p className="text-red-500 text-xs italic">State is required.</p>}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <img src="https://www.aalliancelifts.com/img/b2.jpg" alt="Image" className="w-32 h-32 object-cover rounded-full" onClick={handleData} />
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
                                        <td className="border border-gray-400 py-2">{quantities[product.id] || 1}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className='font-bold'>Total Price</td>
                                    <td>${totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Payment;
