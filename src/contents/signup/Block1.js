import { Facebook, Google } from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, TextField, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import { signupSchema } from '@/src/schemas';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '@/src/redux/slices/auth';
import { useRouter } from 'next/router';



const Box1= styled(Box)(({ theme }) => ({
    height:'748px',
    width:'40%',
    backgroundImage: `url(${"https://usplworld-static.s3.ap-south-1.amazonaws.com/static/img/wrogn/products/product_list/WITS1770.jpeg"})`,
    backgroundSize:'cover',
objectFit:'cover',
   
     [theme.breakpoints.down('sm')]: {
      height:'200px',
      width:'auto',
      margin:'0px 10px',
      display:'none',
    },
     }
  
   ));


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

  // const [initialDate,setInitialDate] = useState(new moment().toDate());

  const router = useRouter();
  const user = useSelector((state) => state.user)
  const dispatch= useDispatch();
 const[backdrop,setBackdrop] = useState(false);

 const {values , errors , handleBlur,handleChange,handleSubmit,touched} = useFormik({

    initialValues: initialValues,
    validationSchema: signupSchema,

    onSubmit : async (values,action) =>{
      const {firstName, lastName, email, phone, password, sex, date} = values;
      let data = {firstName, lastName, email, phone, password, sex, date}

      const result = await dispatch(register(data));
      console.log(result);
       if(result){
      action.resetForm();
       router.push("/login");
       }

    }
    
    
  });

  const handleFirstPage = async () => {
    setBackdrop(true)
    window.open(`${process.env.NEXT_PUBLIC_HOST}/auth/google`,"_self");
    if(window.open()){
      setBackdrop(false)
    }
   };
  
  // console.log(errors)
  return (
    <>
      <Box sx={{width:'100%',display:'flex',justifyContent:'center',padding:{xs:'20px 0px',sm:'50px 0px',md:'50px 0px'}}}>
        <Box sx={{width:{xs:'95%',sm:'90%',md:'75%'},height:'750px',border:'1px solid black',display:'flex'}}>
           <Box1>

           </Box1>
          
           <Box  sx={{margin:{xs:'10px',sm:'30px',md:'40px'},display:'flex',justifyContent:'center',alignItems:'center',width:{xs:'95%',sm:'60%',md:'60%'},flexDirection:'column',gap:'15px'}} >

            
                <Typography sx={{fontWeight:'700'}}>SIGN UP</Typography>

                <Box sx={{display:'flex',gap:'20px'}}>
                    <Button variant='outlined' sx={{borderRadius:'5px',display:'flex',gap:'5px'}}><Facebook/>Facebook</Button>
                    <Box>
                    <Button onClick={handleFirstPage} variant='outlined' sx={{borderRadius:'5px',display:'flex',gap:'5px'}}><Google sx={{color:'green'}}/>Google</Button>
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={backdrop}>
                       <CircularProgress color="inherit" />
                   </Backdrop>
                    </Box>
                </Box>

                <Typography>OR</Typography>

                {/* <TextField variant='outlined' label='Mobile phone' type='phone' name='phone'  sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>

                <Button variant='contained' sx={{width:'100%',borderRadius:'3px'}}>SIGN UP USING OTP</Button>

                <Typography>OR</Typography> */}

            <form onSubmit={handleSubmit} autoComplete="off" style={{width:'100%',display:'flex',flexDirection:'column',gap:'15px'}}>
                <Box  sx={{display:'flex',gap:'20px',width:'100%'}}>

                  <Box sx={{width:'100%'}}>
                <TextField variant='outlined' label='First Name' type='text' name='firstName' value={values.firstName} onChange={handleChange} onBlur={handleBlur} sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px',}}></TextField>
                {errors.firstName && touched.firstName ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.firstName}</Typography>):null}
                  </Box>

                <Box sx={{width:'100%'}}>
                <TextField variant='outlined' label='Last name' type='text' name='lastName' value={values.lastName} onChange={handleChange} onBlur={handleBlur} sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>
                {errors.lastName && touched.lastName ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.lastName}</Typography>):null}
                </Box>
                </Box>
                 
                 <Box sx={{width:'100%'}}>
                <TextField variant='outlined' label='E-Mail Id' type='email' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} autoFocus='false' sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>
                {errors.email && touched.email ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.email}</Typography>):null}
                 </Box>

                 <Box sx={{width:'100%'}}>
                <TextField variant='outlined' label='Pasword' type='password' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>
                {errors.password && touched.password ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.password}</Typography>):null}
                 </Box>

                 <Box sx={{width:'100%'}}>
                <TextField variant='outlined' label='Mobile phone' type='number' name='phone' value={values.phone} onChange={handleChange} onBlur={handleBlur} sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>
                {errors.phone && touched.phone ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.phone}</Typography>):null}
                 </Box>

                <Box sx={{display:'flex',gap:'20px',width:'100%'}}>
                <Box sx={{width:'100%'}}>
                <TextField variant='outlined'  type='date' name='date' value={values.date} onChange={handleChange} onBlur={handleBlur} sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>
                {errors.sex && touched.sex ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.sex}</Typography>):null}
                </Box>

                <Box sx={{width:'100%'}}>
                <TextField variant='outlined' label='Sex' type='text' name='sex' value={values.sex} onChange={handleChange} onBlur={handleBlur} sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>
                {errors.sex && touched.sex ?(
                <Typography sx={{fontSize:'12px',color:'red'}}>{errors.sex}</Typography>):null}
                </Box>
                </Box>

                <Box>
                 <Button variant='contained' type='submit' sx={{width:'100%',borderRadius:'3px',height:'40px'}}>SIGN UP </Button>
                 <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={backdrop}>
                  <CircularProgress color="inherit" />
                  </Backdrop>
               </Box>
                 
                 <Box sx={{display:'flex',justifyContent:'center'}}>
                <Typography onClick={() => {router.push('/login')}} sx={{color:'green',cursor:'pointer'}}>Already have an accounr? Login </Typography>
                 </Box>

                </form>
           </Box>
       
        </Box>
      </Box>
    </>
  )
}

export default Block1
