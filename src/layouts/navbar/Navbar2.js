import React,{useEffect, useState} from 'react';

import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    styled,
    useTheme,
    Drawer,
    IconButton,
    Button,
    InputBase,
    Autocomplete,
    TextField,
    List,
    ListItemText,
    Badge,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Avatar,
    
    
  } from "@mui/material";

import { AccountCircle, Call, EastOutlined, ExpandMore, Favorite, FavoriteBorder, Help, Home, HomeOutlined, LocalCarWashOutlined, LocationCityRounded, Menu, PercentRounded, PercentTwoTone, Person2Outlined, Person3Outlined,  Redeem,  Search,  SearchOffOutlined,  ShoppingBag, ShoppingCart} from '@mui/icons-material';

// import MenuButtons from 'components/menuButtons/MenuButtons';
// import { Link } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/src/redux/slices/auth';


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
          
           
             
              // justifyContent:'space-between'
          },
        
        
    }));
    
    const Cart = styled(Box)`
    flex:1;
    `;
    
    
    const NavLeft = styled(Box)(({theme}) => ({
        
        // flex:'3',
        display: 'flex',
        gap:'30px', 
        marginLeft:'10px',
          // justifyContent: 'space-between',
        // paddingLeft:'30px',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            gap:"10px"
        },
        [theme.breakpoints.down('sm')]: {
            // paddingLeft:'0px',
            marginLeft:'0px',
            width:'250px'
        },
        
        
    }));
    const NavRight = styled(Box)(({theme}) => ({
       
        // flex:'3',
        display: 'flex',
         gap:'10px',
        // paddingRight:'30px',
           flexDirection:"row",
        alignItems: 'center',
        marginRight:'10px',
        // [theme.breakpoints.down('md')]: {
            //     justifyContent:"space-between"
            // },
            [theme.breakpoints.down('sm')]: {
              //  paddingRight:'0px',
              //  margin:'0px'
              //  display:'block',
              // marginRight:'50px',
                display:'none'
            },
            
            
        }));
       
     
      

const MenuButton = styled(IconButton)(({ theme }) => ({
    fontSize:'50px',
   
    margin:"0",
    padding:'0',
        
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
  // alignItems:'center',
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
    height:'60px',
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




export default function Navbar2() {

  const dispatch = useDispatch();
  const user = useSelector((state)=> state.auth.user);
  const {cartsPaginator} = useSelector((state)=> state.cart);
const fetchUser = async()=>{
  let result = await dispatch(getUser());
  if(result)
 console.log(user)
}
useEffect(()=>{
    fetchUser();
},[dispatch]);


    const arr = [{name:'title'},{name:'about'},{name:'contact'}]
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
      router.push("http://localhost:3000/")
    }

    const handleLogout = async () => {

      localStorage.removeItem('accessToken');
      await dispatch(logoutUser())
      router.push('/signup')
  }


  let userName= `${user && user.firstName && user.firstName}`
    const stringAvatar = (name) => {
      return {
        sx:{
             background:'green'
        },
       
        children : `${name.split(' ')[0][0]}`,
      };
    }
    
  return (
    <>
    
      <NavBar >
    
       <Box sx={{height:'70px',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <StyleToolbar>
        
        <NavLeft >
       
          
        <Box sx={{display:{xs:'flex',sm:'flex',md:'block'},cursor:'pointer'}} onClick={()=>router.push('/')}>
            <HomeOutlined sx={{color:'rgba(0,0,0,0.7)',fontSize:{xs:'30px',sm:'30px',md:'45px'}}}/>
           </Box>
        
          <Box >
          <Typography sx={{fontSize:{xs:'20px',sm:'20px',md:'30px'},fontWeight:'1000',color:'black'}}>WROGN</Typography>
          </Box>
         
               
            </NavLeft >
          
            <NavRight > 
            

            <Box sx={{display: {xs:'none',sm:'none',md:'block'}}}> 
           <SearchBar />
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

            <Typography onClick={() => router.push('/bag')} sx={{color:'black',display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'500',cursor:'pointer',gap:'5px'}}>
           <Badge badgeContent={cartsPaginator && cartsPaginator.itemCount} color='primary' sx={{'& .MuiBadge-badge':{right:'4px',top:'8px'}}}>
              <ShoppingCart sx={{color:'black',fontSize:{xs:'30px',sm:'30px',md:'30px'}}} />
            </Badge>
              Bag</Typography>
           
           
           </Box>

         
           
             

          
              
               
              
              
            </NavRight>
            
        </StyleToolbar>
        </Box>
       
       
   
<Divider/>
        <Navbar3>
         <Box >
            <MenuButton onClick={handleOpen}>
                <Menu sx={{display: {xs:'block',sm:'block',md:'none'},color:'black',fontSize:{xs:'20px',sm:'30px',md:'30px'}}}/>
            </MenuButton>
            <Drawer open={open} onClose={handleClose} sx={{position:'absolute'}}>
                {/* <MenuButtons setOpen={setOpen}/> */}
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
