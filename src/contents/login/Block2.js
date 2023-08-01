import { Close } from '@mui/icons-material'
import { Box, Button, Divider, Popover, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import Block3 from './Block3'
import { useState } from 'react'
 

const initialValues = {
  email:""
}
const Block2 = ({setOpen}) => {
    const handleClose = ()=>{
        setOpen(false);

     
    };

    const {values ,handleBlur,handleChange,handleSubmit} = useFormik({

      initialValues: initialValues,
      // validationSchema: signupSchema,
  
      onSubmit : async (values,action) =>{
        const {email} = values;
        let data = {email};

       console.log(data)
     
 const resetPassword = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/reset-password-otp`,data);
 if(resetPassword.data.status==='SUCCESS'){
  action.resetForm();
 handleClose()
}
 else
  return false;

       

      }
 
    });

    const [close,setClose]=useState(false);
  
  const handleOpen = ()=>{
    setClose(true);
  };

 
      
  return (
    <>
      <Box sx={{width:'500px'}}>
        <Box sx={{display:'flex',justifyContent:'space-between',padding:'15px'}}>
            <Typography sx={{fontSize:'12px',color:'green'}}>Forgot Password</Typography>
            <Close onClick={handleClose} sx={{fontSize:'12px'}}/>
        </Box>
        <Divider/>
         <form onSubmit={handleSubmit}  style={{padding:'40px',display:'flex',flexDirection:'column',gap:'20px'}}>
       
        <TextField variant='outlined' label='email' type='email' name='email' value={values.email}  sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}} onChange={handleChange} onBlur={handleBlur}></TextField>

        <Box>
        <Button onClick={handleOpen} variant='contained' type='submit' sx={{width:'100%',borderRadius:'3px'}}>RESET PASSWORD</Button>      
        <Popover open={close} onClose={handleClose} 
  anchorOrigin={{
    vertical:'center',
    horizontal:'center'
  }}
  transformOrigin={{
    vertical:'center',
    horizontal:'center'
  }}
        
                              >
   <Block3 setClose={setClose}/>
    
   </Popover>
        </Box>
      
        </form>
      </Box>
    </>
  )
}

export default Block2
