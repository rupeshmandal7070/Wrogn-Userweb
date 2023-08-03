import { createCart, readCart } from '@/src/redux/slices/cart'
import { getProduct } from '@/src/redux/slices/product'
import { useDispatch, useSelector } from '@/src/redux/store/store'
import { ArrowRight, Close, FavoriteBorder, FiberManualRecord } from '@mui/icons-material'
import { Box, Button, Divider, TextField, Typography } from '@mui/material'

import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Block1 = ({setOpen}) => {
const dispatch = useDispatch();
const {product} = useSelector((state) => state.product)
const user = useSelector((state) => state.auth);
const [filters, setFilters] = useState({"isDeleted":false,"userId":user && user.user &&  user.user.id})


const {carts} = useSelector((state) => state.cart)
  const router = useRouter();

  const fetchproducts = async() => {
    let result = await dispatch(getProduct(router.query.productId)) 
    console.log(product)
    if (result){
      return true
    }
  }

  const fetchCarts = async() => {
    let result = await dispatch(readCart(1,10,filters))
    console.log(result)
    if(result)
   return true
 }

  useEffect(()=>{
   fetchproducts()
   fetchCarts()
  },[])

  const handleCart = async (productId)=>{
    const data = {
     "userId":user.id,
     "products":[
         {
             "productId": productId,
             "qty": 1
         }
      ]
 }
 await dispatch(createCart(data))
 
};

    const handleClose = ()=>{
        setOpen(false);
    };
  return (
    <>
       <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
  
    <Box sx={{width:{xs:'100%',sm:'90%',md:'90%'},display:'flex',justifyContent:'space-between',marginTop:{xs:'10px',sm:'40px',md:'70px'},flexDirection:{xs:'column',sm:'column',md:'row'}}}>

         <Box sx={{width:'42%',height:'620px',padding:'10px',border:'1px solid black',display:{xs:'none',sm:'block',md:'block'}}}>
           <img src={product && product.image } style={{height:'600px'}}/>
         </Box>

         <Box sx={{width:'100%',height:'420px',padding:'10px',display:{xs:'block',sm:'none',md:'none'}}}>
           <img src={product && product.image }  style={{height:'400px',width:'370px'}}/>
         </Box>

         <Box sx={{width:{xs:'95%',sm:'80%',md:'55%'},padding:'20px'}}>
         <Box sx={{display:'flex',gap:'5px',alignItems:'center'}}>
        <Typography sx={{fontSize:'24px'}}>Wrogn Men {product && product.title && product.title.longTitle}</Typography>
        <FavoriteBorder />
      </Box>

      <Box sx={{display:'flex',gap:'20px',alignItems:'center'}}>
        <Typography sx={{fontSize:'22px'}}>₹{product && product.price && product.price.cost}</Typography>
        <Typography sx={{textDecoration:'line-through',color:'rgba(0,0,0,0.5)',fontSize:'18px'}}>₹{product && product.price && product.price.mrp}</Typography>
        <Typography sx={{fontSize:'20px',color:'red'}}>FLAT {product && product.price && product.price.discount} OFF</Typography>
      </Box>
          <Typography sx={{fontSize:'12px'}}>inclusive all taxes</Typography>
          <Typography>SELECT SIZE</Typography>
          <Box sx={{display:'flex',gap:'20px'}}>
              <Typography sx={{height:'40px',width:'40px',border:'1px solid black',justifyContent:'center',alignItems:'center',display:'flex'}}>S</Typography>
              <Typography sx={{height:'40px',width:'40px',border:'1px solid black',justifyContent:'center',alignItems:'center',display:'flex'}}>M</Typography>
              <Typography sx={{height:'40px',width:'40px',border:'1px solid black',justifyContent:'center',alignItems:'center',display:'flex'}}>L</Typography>
              <Typography sx={{height:'40px',width:'40px',border:'1px solid black',justifyContent:'center',alignItems:'center',display:'flex'}}>XL</Typography>
              <Typography sx={{height:'40px',width:'40px',border:'1px solid black',justifyContent:'center',alignItems:'center',display:'flex'}}>XXL</Typography>
          </Box>

<Box sx={{marginTop:'20px'}}>
    <Typography ><FiberManualRecord sx={{fontSize:'14px'}}/>Solid Blue T-Shirt With A Stylised Wrogn Insignia Print On The Front. Comes In A Classic, Casual Fit. -Made Of 100% Cotton -Comes With Half Sleeves And A Crew Neck -Can Be Paired With Jeans Or Joggers</Typography>
</Box>
          <Box sx={{display:'flex',width:'100%',gap:'20px',marginTop:'50px',marginBottom:'20px'}}>
            <Button onClick={ () => handleCart(product && product.id)} variant='contained' sx={{width:'50%'}}>BUY NOW</Button>
            <Button onClick={ () => handleCart(product && product.id)} variant='outlined' sx={{width:'50%'}}>ADD TO BAG</Button>
          </Box>
          <Box sx={{padding:'20px',background:'#EDEFF3',marginBottom:'20px'}}>
            <Typography sx={{fontSize:'14px',color:'red'}}>OFFERS</Typography>
            <Typography sx={{fontSize:'12px',display:'flex',alignItems:'center'}}><ArrowRight/>Use coupon code : NEW10 and get extra 10% Off (Applicable for first-time customers only & min. cart value 1000)</Typography>

            <Typography sx={{fontSize:'12px',display:'flex',alignItems:'center'}}><ArrowRight/>10% off on online payment method.</Typography>
            <Typography sx={{fontSize:'12px',display:'flex',alignItems:'center'}}><ArrowRight/>Play & Earn! UPTO 10% OFF Play now!</Typography>
            <Typography sx={{fontSize:'16px',display:'flex',alignItems:'center'}}><ArrowRight/>Free Shipping on all orders.</Typography>
          </Box>
          <Divider/>
          <Box sx={{margin:'10px 0px'}}>
           <Typography sx={{fontSize:'14px'}}>DELIEVERY DETAILS</Typography>
           <Box sx={{display:'flex',gap:'20px'}}>
           <TextField variant='outlined' type='number' label='Enter Pincode' sx={{width:'60%',"& fieldset":{height:'50px'}}}></TextField>
          <Button variant='outlined' sx={{width:'40%',height:'45px'}}>Check</Button>
           </Box>
          </Box>


          <Box>
          <Typography sx={{fontSize:'12px',display:'flex',alignItems:'center'}}><ArrowRight/>15 days easy return and 15 days exchange</Typography>
            <Typography sx={{fontSize:'12px',display:'flex',alignItems:'center'}}><ArrowRight/>Cash on delivery available.</Typography>
            <Typography sx={{fontSize:'12px',display:'flex',alignItems:'center'}}><ArrowRight/>Free Delivery on all orders.</Typography>
          </Box>
         </Box>
    </Box>
    </Box>
    </>
  )
}

export default Block1
