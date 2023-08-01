import { createCart } from '@/src/redux/slices/cart'
import { useDispatch } from '@/src/redux/store/store'
import { Close, FavoriteBorder, FiberManualRecord } from '@mui/icons-material'
import { Box, Button, Divider, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const Block2 = ({setOpen , product ,handleClick,user}) => {
    
  const dispatch = useDispatch();
  const router = useRouter();
    const handleClose = ()=>{
        setOpen(false);
    };


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
  }
    
  return (
    <>
       <Box sx={{height:'95vh',width:'75vw'}}>
    <Box sx={{display:'flex',justifyContent:'right',padding:'20px'}}>
      <Close sx={{color:'black',cursor:'pointer'}} onClick={handleClose}/>
    </Box>
    <Box sx={{width:'100%',display:'flex',justifyContent:'space-between'}}>
         <Box sx={{width:'42%',height:'620px',padding:'10px',border:'1px solid black'}}>
           <img src={product && product.image && product.image} style={{height:'600px'}}/>
         </Box>
         <Box sx={{width:'55%',padding:'20px'}}>
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
    <Typography><FiberManualRecord sx={{fontSize:'14px'}}/>Solid Blue T-Shirt With A Stylised Wrogn Insignia Print On The Front. Comes In A Classic, Casual Fit. -Made Of 100% Cotton -Comes With Half Sleeves And A Crew Neck -Can Be Paired With Jeans Or Joggers</Typography>
</Box>
          <Box sx={{display:'flex',width:'100%',gap:'20px',marginTop:'50px',marginBottom:'20px'}}>
            <Button variant='contained' sx={{width:'50%'}}>BUY NOW</Button>
            <Button onClick={() => handleCart(product && product.id)} variant='outlined' sx={{width:'50%'}}>ADD TO BAG</Button>
          </Box>
          <Divider/>
          <Button variant='contained' onClick={()=> handleClick(product && product.id)} sx={{width:'100%',background:'black'}}>View product Details</Button>
         </Box>
    </Box>
    </Box>
    </>
  )
}

export default Block2
