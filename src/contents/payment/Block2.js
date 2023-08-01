import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'


const Block2 = () => {
    const router = useRouter();
  return (
    <>
      <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'600px',gap:'30px'}}>
        <Typography sx={{fontSize:'25px',fontWeight:'600',color:'red'}}>Some Error Occured</Typography>
        <img src='https://static9.depositphotos.com/1674252/1149/v/950/depositphotos_11496049-stock-illustration-warning-sign.jpg' style={{height:'200px',width:'200px'}}/>
        <Button onClick={() => router.push('/')} variant='contained' sx={{width:'400px'}}>continue shopping</Button>
      </Box>
    </>
  )
}

export default Block2
