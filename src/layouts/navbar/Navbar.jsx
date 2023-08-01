import React,{useEffect, useState} from 'react';

import {
    AppBar,
    Box,
   
    Typography,
    styled,
    useTheme,
    Drawer,
    IconButton,
    Button,
   
    Badge,
    Divider,
   
    Avatar,
    
    
  } from "@mui/material";

import {  HomeOutlined,  Menu,  Person2Outlined,  Search,  ShoppingBag,  ShoppingCart} from '@mui/icons-material';


import SearchBar from '../searchbar/SearchBar';
import { useRouter } from 'next/router';
import { useSelector,useDispatch } from '@/src/redux/store/store'

import { getUser, logoutUser } from '@/src/redux/slices/auth';
import { readCart } from '@/src/redux/slices/cart';
import Cookies from 'js-cookie';
import SideBar from '../sidebar/SideBar';


const StyleToolbar = styled(Box)(({theme}) => ({
  height:'80px',
  width:'100%',
    display: 'flex',
    justifyContent:'space-between',
    alignItems: 'center',
  background:'white',
    [theme.breakpoints.down('md')]: {
        height: '50px',
        
        },
        
        [theme.breakpoints.down('sm')]: {
          height: '40px',
          width:'100%',
          
        
          },
        
        
    }));
    
    const Cart = styled(Box)`
    flex:1;
    `;
    
    
    const NavLeft = styled(Box)(({theme}) => ({
        
       
        display: 'flex',
        gap:'30px', 
        marginLeft:'10px',
         
      
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            gap:"10px"
        },
        [theme.breakpoints.down('sm')]: {
          
            marginLeft:'0px',
            width:'250px'
        },
        
        
    }));
    const NavRight = styled(Box)(({theme}) => ({
       
      
        display: 'flex',
         gap:'10px',
        
           flexDirection:"row",
        alignItems: 'center',
        marginRight:'10px',
      
            [theme.breakpoints.down('sm')]: {
            
                display:'none'
            },
            
            
        }));
       
     
      

const MenuButton = styled(IconButton)(({ theme }) => ({
    fontSize:'50px',
   
    margin:"0",
    padding:'0',
        
    }
));
const Navbar2 = styled(Box)(({ theme }) => ({
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'white',
  height:'40px',
  width:'100%',
  position:'sticky',
  flexDirection:'row',
  gap:'30px',
  border:'1px solid rgba(0,0,0,0.1)',
  zIndex:'0',
  [theme.breakpoints.down('md')]: {
    display:'none'
      
  },
  [theme.breakpoints.down('sm')]: {
    display:'none'
      
  },
      
  }
));
const Navbar3 = styled(Box)(({ theme }) => ({
display:'none',

[theme.breakpoints.down('md')]: {
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  background:'white',
  height:'40px',
    padding:'0px 20px',
   position:'sticky'
},
  
  [theme.breakpoints.down('sm')]: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    background:'white',
    height:'50px',
      padding:'0px 20px',
     position:'sticky'
  },
      
  }
));

const Downnav = styled(Box)(({ theme }) => ({
  height:'680px',
  width:'100%',
  display:'flex',
  justifyContent:'center',
  flexDirection:'column',
  backgroundColor:'transparent',
  paddingLeft:'50px',
  [theme.breakpoints.down('sm')]: {
    paddingLeft:'0px',
     gap:'30px'
 },
      
  }
));

const NavBar = styled(AppBar)(({theme}) =>({
   
    background:'white',
    width:'100%',
    height:'110px',
    margin:"0",
    padding:'0',
    // zIndex:'100',
position:'sticky',
[theme.breakpoints.down('md')]: {
  height:'90px',
  width:'100%',
 
},

[theme.breakpoints.down('sm')]: {
  height:'90px',
  width:'100%',
 
},

}));



