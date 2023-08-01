import { getUser, logoutUser, updateUser } from '@/src/redux/slices/auth'

import {  Avatar, Box, Button, Divider, Tab, Tabs, TextField, Typography } from '@mui/material'
import {  useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'


import { useState } from 'react'




const initialValues  = {
    phone:"",
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    date:"",
    sex:"",
 };
 
const Block1 = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

        const handleLogout = async () => {

               localStorage.removeItem('accessToken');
               await dispatch(logoutUser())
               router.push('/signup')
           }
     
    const fetchUser = async() =>{
        let result = await dispatch(getUser())
        if(result)
        console.log(user)
    }
    useEffect(()=>{
          fetchUser()
    },[dispatch])

    const {values ,  handleBlur,handleChange,handleSubmit} = useFormik({

        initialValues: initialValues,
        // validationSchema: signupSchema,
    
        onSubmit : async (values,action) =>{
          const {firstName, lastName, sex, date} = values;
          let data = {firstName, lastName, sex, date}
    
          const result = await dispatch(updateUser(data,user.id));
          console.log(result);
           if(result){
          
           router.push("/");
           }
    
       
        },
        
        
      });

    
  
  return (
    <>
     <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
        <Box sx={{width:'80%',display:'flex',justifyContent:'center',marginTop:'40px',gap:'40px'}}>


        <Box  sx={{flexDirection:'column',width:'300px',background:'white',border:'1px solid rgba(0,0,0,0.3)',borderRadius:'2px'}}>

<Box sx={{padding:'20px',display:'flex',gap:'30px',background:'black'}}>
 <Typography sx={{color:'black'}}><Avatar/></Typography>
 <Box >
   <Typography sx={{color:'white'}}>{user.firstName} {user.lastName}</Typography>
   <Typography sx={{color:'white',fontSize:'13px'}}>{user.email}</Typography>
    
 </Box>
</Box>
<Divider/>





<Typography sx={{fontWeight:'600',fontSize:'16px',padding:'15px'}}>Profile</Typography>
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








<Box sx={{width:'70%',border:'1px solid black'}}>

<form onSubmit={handleSubmit} autoComplete="off" style={{width:'100%',display:'flex',flexDirection:'column'}}>

<Box sx={{padding:'15px',background:'black'}}>
    <Typography sx={{color:'white',fontWeight:'600'}}>EDIT PROFILE</Typography>
</Box>

<Box sx={{padding:'15px',justifyContent:'right',display:'flex'}}>
    <Typography sx={{color:'blue',fontSize:'12px'}}>Change Password</Typography>
</Box>

<Box sx={{padding:'15px'}}>
                <TextField variant='standard' label='email' type='email' name='email' value={user.email}  onChange={handleChange} onBlur={handleBlur} autoFocus='false' sx={{width:'100%'}} ></TextField>
           
                 </Box>

<Box sx={{padding:'15px',display:'flex',gap:'30px'}}>
<TextField variant='standard' label={user.firstName} type='text' name='firstName' value={values.firstName}  onChange={handleChange} onBlur={handleBlur}  sx={{width:'100%'}} ></TextField>

<TextField variant='standard' label={user.lastName} type='text' name='lastName' value={values.lastName} onChange={handleChange} onBlur={handleBlur} autoFocus='false' sx={{width:'100%'}} ></TextField>
</Box>

<Box sx={{padding:'15px',display:'flex',gap:'30px'}}>
<TextField variant='standard'  type='date' name='date' value={values.date} onChange={handleChange} onBlur={handleBlur} autoFocus='false' sx={{width:'100%'}} ></TextField>
 <TextField variant='standard' label='phone' type='number' name='phone' value={user.phone} onChange={handleChange} onBlur={handleBlur} autoFocus='false' sx={{width:'100%'}} ></TextField>
</Box>
 

<Box sx={{padding:'15px'}}>
<TextField variant='standard' label={user.sex} type='text' name='sex' value={values.sex} onChange={handleChange} onBlur={handleBlur} autoFocus='false' sx={{width:'50%'}} ></TextField>
</Box>


 <Box sx={{padding:'10px'}}>
      <Button type='submit' variant='contained'>SAVE</Button>
 </Box>
 </form>
</Box>




</Box>

        </Box>

  
    </>
  )
}

export default Block1
