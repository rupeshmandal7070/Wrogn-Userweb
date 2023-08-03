import * as React from 'react';
import {Card, CardMedia, Typography, Box,useTheme,styled, Button, Popover, Divider, Slider, TextField, Pagination, Checkbox, Skeleton, Backdrop, CircularProgress} from '@mui/material';
import {  Favorite, FavoriteBorder,  } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Block2 from '../Block2/Block2';
import Block3 from '../Block3/Block3';
import { useEffect } from 'react';
import { getProducts,getProduct} from '@/src/redux/slices/product';
import Navbar from '@/src/layouts/navbar/Navbar';
import { useDispatch, useSelector } from '@/src/redux/store/store';
import { createCart, readCart } from '@/src/redux/slices/cart';



const CardBox = styled(Card)(({theme})=>({
    display:'flex',
    flexDirection:'column',
    width:'250px',
    height:'320px',
    borderRadius:'0px',
    gap:'30px',
    background:'white',
    cursor:'pointer',
  
    [theme.breakpoints.down('md')]: {
      width:'230px',
      height:'300px',
    },
    [theme.breakpoints.down('sm')]: {
      width:'170px',
      height:'270px',
      flexDirection:'column',
      padding:'0px'
    }
  }));
  const Box1= styled(Box)(({ theme }) => ({
    height:'650px',
    width:'100%',
    backgroundImage: `url(${"/images/category/bgdimg4.jpeg"})`,
    backgroundSize:'cover',
    paddingTop:'10px'
    // backgroundAttachment:'fixed'
    }
  ));
export default function Block1() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const {products,productsPaginator,product} = useSelector((state) => state.product);

  const {carts,cartsPaginator} = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const [filters,setFilters] = useState({$or:[{"category":router.query.index}]});
  const [page,setPage] = useState(1);
  const [limit,setLimit] = useState(12);
  const[skeletonstate,setSkeletonstate] = useState(true)
  const[backdrop,setBackdrop] = useState(false)
