import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const Block3 = () => {
  return (
    <>
    <Box sx={{height:'100px',width:'400px',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
      <Typography>Your Order is Confirmed</Typography>
       <Button variant='contained'>Check Your Order Status</Button>
    </Box>

    </>
  )
}

export default Block3
