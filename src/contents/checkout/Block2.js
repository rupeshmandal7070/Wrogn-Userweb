import { Box, Button, Checkbox, Dialog, DialogTitle, Popover, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import Block3 from './Block3'
import Script from 'next/script'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from '@/src/redux/store/store'
import {  deleteMany } from '@/src/redux/slices/cart'



const Block2 = ({handlePlaceOrder,total}) => {
  const user = useSelector((state) => state.auth)
  const {carts} = useSelector((state)=>state.cart)
  const dispatch = useDispatch()
    const[close,setClose] = useState(false)
    console.log(handlePlaceOrder)
    
    const handleClearAll = async() => {
      let ids=[]
      for(let k of carts)
      ids.push(k.id);
  
        await dispatch(deleteMany(ids))
      }
   
    console.log(handleClearAll)
    const handleClick = () => {
        handlePlaceOrder()
          setClose(true)
          if(handlePlaceOrder){
            handleClearAll()
          }
       
    }
   
 
    const handleClose = () => {
        setClose(false)
    }

    const totalPrice = ((total)*100)
    console.log(totalPrice)
 const handlePay = async () =>{

  console.log("heelo pay")

    const option = {
      amount : totalPrice,
      currency : 'INR'
    }

    const {data} = await axios.post('http://localhost:5000/userapp/payment/checkout',option, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      
  });


  

  if(data.status==='SUCCESS'){
 handlePlaceOrder()
 alert("Your order is successfull")
  if(handlePlaceOrder){
    handleClearAll()
   }
  }
  else
   return false;



    const options = {
      key:process.env.NEXT_PUBLIC_RAZORPAY_API_ID,
      "amount": data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": user.firstName,
      "description": "Test Transaction",
      "image": "https://avatars.githubusercontent.com/u/86181346?v=4",
      "order_id": data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": "http://localhost:5000/userapp/payment/paymentVerify",
      "prefill": {
          "name":  user.firstName,
          "email": user.email,
          "contact":user.phone
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
     var rzp1 = new window.Razorpay(options);
      rzp1.open();

}


  return (
    <>
   
   <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
   
      <Box sx={{height:'200px',width:'400px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'20px'}}>
       <Button onClick={handlePay} variant='contained'>Online Payment</Button>
       <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <Typography sx={{fontSize:'25px'}}>
            <Checkbox/>
             Cash On Delievry</Typography>

           <Box>
        <Button  onClick={handleClick}  variant='outlined'>confirm your order</Button>
        <Popover open={close} onClose={handleClose}
         anchorOrigin={{
            vertical:'top',
            horizontal:'center'
          }}
          transformOrigin={{
            vertical:'top',
            horizontal:'center'
          }}
 >
   <Block3/>
    
   </Popover>
            </Box>  
       </Box>
      </Box>
    </>
  )
}

export default Block2
