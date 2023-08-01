import { createOrder } from '@/src/redux/slices/orders';
import { useSelector,useDispatch } from '@/src/redux/store/store';
import { Box, Button, Divider, Popover, Radio, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useState } from 'react';

import Block2 from './Block2';

import { updateUser } from '@/src/redux/slices/auth';


const initialValues  = {
  
    
    locality:"",
    city:"",
    state:"",
    zipcode:""
    
  
};

const Block1 = () => {
 
  // redux state setup
  const dispatch = useDispatch();
  const {carts,cartsPaginator} = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
 const {orders} = useSelector((state) => state.orders)
 const [address,setAddress] = useState({})
 const[open,setOpen] = useState(false)

 const {values , errors , handleBlur,handleChange,handleSubmit} = useFormik({

  initialValues: initialValues,
  

  onSubmit : async (values,action) =>{
    const {state,city,zipcode,locality} = values;
 
    let address = {address:[values]}
   
    const result = await dispatch(updateUser(address,user.id))
   console.log(result)
    if(result){
      action.resetForm();
      
    }
    
  }
  
  
});







// change address function


// place order
const handlePlaceOrder = async () =>{
 let products = carts.map((cart)=>{
     return {
      "productId": cart.products[0].productId,
      "qty": cart.products[0].qty
     }
    
 })
 console.log(products)

 let data = {
  userId :user.id,
  products,
  address,
  status: "pending"
 }

 const result = await dispatch(createOrder(data));

 if(result)
 setOpen(false);
 else
 alert("Some error occured")

 
}
const handleOpen = ()=>{
  setOpen(true);
};

const handleClose = ()=>{
  setOpen(false);
};

let mrp = 0;
let cost = 0;

for(let cart of carts){
  for(let product of cart.products){
       mrp += (product.productId.price.mrp)
       cost += (product.productId.price.cost)
  }
  
}

let discount = ((mrp) - (cost))
let gst = ((cost)*(0.08))
let total = ((cost) + (gst))

  return (
    <>
<Box sx={{width:'30%',display:'flex',justifyContent:'center',padding:'20px'}}>
            <Typography>SELECT ADDRESS</Typography>
</Box>
      <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
        <Box sx={{width:'85%',display:'flex',justifyContent:'center',gap:'40px'}}>

             <Box  sx={{width:'70%',gap:'20px',display:'flex',border:'1px solid rgba(0,0,0,0.3)',padding:'10px'}}>

                <Box sx={{width:'30%',gap:'20px',display:'flex',flexDirection:'column',border:'1px solid rgba(0,0,0,0.3)',padding:'10px',background:'gray',alignItems:'center'}}>
                    <Typography>ADDRESS</Typography>
                    <Box >
                      <Box sx={{display:'flex',gap:'10px'}}>
                      <Typography sx={{fontWeight:'600'}}>{user && user.firstName}</Typography>
                      <Typography sx={{fontWeight:'600'}}>{user && user.lastName}</Typography>
                      </Box>
                      <Typography>Lacality- </Typography>
                      <Typography>City-</Typography>
                      <Typography>State-</Typography>
                      <Typography>Pincode-</Typography>
                      <Typography>Phone No- {user && user.phone}</Typography>
                    </Box>
                </Box>

                  <Box sx={{width:'70%',gap:'20px' ,flexDirection:'column',border:'1px solid rgba(0,0,0,0.3)',padding:'10px'}}>
                        
                     <Typography>Add New / Edit Address</Typography>

<form onSubmit={handleSubmit} autoComplete="off">
                     <Box >
                     <Box sx={{display:'flex',flexDirection:'column',gap:'10px'}}>
                     <TextField variant='outlined' value={user && user.firstName} type='text' name='name'  sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>

                     <TextField variant='outlined' value={user && user.phone} type='phone' name='phone'  sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>

                     <TextField variant='outlined' label='Zipcode' type='number' name='zipcode' value={values.zipcode} onChange={handleChange} onBlur={handleBlur}   sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>

                     <TextField variant='outlined' label='Locality/town' type='text' name='locality'value={values.locality} onChange={handleChange} onBlur={handleBlur}  sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>

                     <TextField variant='outlined' label='city' type='text' name='city' value={values.city} onChange={handleChange} onBlur={handleBlur}  sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>

                     <TextField variant='outlined' label='State' type='text' name='state' value={values.state} onChange={handleChange} onBlur={handleBlur}  sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}></TextField>
                     </Box>
                     <Box sx={{display:'flex', gap:'20px'}}>
                      <Button variant='outlined'>Cancel</Button>
                      <Button variant='contained' type='submit'>Save</Button>
                     </Box>
                     </Box>

                     </form>
                  </Box>
         
</Box>





              <Box sx={{width:'40%',border:'1px solid black',padding:'20px',height:'450px'}}>
                <Box sx={{marginBottom:'10px'}}>
                  <Typography sx={{fontWeight:'600'}}>PRICE DETAILS</Typography>
                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>Total No. of Items</Typography>
                    <Typography sx={{fontSize:'14px'}}>{cartsPaginator.itemCount}</Typography>
                  </Box>

                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>Total MRP Value</Typography>
                    <Typography sx={{fontSize:'14px'}}>₹{mrp}</Typography>
                  </Box>

                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>Discount on MRP</Typography>
                    <Typography sx={{fontSize:'14px'}}>-₹{discount}</Typography>
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
                </Box>
                <Divider/>
                <Box sx={{margin:'10px 0px'}}>
                <Typography sx={{fontWeight:'600'}}>CASH ON DELIEVEYRY</Typography>
                <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>Shipping Fee</Typography>
                    <Typography sx={{fontSize:'14px'}}>₹0</Typography>
                  </Box>

                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px',fontWeight:'700'}}>Total</Typography>
                    <Typography sx={{fontSize:'14px',fontWeight:'700'}}>₹{total}</Typography>
                  </Box>
                </Box>
                <Divider/>

                <Box sx={{margin:'10px 0px'}}>
                <Typography sx={{fontWeight:'600'}}>PREPAID</Typography>
                <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px'}}>Discount on Online payment</Typography>
                    <Typography sx={{fontSize:'14px'}}>₹0</Typography>
                  </Box>
                <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'14px',fontWeight:'700'}}>Total</Typography>
                    <Typography sx={{fontSize:'14px',fontWeight:'700'}}>₹{total}</Typography>
                  </Box>
                </Box>
                <Divider/>


                 <Box >
                 <Button onClick={handleOpen}  variant='contained' sx={{marginTop:'10px',width:'100%'}}>select payment method</Button>
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
   <Block2 setOpen={setOpen} handlePlaceOrder={handlePlaceOrder} total={total} />
    
   </Popover>
                 </Box>


              </Box>
        </Box>


      </Box>
    </>
  )
}

export default Block1
