import { Facebook, Google } from '@mui/icons-material';
import { Box, Button, Popover, TextField, Typography, styled } from '@mui/material'
import { useFormik } from 'formik';
import { signupSchema } from '@/src/schemas';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { login } from '@/src/redux/slices/auth';
import Block2 from './Block2';
import Cookies from 'js-cookie';


const Box1= styled(Box)(({ theme }) => ({
    height:'550px',
    width:'40%',
    backgroundImage: `url(${"https://usplworld-static.s3.ap-south-1.amazonaws.com/static/img/wrogn/products/product_list/WITS1770.jpeg"})`,
    backgroundSize:'cover',
     
     [theme.breakpoints.down('sm')]: {
      height:'200px',
      width:'auto',
      margin:'0px 10px',
      display:'none',
    },
     }
  
   ));

   const initialValues  = {
   
    username:"",
    password:"",
  
 };
const Block1 = () => {
 const router = useRouter();
 const dispatch = useDispatch();
 const user = useSelector((state) => state.user)
  const {values , errors , handleBlur,handleChange,handleSubmit,touched} = useFormik({

    initialValues: initialValues,
    // validationSchema: signupSchema,

    onSubmit : async (values,action) =>{
      const { username,  password} = values;
      let data = { username, password}
console.log(data)
      const result = await dispatch(login(data));
      console.log(result);
       if(result){
      action.resetForm();
      localStorage.setItem("accessToken",result.token);
       router.push("/");
       }

    }
    
    
  });


  const [open,setOpen]=useState(false);
  
  const handleOpen = ()=>{
    setOpen(true);
  };

  const handleClose = ()=>{
    setOpen(false);
  };
  
  const handleFirstPage = async () => {
    window.open(`${process.env.NEXT_PUBLIC_HOST}/auth/google`,"_self");
   };

  return (
    <>
      <Box sx={{width:'100%',display:'flex',justifyContent:'center',paddingTop:{xs:'20px',sm:'50px',md:'50px'}}}>
        <Box sx={{width:{xs:'95%',sm:'90%',md:'80%'},height:'550px',border:'1px solid black',display:'flex'}}>
           <Box1>

           </Box1>
           <Box sx={{margin:{xs:'10px',sm:'30px',md:'40px'},display:'flex',justifyContent:'center',alignItems:'center',width:{xs:'95%',sm:'60%',md:'60%'},flexDirection:'column',gap:'15px'}}>
                <Typography sx={{fontWeight:'700'}}>SIGN IN</Typography>

                <Box sx={{display:'flex',gap:'20px'}}>
                    <Button variant='outlined' sx={{borderRadius:'5px',display:'flex',gap:'5px'}}><Facebook/>Facebook</Button>
                    <Button onClick={handleFirstPage} variant='outlined' sx={{borderRadius:'5px',display:'flex',gap:'5px'}}><Google sx={{color:'green'}}/>Google</Button>
                </Box>

                <Typography>OR</Typography>

                {/* <form onSubmit={handleSubmit} autoComplete="off" style={{width:'100%',display:'flex',flexDirection:'column',gap:'15px'}}> */}

                <TextField variant='outlined' label='Mobile phone' type='phone' name='phone'  sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>

                <Button variant='contained' sx={{width:'100%',borderRadius:'3px'}}>SIGN IN USING OTP</Button>
                {/* </form> */}
                <Typography>OR</Typography>

                <form onSubmit={handleSubmit} autoComplete="off" style={{width:'100%',display:'flex',flexDirection:'column',gap:'15px'}}>
               

                <Box sx={{width:'100%'}}>
                <TextField variant='outlined' label='E-Mail Id' type='email' name='username' value={values.username} onChange={handleChange} onBlur={handleBlur} autoFocus='false' sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>
                {errors.username && touched.username ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.username}</Typography>):null}
                 </Box>

                 <Box sx={{width:'100%'}}>
                <TextField variant='outlined' label='Pasword' type='password' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>
                {errors.password && touched.password ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.password}</Typography>):null}
                 </Box>

                 <Button variant='contained' type='submit' sx={{width:'100%',borderRadius:'3px',height:'40px'}}>SIGN IN </Button>
                 <Box sx={{display:'flex'}}>
                <Typography onClick={() => {router.push('/signup')}} sx={{color:'green',cursor:'pointer'}}>Don't have an account?Register | </Typography>
                <Box>
                <Typography onClick={handleOpen} sx={{color:'green',cursor:'pointer'}}> Forgot Password</Typography>
                <Popover open={open} onClose={handleClose} 
  anchorOrigin={{
    vertical:'center',
    horizontal:'center'
  }}
  transformOrigin={{
    vertical:'center',
    horizontal:'center'
  }}
        
                              >
   <Block2 setOpen={setOpen}/>
    
   </Popover>
                </Box>
                 
                 </Box>
              
                </form>
           </Box>
        </Box>
      </Box>
    </>
  )
}

export default Block1
