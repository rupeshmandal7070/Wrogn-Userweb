import { getUser, logoutUser, updateUser } from '@/src/redux/slices/auth'

import {  Avatar, Box, Button, Divider, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import {  useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getOrder } from '@/src/redux/slices/orders'
import dayjs from 'dayjs'

const Block1 = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const {orders} = useSelector((state) => state.orders); 
    const [orderDetail, setOrderDetail] = useState({})
    const {carts} = useSelector((state)=> state.cart)
        const handleLogout = async () => {

               localStorage.removeItem('accessToken');
               await dispatch(logoutUser())
               router.push('/signup')
           }
     
    const fetchUser = async() =>{
        let result = await dispatch(getUser())
        if(result)
      return true
    }

    const fetchOrder = async() =>{
        let arr;
        for(let order of orders){
        for(let k of order.products){
            if(k.id===router.query.orderId)
             arr = {...k}
        }
    }
    setOrderDetail({...arr})

    }

    useEffect(()=>{
          fetchUser()
          fetchOrder()
    },[dispatch])

  
    const steps = [
      {
        status:"order confirm",
        date: orderDetail && orderDetail.orderStatus && orderDetail.orderStatus.orderConfirm && orderDetail.orderStatus.orderConfirm.date&& orderDetail.orderStatus.orderConfirm.date
      },
      {
        status:"Shipped",
        date: orderDetail && orderDetail.orderStatus && orderDetail.orderStatus.shipped && orderDetail.orderStatus.shipped.date  && orderDetail.orderStatus.shipped.date
      },
      {
        status:"Out for Deleivery",
        date: orderDetail && orderDetail.orderStatus && orderDetail.orderStatus.outForDelivery&& orderDetail.orderStatus.outForDelivery.date && orderDetail.orderStatus.outForDelivery.date
      },
      {
        status:"Delievered",
        date: orderDetail && orderDetail.orderStatus && orderDetail.orderStatus.delivered&& orderDetail.orderStatus.delivered.date && orderDetail.orderStatus.delivered.date
      }
      ];  
        
      let activeSteps = ()=>{
        if(orderDetail.orderStatus){
       if(orderDetail.orderStatus.delivered && orderDetail.orderStatus.delivered.isConfirmed)
         return 4;
         else if(orderDetail.orderStatus.outForDelivery && orderDetail.orderStatus.outForDelivery.isConfirmed)
         return 3;
         else if(orderDetail.orderStatus.shipped && orderDetail.orderStatus.shipped.isConfirmed)
         return 2;
         else if(orderDetail.orderStatus.orderConfirm && orderDetail.orderStatus.orderConfirm.isConfirmed)
         return 1;
         else
         return 0;
        }
    }


    let mrp = 0;
let cost = 0;

for(let order of orders){
  for(let product of order.products){
       mrp += (product.productId && product.productId.price && product.productId.price.mrp)
       cost += (product.productId && product.productId.price && product.productId.price.cost)
  }
  
}

let discount = ((mrp) - (cost))
let gst = ((cost)*(0.08))
let total = ((cost) + (gst))
  
  return (
    <>

     <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
        <Box sx={{width:'80%',display:'flex',justifyContent:'center',marginTop:'40px',gap:'40px'}}>


        <Box  sx={{flexDirection:'column',width:'300px',background:'white',border:'1px solid rgba(0,0,0,0.3)',borderRadius:'2px',height:'520px'}}>

<Box sx={{padding:'20px',display:'flex',gap:'30px',background:'black'}}>
 <Typography sx={{color:'black'}}><Avatar/></Typography>
 <Box >
   <Typography sx={{color:'white'}}>{user.firstName} {user.lastName}</Typography>
   <Typography sx={{color:'white',fontSize:'13px'}}>{user.email}</Typography>
    
 </Box>
</Box>
<Divider/>
<Typography onClick={() => router.push('/myAccount')} sx={{fontWeight:'600',fontSize:'16px',padding:'15px',cursor:'pointer'}}>Profile</Typography>
<Divider/>

<Typography onClick={() => router.push('/orders')} sx={{fontWeight:'600',fontSize:'16px',padding:'15px',cursor:'pointer'}}>Orders</Typography>
<Divider/>

<Typography sx={{fontWeight:'600',fontSize:'16px',padding:'15px'}}>Wishlist</Typography>
<Divider/>

<Typography sx={{fontWeight:'600',fontSize:'16px',padding:'15px'}}>Coupons</Typography>
<Divider/>

<Typography sx={{fontWeight:'600',fontSize:'16px',padding:'15px'}}>Saved Address</Typography>
<Divider/>

<Typography sx={{fontWeight:'600',fontSize:'16px',padding:'15px'}}>Contact Us</Typography>
<Divider/>

<Typography  sx={{fontWeight:'600',fontSize:'16px',padding:'15px'}}>FAQs</Typography>
<Divider/>


<Typography onClick={handleLogout} sx={{fontWeight:'600',fontSize:'16px',padding:'15px',cursor:'pointer'}}>Logout</Typography>

</Box>








<Box sx={{width:'70%',height:'auto'}}>

    <Box sx={{display:'flex',border:'1px solid rgba(0,0,0,0.1)',padding:'20px',marginBottom:'20px'}}>
        <Typography>ORDERS DETAILS</Typography>
    </Box>


<Box  sx={{display:'flex',flexDirection:'column',border:'1px solid rgba(0,0,0,0.1)',padding:'15px',height:'300px'}}>
                    

                    <Box sx={{display:'flex',gap:'20px',marginTop:'10px',}}>
                        <Box sx={{display:'flex',flexDirection:'column',gap:'10px',alignItems:'center'}}>
                           <img src= {orderDetail && orderDetail.productId && orderDetail.productId.image && orderDetail.productId.image}    
                           style={{width:'130px',height:'170px'}}/>
                           <Box sx={{display:'flex',justifyContent:'center'}}>
                           <Button variant='outlined' sx={{width:'200px',height:'30px'}}>Cancel Order</Button>
                           </Box>
                        </Box>
 
                        <Box>
                            <Typography sx={{fontSize:'18px',fontWeight:'600'}}>{orderDetail && orderDetail.productId && orderDetail.productId.title.longTitle}</Typography>
                            <Typography>Brand:WROGN</Typography>
                            <Typography>₹5999</Typography>
                        </Box>
                    </Box>
                   
               </Box>

           <Box sx={{padding:'20px'}}>
               <Typography>Shipping Details</Typography>
               <Box sx={{display:'flex',gap:'10px'}}>
                <Typography sx={{fontWeight:'600'}}>{user.firstName}</Typography>
                <Typography sx={{fontWeight:'600'}}>{user.lastName}</Typography>
               </Box>
               <Typography>Lacality- {orders[0] && orders[0].address && orders[0].address.locality}</Typography>
                      <Typography>City-{orders[0] && orders[0].address && orders[0].address.city}</Typography>
                      <Typography>{orders[0] && orders[0].address && orders[0].address.state} - {orders[0] && orders[0].address && orders[0].address.zipcode}</Typography>
                            
               <Typography>Phone No-{user.phone}</Typography>
            </Box> 


          <Box sx={{display:'flex',gap:'100px'}}>


            <Box sx={{width:'50%',padding:'20px',background:'gray',height:'300px'}}>
            <Box sx={{marginBottom:'10px'}}>
                  <Typography sx={{fontWeight:'600'}}>PRICE DETAILS</Typography>
                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>Total No. of Items</Typography>
                    <Typography sx={{fontSize:'14px'}}>1</Typography>
                  </Box>

                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>Total MRP Value</Typography>
                    <Typography sx={{fontSize:'14px'}}>₹{mrp}</Typography>
                  </Box>

                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>Discount on MRP</Typography>
                    <Typography sx={{fontSize:'14px'}}>₹{discount}</Typography>
                  </Box>

                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>Sub Total(excluding tax)</Typography>
                    <Typography sx={{fontSize:'14px'}}>₹{cost}</Typography>
                  </Box>

                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>Coupon Discount</Typography>
                    <Typography sx={{fontSize:'14px'}}>₹0</Typography>
                  </Box>

                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>GST</Typography>
                    <Typography sx={{fontSize:'14px'}}>₹{gst}</Typography>
                  </Box>

                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>Total Value</Typography>
                    <Typography sx={{fontSize:'14px'}}>₹{total}</Typography>
                  </Box>
                </Box>
            </Box>


            <Box sx={{ width: '30%',height:'400px' }}>
                <Typography sx={{padding:'15px'}}>Order Status</Typography>
      <Stepper activeStep={activeSteps()}  orientation='vertical'>
        {steps.map((label,index) => (
          <Step key={index}>
            <StepLabel>{label.status}</StepLabel>
            <Typography sx={{fontSize:'12px'}}>{label.date && dayjs(label.date).format("DD-MM-YYYY")}</Typography>
          </Step>
        ))}
      </Stepper>
    </Box>

            </Box>
</Box>




</Box>

        </Box>

  
    </>
  )
}

export default Block1
