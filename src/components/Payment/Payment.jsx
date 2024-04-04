import React from 'react'
import { useAuthContext } from '../../context'

function Payment() {
    const{totalPrice,producttitle}=useAuthContext();
   
  return (
    <div>
    <p>  on payment portal{totalPrice}</p> <br/>
    <p>  product details:{[producttitle
    ]}</p>
    <br/>
    
    </div>
  )
}

export default Payment