export default function Navbar({filters={} , setFilters}) {

  const dispatch = useDispatch();
  const user = useSelector((state)=> state.auth.user);
  const {cartsPaginator} = useSelector((state)=> state.cart);
  const [deletes, setDeletes] = useState({"isDeleted":false,"userId":user && user.user &&  user.user.id})
  
const fetchUser = async()=>{
  let result = await dispatch(getUser());
  if(result)
 console.log(user)
}

const fetchCarts = async() => {
 
  let result = await dispatch(readCart(1,10,deletes))
  console.log(result)
  if(result)
return true
} 


useEffect(()=>{
    fetchUser();
    fetchCarts();
},[]);


    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleOpen = ()=>{
        setOpen(true);
    };

    const handleClose = ()=>{
        setOpen(false);
    };


    const router = useRouter();
    const handleClick = (e) => {
      e.preventDefault()
      router.push("/")
    }

    const handleTshirt = (query) => {
       
      router.push(`/tshirts/${query}`)
     setFilters({...filters,"category":query})
     console.log('hello')
    }
 
    const handleLogout = async () => {

      localStorage.removeItem('accessToken');
      Cookies.remove('authCookie')
      await dispatch(logoutUser())
      router.push('/signup')
  }

  let userName= `${user && user.firstName && user.firstName}`
  // let name = 'rupesh'
  const stringAvatar = (name) => {
    return {
      children : `${name.split('')[0][0]}`,
      sx:{
           background:'green'
      },
     
    };
  }
    
  return (
    <>
    
      <NavBar >
    
       <Box sx={{height:'70px',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <StyleToolbar>
        
        <NavLeft >
       
          
        <Box sx={{display:{xs:'flex',sm:'flex',md:'block'},cursor:'pointer'}} onClick={handleClick}>
            <HomeOutlined sx={{color:'rgba(0,0,0,0.7)',fontSize:{xs:'30px',sm:'30px',md:'45px'}}}/>
           </Box>
        
          <Box >
          <Typography sx={{fontSize:{xs:'20px',sm:'20px',md:'30px'},fontWeight:'1000',color:'black'}}>WROGN</Typography>
          </Box>
         
               
            </NavLeft >
          
            <NavRight > 
            

            <Box sx={{display: {xs:'none',sm:'none',md:'block'}}}> 
           <SearchBar filters={filters}  setFilters={setFilters}/>
          </Box>
        <Box sx={{display:{xs:'none',sm:'none',md:'flex'},gap:'30px'}}>

          
            <Box  sx={{cursor:'pointer',position:'relative',"&:hover .list":{display:'flex'}}}>


            <Typography onClick={() => router.push('/myAccount')} sx={{color:'black',display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'500'}}>
              <Avatar {...stringAvatar(userName)}/>{user && user.firstName && user.firstName}
              <Typography sx={{display:Object.keys(user).length!==0?'none':'flex'}}>My Account</Typography>
              </Typography>


            <Box  className={'list'} sx={{position:'absolute',display:'none',flexDirection:'column',width:'250px',background:'white',right:'0px',height:'auto',  zIndex:'100',border:'1px solid rgba(0,0,0,0.3)',top:'32px',borderRadius:'5px'}}>

                <Box sx={{margin:'20px'}}>
                 <Typography sx={{color:'black',fontSize:'16px',fontWeight:'600'}}>Welcome {user.firstName} {user.lastName}!</Typography>


                 <Box sx={{display:Object.keys(user).length!==0?'none':'flex',gap:'10px'}}>
                   
                    <Button onClick={() => router.push("/login")} variant='outlined' sx={{color:'black',fontSize:'12px',height:'35px',borderRadius:'5px'}}>SIGN IN</Button>
                  

                   
                    <Button onClick={() => router.push("/signup")} variant='outlined' sx={{color:'black',fontSize:'12px',height:'35px',borderRadius:'5px'}}>REGISTER</Button>
                    
                 </Box>

                 <Box sx={{display:Object.keys(user).length!==0?'flex':'none',gap:'10px'}}>
                   
                   <Button onClick={() => router.push("/myAccount")} variant='outlined' sx={{color:'black',fontSize:'12px',height:'35px',borderRadius:'5px'}}>MyAccount</Button>
                 

                  
                   <Button onClick={handleLogout} variant='outlined' sx={{color:'black',fontSize:'12px',height:'35px',borderRadius:'5px'}}>Logout</Button>
                   
                </Box>


                </Box>
                
                <Divider/>
                <Typography onClick={() => router.push('/orders')} sx={{fontWeight:'600',fontSize:'16px',padding:'15px',color:'black'}}>Orders</Typography>
                <Divider/>
                <Typography sx={{fontWeight:'600',fontSize:'16px',padding:'15px',color:'black'}}>Wishlist</Typography>
                <Divider/>

                <Typography sx={{fontWeight:'600',fontSize:'16px',padding:'15px',color:'black'}}>Coupons</Typography>
               <Divider/>

                <Typography sx={{fontWeight:'600',fontSize:'16px',padding:'15px',color:'black'}}>Saved Address</Typography>
                <Divider/>

                 <Typography sx={{fontWeight:'600',fontSize:'16px',padding:'15px',color:'black'}}>Contact Us</Typography>
                <Divider/>

                   <Typography  sx={{fontWeight:'600',fontSize:'16px',padding:'15px',color:'black'}}>FAQs</Typography>
                <Divider/>
            </Box>
            </Box>

            <Box onClick={() => router.push('/bag')} sx={{color:'black',display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'500',cursor:'pointer',gap:'2px'}}>
           <Badge badgeContent={cartsPaginator && cartsPaginator.itemCount &&  cartsPaginator.itemCount} color='primary' sx={{'& .MuiBadge-badge':{right:'4px',top:'8px'}}}>
              <ShoppingCart sx={{color:'black',fontSize:{xs:'30px',sm:'30px',md:'30px'}}} />
            </Badge>
              Bag</Box>
           
           </Box>

         
           
             

          
              
               
              
              
            </NavRight>
            
        </StyleToolbar>
        </Box>
       
        <Navbar2>
               <Box sx={{cursor:'pointer',position:'relative',"&:hover .list":{display:'flex'}}}>
              <Typography sx={{color:'black',fontWeight:'600',fontSize:'14px'}}>TOP WEAR</Typography>
                 <Box className={'list'} sx={{position:'absolute',display:'none',flexDirection:'column',width:'180px',background:'white',left:'0px',height:'auto',  zIndex:'100',border:'1px solid rgba(0,0,0,0.3)',borderRadius:'5px',padding:'20px',gap:'10px'}}>
                      <Typography onClick={() => handleTshirt('tshirts')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}>T SHIRTS</Typography>
                      <Typography onClick={() => handleTshirt('shirts')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}> SHIRTS</Typography>
                      
                      <Typography onClick={() => handleTshirt('sweater')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}>SWEATERS</Typography>
                      <Typography onClick={() => handleTshirt('jacket')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}>JACKETS</Typography>
                 </Box>
               </Box>


               <Box sx={{cursor:'pointer',position:'relative',"&:hover .list":{display:'flex'}}}>
              <Typography sx={{color:'black',fontWeight:'600',fontSize:'14px'}}>BOTTOM WEAR</Typography>
                 <Box className={'list'} sx={{position:'absolute',display:'none',flexDirection:'column',width:'180px',background:'white',left:'0px',height:'auto',  zIndex:'100',border:'1px solid rgba(0,0,0,0.3)',borderRadius:'5px',padding:'20px',gap:'10px'}}>
                      <Typography onClick={() => handleTshirt('jeans')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}>JEANS</Typography>
                      <Typography onClick={() => handleTshirt('joggers')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}>JOGGERS</Typography>
                      
                 </Box>
               </Box>
             

               <Box sx={{cursor:'pointer'}}>
              <Typography onClick={() => handleTshirt('footwear')} sx={{color:'black',fontWeight:'600',fontSize:'14px'}}>FOOT WEAR</Typography>
                
               </Box>

               <Box sx={{cursor:'pointer'}}>
              <Typography onClick={() => handleTshirt('accessories')} sx={{color:'black',fontWeight:'600',fontSize:'14px'}}>ACCESSORIES</Typography>
                
               </Box>
             
              
             

               <Box sx={{cursor:'pointer',position:'relative',"&:hover .list":{display:'flex'}}}>
              <Typography sx={{color:'black',fontWeight:'600',fontSize:'14px'}}>NEW ARRIVALS</Typography>
                 <Box className={'list'} sx={{position:'absolute',display:'none',flexDirection:'column',width:'180px',background:'white',left:'0px',height:'auto',  zIndex:'100',border:'1px solid rgba(0,0,0,0.3)',borderRadius:'5px',padding:'20px',gap:'10px'}}>
                      <Typography onClick={() => handleTshirt('tshirts')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}>T SHIRTS</Typography>
                      <Typography onClick={() => handleTshirt('shirts')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}> SHIRTS</Typography>
                      
                      <Typography onClick={() => handleTshirt('jeans')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}>JEANS</Typography>
                      <Typography onClick={() => handleTshirt('jacket')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}>JACKETS</Typography>
                 </Box>
               </Box>
             

               <Box sx={{cursor:'pointer',position:'relative',"&:hover .list":{display:'flex'}}}>
              <Typography sx={{color:'black',fontWeight:'600',fontSize:'14px'}}>BEST SELLER</Typography>
                 <Box className={'list'} sx={{position:'absolute',display:'none',flexDirection:'column',width:'180px',background:'white',left:'0px',height:'auto',  zIndex:'100',border:'1px solid rgba(0,0,0,0.3)',borderRadius:'5px',padding:'20px',gap:'10px'}}>
                 <Typography onClick={() => handleTshirt('footwear')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}>FOOT WEAR</Typography>
                      <Typography onClick={() => handleTshirt('shirts')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}> SHIRTS</Typography>
                      
                      <Typography onClick={() => handleTshirt('jeans')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}>JEANS</Typography>
                      <Typography onClick={() => handleTshirt('jacket')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}>JACKETS</Typography>
                 </Box>
               </Box>
             

               <Box sx={{cursor:'pointer',position:'relative',"&:hover .list":{display:'flex'}}}>
              <Typography sx={{color:'black',fontWeight:'600',fontSize:'14px'}}>TRENDING</Typography>
                 <Box className={'list'} sx={{position:'absolute',display:'none',flexDirection:'column',width:'180px',background:'white',left:'0px',height:'auto',  zIndex:'100',border:'1px solid rgba(0,0,0,0.3)',borderRadius:'5px',padding:'20px',gap:'10px'}}>
                      <Typography onClick={() => handleTshirt('tshirts')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}>T SHIRTS</Typography>
                      <Typography onClick={() => handleTshirt('shirts')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}> SHIRTS</Typography>
                      
                      <Typography onClick={() => handleTshirt('jeans')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}>JEANS</Typography>
                      <Typography onClick={() => handleTshirt('accessories')} sx={{color:'black',fontWeight:'600',fontSize:'13px'}}>ACCESSORIES</Typography>
                 </Box>
               </Box>
             
            
             
        </Navbar2>
   
<Divider/>
        <Navbar3>
         <Box >
            <MenuButton onClick={handleOpen}>
                <Menu sx={{display: {xs:'block',sm:'block',md:'none'},color:'black',fontSize:{xs:'20px',sm:'30px',md:'30px'}}}/>
            </MenuButton>
            <Drawer open={open} onClose={handleClose} sx={{position:'absolute'}}>
               <SideBar/>
            </Drawer>
           
            </Box>
            <Box sx={{display:'flex',gap:'20px'}}>
         <Search sx={{color:'black',fontSize:{xs:'20px',sm:'30px',md:'30px'}}}/>
         
         <Person2Outlined sx={{color:'black',fontSize:{xs:'20px',sm:'30px',md:'30px'}}}/>
        
         <ShoppingBag sx={{color:'black',fontSize:{xs:'20px',sm:'30px',md:'40px'}}} />
         </Box>
         </Navbar3>
        </NavBar>
     

       


      
        </>
       
     
    
  )
}
