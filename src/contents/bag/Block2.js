import { deleteCart, deleteMany, readCart } from '@/src/redux/slices/cart';
import { useDispatch, useSelector } from '@/src/redux/store/store'
import { Backdrop, Box, Button, CircularProgress, Divider, Pagination, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Block1 from './Block1';
import { useRouter } from 'next/router';

const Block2 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {carts,cartsPaginator} = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth)
  const [page,setPage] = useState(1);
  const [limit,setLimit] = useState(10);
  const[productDeatails,setProductDetails] = useState({})
  const[backdrop,setBackdrop] = useState(false)
  const[skeletonstate,setskeletonstate] = useState(true)
  const [filters,setFilters] = useState({"isDeleted":false,"userId":user && user.user &&  user.user.id})
  const fetchCarts = async() => {
    setskeletonstate(true)
    let result = await dispatch(readCart(page,limit,filters))
    console.log(result)
    if(result)
   setskeletonstate(false)
 }
console.log(user.user.id)

 const handleDelete = async (cartId)=>{
 setBackdrop(true)
await dispatch(deleteCart(cartId))
setBackdrop(false)
};

  // const handleClearAll = async() => {
  //   let ids=[]
  //   for(let k of carts)
  //   ids.push(k.id);

  //     await dispatch(deleteMany(ids))
  //   }
    

const fetchDetails = async() =>{
  let arr;
 
  for(let cart of carts){
    
  for(let k of cart.products){
    
      if(k)
       arr = {...k}
  }
}
setProductDetails({...arr})

}
console.log(productDeatails)
 
 useEffect(() =>{
      fetchCarts()
      fetchDetails()
 },[page])


 const handleChangePage = (event,value) =>{
  console.log(value);
  setPage(value);
}
let mrp = 0;
let cost = 0;

for(let cart of carts){
  for(let product of cart.products){
       mrp += (product.productId && product.productId.price && product.productId.price.mrp)
       cost += (product.productId && product.productId.price && product.productId.price.cost)
  }
  
}

let discount = ((mrp) - (cost))
let gst = ((cost)*(0.08))
let total = ((cost) + (gst))

console.log(total)
  return (
    <>
   <Box sx={{display:Object.keys(carts).length !== 0 ? 'none' : 'block'}}>
    <Block1/>
   </Box>


      <Box sx={{width:'100%',display:Object.keys(carts).length !== 0 ? 'flex' : 'none',justifyContent:'center'}}>
        <Box sx={{width:'85%',display:'flex',justifyContent:'center',gap:'40px'}}>


            {skeletonstate ?
            <Box  sx={{width:'70%',gap:'20px',display:'flex',flexDirection:'column',border:'1px solid rgba(0,0,0,0.3)',padding:'10px'}}>
              {carts && carts.map((item,index)=>(
                  <Box sx={{display:'flex',border:'1px solid rgba(0,0,0,0.1)',padding:'15px',height:'320px',gap:'40px',flexDirection:'column'}}>
                    <Box sx={{display:'flex',gap:'40px'}}>
                    <Skeleton variant='rectengular' sx={{width:'170px',height:'200px'}}/>
                    <Box sx={{display:'flex',flexDirection:'column',gap:'20px'}}>
                    <Skeleton variant='rectengular' sx={{width:'250px',height:'20px'}}/>
                    <Skeleton variant='rectengular' sx={{width:'200px',height:'20px'}}/>
                    <Skeleton variant='rectengular' sx={{width:'150px',height:'20px'}}/>
                    </Box>
                    </Box>

                    <Box sx={{display:'flex',gap:'20px'}}>
                    <Skeleton variant='rectengular' sx={{width:'250px',height:'30px'}}/>
                    <Skeleton variant='rectengular' sx={{width:'300px',height:'30px'}}/>
                      </Box>
                    </Box>
              ))}
              </Box>

:
             <Box  sx={{width:'70%',gap:'20px',display:'flex',flexDirection:'column',border:'1px solid rgba(0,0,0,0.3)',padding:'10px',boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>

                   <Box sx={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                    <Typography>BAG</Typography>
                       <Box sx={{display:'flex'}}>
                        <Typography sx={{fontSize:'12px'}}>{cartsPaginator.itemCount} Items |</Typography>
                        <Typography sx={{fontSize:'12px'}}>Total ₹{total}</Typography>
                       </Box>
                   </Box>


           {carts && carts.map((item,index)=>(
                <Box key={index} sx={{display:'flex',flexDirection:'column',border:'1px solid rgba(0,0,0,0.1)',padding:'15px',height:'320px',boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                    

                   <Box sx={{display:'flex',gap:'20px',marginTop:'10px',}}>
                       <Box sx={{display:'flex',flexDirection:'column',gap:'10px'}}>
                          <img src={item.products[0].productId.image}     
                          style={{width:'130px',height:'170px'}}/>
                          <Box sx={{display:'flex',justifyContent:'center'}}>
                          <Button variant='outlined' sx={{width:'100px',height:'30px'}}>STYLE IT</Button>
                          </Box>
                       </Box>

                       <Box>
                           <Typography sx={{fontSize:'18px',fontWeight:'600'}}>{item && item.products[0] && item.products[0].productId && item.products[0].productId.title && item.products[0].productId.title.longTitle}</Typography>
                           <Typography>Brand:WROGN</Typography>
                           <Typography>₹{item && item.products[0] && item.products[0].productId && item.products[0].productId.price && item.products[0].productId.price.cost}</Typography>
                       </Box>
                   </Box>
                   <Box sx={{display:'flex',width:'100%',marginTop:'20px'}}>
                    <Box sx={{width:'40%'}}>
                   <Button onClick={() => handleDelete( item.id)} variant='outlined' sx={{width:'100%'}}>REMOVE</Button>
                   <Backdrop open={backdrop} sx={{ color: '#ffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                   <CircularProgress color='inherit'/>
                   </Backdrop>
                   </Box>
                   <Button  variant='outlined'sx={{width:'70%'}}>MOVE TO WISHLIST</Button>
                   </Box>
              </Box>
))}



</Box>

           }



              <Box sx={{width:'40%',border:'1px solid rgba(0,0,0,0.3)',padding:'20px',height:'450px',boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
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
                 
                 <Button variant='contained' sx={{marginTop:'10px',width:'100%'}} onClick={() => router.push('/checkout')}>proceed to checkout</Button>
              </Box>
        </Box>


      </Box>
        <Box sx={{display:'flex',justifyContent:'center',padding:'30px'}}>
   <Pagination count={cartsPaginator && cartsPaginator.pageCount} page={page} onChange={handleChangePage} color='primary'/>

</Box>
    </>
  )
}

export default Block2
