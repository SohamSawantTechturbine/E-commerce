import React, { useState } from 'react';
import { useAuthContext } from '../../context';
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from 'jspdf'
import {loadStripe} from '@stripe/stripe-js';
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

     const paymentgateway=async()=>{

        const stripe=await loadStripe("pk_test_51P8Kf4SEE7AHIzyh3h1lDIjVr5WV1WO6kPl467ilPkykT9zAk1WWWVNj9URS3rEY38IP4yz64TLIOIUGXaovccBZ00wUq9U8dc")
        const body={
            products:cartdata,
            productprice:totalPrice
        }
       const headers={
        "Content-Type":"application/json"
       }
       const response =await fetch("http://localhost:9000/create-checkout-session",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
       });
       const session=await response.json();
       const result=stripe.redirectToCheckout({
        sessionId:session.id
       });
       if (result.error) {
        throw new Error(result.error.message);
    }
       
     }
    
    const handleData = async(e) => {
        e.preventDefault();
  
       await paymentgateway();
        const isFormValid = validateForm();

        if (isFormValid) {
            // Handle PDF generation and saving
            // Then handle storing payment details
            const pdf = new jsPDF();
            pdf.text("Payment Details", 10, 10);
            pdf.text(`First Name: ${firstName}`, 10, 20);
            pdf.text(`Last Name: ${lastName}`, 10, 30);
            pdf.text(`Phone: ${phone}`, 10, 40);
            pdf.text(`Email: ${email}`, 10, 50);
            pdf.text(`Address: ${address}`, 10, 60);
            pdf.text(`City: ${city}`, 10, 70);
            pdf.text(`State: ${state}`, 10, 80);
        
          
            let y = 90; 
            cartdata.forEach((product) => {
                pdf.text(`Product: ${product.productTitle}`, 10, y);
                pdf.text(`Quantity: ${product.quantity}`, 170, y);
                y += 10; 
            });
        
            pdf.text(`Total Price: ${totalPrice}`, 10, y);
        
            // Save PDF
            pdf.save('payment_details.pdf');
            const newPayment = {
                firstName,
                lastName,
                phone,
                email,
                address,
                city,
                state,
                totalPrice
            };
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("http://localhost:9000/payment-details", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({cartdata,firstName,phone}),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    // Update the cart data in the frontend if necessary
                    // For example:
                    // setCartData(data.cart);
                    toast("Cart data sent to server and stored successfully.");
                } else {
                    throw new Error("Failed to send cart data to server.");
                }
            } catch (error) {
                console.error("Error sending cart data:", error);
                toast.error("Failed to send cart data to server.");
            }
            console.log(cartdata);
            const updatedPaymentDetails = [...paymentDetails, newPayment];
            setpaymentDetails(updatedPaymentDetails);
            localStorage.setItem('AfterPaymentDetail', JSON.stringify(updatedPaymentDetails));
            toast("Your payment was successful and PDF download started"); } else {
            console.log("Form submission failed. Please check your inputs.");
        }
           
        }
    

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
            <div className="flex h-full bg-gray-100">
                <div className=" ml-5 max-w-md w-full py-7 px-5 bg-white border-yellow-500 border-4 shadow-lg rounded-lg mr-4">
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
                <div className="flex-1 ">
                    <div className="w-full bg-white">
                        <table className="table-auto border border-collapse border border-black w-full">
                            <thead className="bg-yellow-200">
                                <tr>
                                    <th className="w-1/2 border border border-black py-2">Product</th>
                                    <th className="w-1/2 border border border-black py-2">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartdata.map((product, index) => (
                                    <tr key={index}>
                                        <td className="border border-black py-2">{product.productTitle}</td>
                                        <td className="border border-black py-2">{product.quantity}</td> 
                                    </tr>
                                ))}
                                <tr>
                                    <td className='font-bold border border-black'>Total Price</td>
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