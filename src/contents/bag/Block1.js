
import { useSelector } from '@/src/redux/store/store'
import { Box, Button, Divider, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'


const Block1 = () => {
  const router = useRouter()
  const {cartsPaginator} = useSelector((state) => state.cart);

  return (
    <>
    <Box >
      <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
        <Box sx={{width:'80%',display:'flex',justifyContent:'center',margin:'50px',flexDirection:'column',alignItems:'center'}}>
             <img src='https://usplworld-static.s3.ap-south-1.amazonaws.com/static/img/cart/home/Empty%20-Wishlist.png'/>
             <Typography>Your bag is empty</Typography>
             <Typography sx={{fontSize:'12px'}}>Add now,Buy later</Typography>
        </Box>
      </Box>
             <Divider/>

             <Box sx={{display:'flex',justifyContent:'center',margin:'10px'}}>
                <Button onClick={ () => router.push('/tshirts/tshirts')} variant='contained' sx={{width:'40%'}}>Continue Shopping</Button>
             </Box>
        </Box>
    </>
  )
}

export default Block1
