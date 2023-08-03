import { createOrder } from '@/src/redux/slices/orders';
import { useSelector,useDispatch } from '@/src/redux/store/store';
import { Box, Button, Dialog, Divider, Popover, Radio, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useState } from 'react';

import Block2 from './Block2';

import { getUser, updateUser } from '@/src/redux/slices/auth';
import { useEffect } from 'react';
import { Close } from '@mui/icons-material';


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
  const {user} = useSelector((state) => state.auth);
 const {orders} = useSelector((state) => state.orders)
 const [addressDetail,setAddressDetail] = useState({})
 const[open,setOpen] = useState(false)
 const[close,setClose] = useState(false)
//  console.log(addressDetail)

let a = (user && user.address)
console.log(a)

 const fetchUser = async () => {
  let result = await dispatch(getUser())
  if(result){
    return true
  }
  else
  return false
 }



 const {values , errors , handleBlur,handleChange,handleSubmit} = useFormik({

  initialValues: initialValues,
  

  onSubmit : async (values,action) =>{
    const {state,city,zipcode,locality} = values;
 
    let address = {address:[values]}
   
    const result = await dispatch(updateUser(address,user.id))
   console.log(result)
    if(result){
      action.resetForm();
      setClose(false)
      
    }
    
  }
  
  
});


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
const handleOpenDrawer = ()=>{
  setClose(true);
};

const handleClose = ()=>{
  setOpen(false);
};

const handleCloseDrawer = ()=>{
  setClose(false);
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


useEffect(()=>{
fetchUser()

},[])
  return (
    <>
<Box sx={{width:'30%',display:'flex',justifyContent:'center',padding:'20px'}}>
            <Typography>SELECT ADDRESS</Typography>
</Box>
      <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
        <Box sx={{width:'85%',display:'flex',justifyContent:'center',gap:'40px'}}>

             <Box  sx={{width:'70%',gap:'20px',display:'flex',border:'1px solid rgba(0,0,0,0.3)',padding:'10px',flexDirection:'column',height:'250px'}}>

                    <Typography>Your Address</Typography>

                    {user && user.address && user.address.map((item,index)=>(

                <Box key={index} sx={{width:'100%',gap:'10px',display:Object.keys({a}).length !== 0 ? 'flex' :'none',flexDirection:'column',border:'1px solid rgba(0,0,0,0.3)',padding:'10px',background:'rgba(0,0,0,0.2)'}}>
                    <Box sx={{display:'flex',gap:'5px',alignItems:'center'}}>
                  <Radio/>
                      <Box sx={{display:'flex',gap:'10px'}}>
                      <Typography sx={{fontWeight:'600'}}>{user && user.firstName}</Typography>
                      <Typography sx={{fontWeight:'600'}}>{user && user.lastName}</Typography>
                      </Box>
                      <Typography> ,{item && item.locality}, </Typography>
                      <Typography sx={{textTransform:'uppercase'}}> {item && item.city},</Typography>
                      <Typography sx={{textTransform:'uppercase'}}> {item && item.state},</Typography>
                      <Typography > {a && a[0].zipcode},</Typography>
                      <Typography>Phone Number : {user && user.phone}</Typography>
                    </Box>
                      <Typography onClick={handleOpenDrawer} sx={{color:'green',cursor:'pointer'}}>Edit address</Typography>
                </Box>

))}


                  <Box sx={{width:'70%',gap:'20px' ,flexDirection:'column',padding:'10px'}}>
                        
                     <Typography onClick={handleOpenDrawer} sx={{cursor:'pointer',fontWeight:'600'}}><Radio/>Add New / Edit Address</Typography>

                     <Dialog open={close} >

<form onSubmit={handleSubmit} autoComplete="off" style={{width:'500px',height:'70vh',padding:'40px'}}>
                     <Box >
                      <Box sx={{display:'flex',justifyContent:'space-between',paddingBottom:'30px'}}>
                        <Typography sx={{color:'black',fontWeight:'600'}}>Add/Edit New Address</Typography>
                        <Close onClick={handleCloseDrawer} sx={{cursor:'pointer'}}/>
                      </Box>
                     <Box sx={{display:'flex',flexDirection:'column',gap:'15px'}}>
                     <TextField variant='outlined' value={user && user.firstName} size='small' type='text' name='name'  sx={{width:'100%',"& fieldset": {borderRadius:'3px'}}}></TextField>

                     <TextField variant='outlined' value={user && user.phone} type='phone' name='phone' size='small'  sx={{width:'100%',"& fieldset": {borderRadius:'3px'}}}></TextField>

                     <TextField variant='outlined' label='Zipcode' type='number' name='zipcode' size='small' required='true' value={values.zipcode} onChange={handleChange} onBlur={handleBlur}   sx={{width:'100%',"& fieldset": {borderRadius:'3px'}}}></TextField>

                     <TextField variant='outlined' label='Locality/town' type='text' size='small' required='true' name='locality'value={values.locality} onChange={handleChange} onBlur={handleBlur}  sx={{width:'100%',"& fieldset": {borderRadius:'3px'}}}></TextField>

                     <TextField variant='outlined' label='city' type='text' name='city' size='small'  value={values.city} required='true' onChange={handleChange} onBlur={handleBlur}  sx={{width:'100%',"& fieldset": {borderRadius:'3px'}}}></TextField>

                     <TextField variant='outlined' label='State' type='text' name='state' size='small' required='true' value={values.state} onChange={handleChange} onBlur={handleBlur}  sx={{width:'100%',"& fieldset": {borderRadius:'3px'}}}></TextField>
                     </Box>
                     <Box sx={{display:'flex', gap:'20px',marginTop:'20px'}}>
                      <Button variant='outlined' onClick={handleCloseDrawer}>Cancel</Button>
                      <Button variant='contained' type='submit' sx={{background:'black'}}>Save</Button>
                     </Box>
                     </Box>

                     </form>
                     </Dialog>
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


                 <Box sx={{display:Object.keys({a}).length !== 0 ? 'block' :'none'}}>
                 <Button onClick={handleOpen}  variant='contained' sx={{marginTop:'10px',width:'100%'}}>select payment method</Button>
                 <Dialog open={open} onClose={handleClose} 

 
   >
   <Block2 setOpen={setOpen} handlePlaceOrder={handlePlaceOrder} total={total} />
    
   </Dialog>
                 </Box>


              </Box>
        </Box>


      </Box>
    </>
  )
}

export default Block1