let query = {"isDeleted":false,"userId":user && user.user &&  user.user.id}

  const fetchproducts = async() => {
    setSkeletonstate(true)
     let result = await dispatch(getProducts(page,limit,filters))
     console.log(result)
     if(result)
     setSkeletonstate(false)
  }

  console.log(products)

  const fetchCarts = async() => {
    let result = await dispatch(readCart(1,10,query))
    console.log(result)
    if(result)
   return true
 }
  

 useEffect(() =>{
       fetchproducts()
       fetchCarts()
      
 },[page,filters])

 useEffect(()=>{
  console.log(router.query.index)
   setFilters({$or:[{"title.shortTitle":router.query.index},{"category":router.query.index}]})
 },[router.query.index])
  
  const [open,setOpen]=useState(false);
  
  const handleOpen = async (id)=>{
    await dispatch(getProduct(id))
    setOpen(true);
  };
  console.log(handleOpen)

  const handleClose = ()=>{
    setOpen(false);
  };
  
  const handleCart = async (productId)=>{
    setBackdrop(true)
       const data = {
        "userId":user.id,
        "products":[
            {
                "productId": productId,
                "qty": 1
            }
         ]
    }
    
    await dispatch(createCart(data))
    setBackdrop(false)
    
  };
 

  const handleClick = (id) => {
    router.push(`/tshirtsDetail/${id}`)
  };

  const handleChangePage = (event,value) =>{
      console.log(value);
      setPage(value);
  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  let heading = '';
  for(let j of products){
      heading = (j && j.category)
  }
  return ( 
  <>
  <Navbar filters={filters} setFilters={setFilters}/>
    <Box sx={{position:{xs:'static',sm:'static',md:'relative'},}}>

       <Typography sx={{fontSize:{xs:'25px',sm:'35px',md:'25px'},fontWeight:'500',color:'black',paddingTop:{xs:'20px',sm:'40px',md:'20px'},display:'flex',justifyContent:'center',paddingLeft:{xs:'0px',sm:'0px',md:'250px'}}}>{heading}</Typography>

       
      {skeletonstate ?
      <Box sx={{display:'flex',justifyContent:'center',gap:{xs:'10px',sm:'20px',md:'30px'},flexDirection:{xs:'row',sm:'row',md:'row'},paddingLeft:{xs:'0px',sm:'0px',md:'250px'},alignItems:'center',flexWrap:'wrap'}}>

       {products && products.length >0 && products.map((item,index) =>(

      <Box sx={{display:'flex',flexDirection:'column',gap:'10px'}}>

        <Skeleton variant='rectengular' sx={{width:'250px',height:'320px'}}/>
        <Skeleton variant='rectengular' sx={{width:'250px',height:'15px'}}/>
        <Skeleton variant='rectengular' sx={{width:'250px',height:'15px'}}/>
        </Box>
       ))}
       </Box>

:
    <Box   sx={{display:'flex',justifyContent:'center',gap:{xs:'10px',sm:'20px',md:'30px'},flexDirection:{xs:'row',sm:'row',md:'row'},paddingLeft:{xs:'0px',sm:'0px',md:'250px'},alignItems:'center',flexWrap:'wrap'}}>


      
 {products && products.length >0 && products.map((item,index) =>(
  
   
   <Box key={index}>
      <CardBox  sx={{position:'relative',"&:hover .button":{display:{xs:'none',sm:'none',md:'flex'}}}}>

        <Box onClick={() => handleClick(item.id)} sx={{height:{xs:'100%',sm:'100%',md:'100%'},width:{xs:'100%',sm:'100%',md:'100%'},}}>
        <CardMedia
        sx={{height:'100%'}}
          component="img"
          image={item.image}
          alt="green iguana"
        />
       </Box>
       <Box className={'button'} sx={{height:{xs:'auto',sm:'auto',md:'50px'},width:{xs:'auto',sm:'auto',md:'250px'},display:'none',background:'white',justifyContent:'center',gap:'5px',position:'absolute',bottom:'0px',alignItems:'center',border:'1px solid rgba(0,0,0,0.3)'}}>
        <Box>
           
   <Button onClick={() => handleOpen(item.id)} variant='contained' sx={{height:'35px',background:'black',zIndex:'100'}} >QUICKVIEW</Button>
        
   <Popover open={open} onClose={handleClose} 
  anchorOrigin={{
    vertical:'center',
    horizontal:'center'
  }}
  transformOrigin={{
    vertical:'center',
    horizontal:'center'
  }}
  sx={{boxShadow:'none'}}
   >
   <Block2 setOpen={setOpen} product= {product} handleClick={handleClick} user={user}/>
    
   </Popover>
        </Box>
<Box>
   <Button onClick={ () => handleCart(item.id)} variant='contained' sx={{height:'35px',background:'black'}}>ADDTOBAG</Button>
  <Backdrop open={backdrop} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <CircularProgress color='inherit'/>
  </Backdrop>
</Box>
   </Box>
      

     

      </CardBox>
   <Box sx={{width:{xs:'170px',sm:'auto',md:'auto'}}}>
     <Box sx={{display:'flex',gap:'5px',alignItems:'center'}}>
       <Typography sx={{fontSize:'13px',color:'black'}}>{item && item.title && item.title.shortTitle}</Typography>
       <Checkbox sx={{color:'red','&.Mui-checked': {color:'red'}}} {...label} icon={<FavoriteBorder />} size='small' checkedIcon={<Favorite />} />
     </Box>
     <Box sx={{display:'flex',gap:'20px',alignItems:'center'}}>
       <Typography>₹{item.price.cost}</Typography>
       <Typography sx={{textDecoration:'line-through',color:'rgba(0,0,0,0.5)'}}>₹{item.price.mrp}</Typography>
       <Typography sx={{fontSize:{xs:'8px',sm:'12px',md:'12px'},color:'red'}}>FLAT {item.price.discount} OFF</Typography>
     </Box>
   </Box>
      </Box>


))}

</Box>




}
      
<Box sx={{display:'flex',justifyContent:'center',padding:'30px'}}>
   <Pagination count={productsPaginator && productsPaginator.pageCount && productsPaginator.pageCount} page={page} onChange={handleChangePage} color='primary'/>

</Box>



<Box sx={{position:{xs:'static',sm:'static',md:'absolute'},top:'30px',marginLeft:'30px',display:{xs:'nome',sm:'none',md:'block'}}}>
<Box sx={{position:'fixed',overflowY:'scroll',height:'650px',width:'250px',display:{xs:'nome',sm:'none',md:'block'}}}>
<Block3 filters={filters}  setFilters={setFilters}/>

</Box>



</Box>


      
      </Box>
      </>
  );
}