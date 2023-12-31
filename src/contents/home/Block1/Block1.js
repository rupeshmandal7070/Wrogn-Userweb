import React from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


import SliderItem from './slider/SliderItem';
import {  ArrowCircleLeftOutlined, ArrowCircleRightOutlined, ChevronLeftOutlined, ChevronRightOutlined, } from '@mui/icons-material';

import { Box, Typography, styled } from '@mui/material';
import { useRouter } from 'next/router';
const SliderContainer = styled('div')({
width:"100%",
height:"auto",
// margin:"2% 0.3%",
overflow:"hidden",
backgroundColor:"transparent",
// boxShadow: "0 1px 5px rgba(104, 104, 104, 0.8)",
"@media (max-width: 900px)": {
//  margin:"2% -1.5%"


},
"@media (max-width: 600px)": {
    backgroundColor:'white',
    width:'100%'
 
 },


})
const SliderInnerContainer = styled('div')({
  display: "flex",
//   justifyContent:"center",
  // alignItems:'center',
  flexDirection:"column",
  // boxShadow: "0 1px 5px rgba(104, 104, 104, 0.8)",
  // padding:"20px 80px",
  "@media (max-width: 900px)": {
    backgroundColor:'white',
   padding:'0px'
 
 },
  "@media (max-width: 600px)": {
    backgroundColor:'white',
   padding:'0px',
 height:'280px'
 },
})


const PreviousBtn = (props) =>{
  const {className,onClick} = props;
  
   return (
         <div className={className} onClick={onClick}>
          <ChevronLeftOutlined sx={{color:'white',zIndex:'10',fontSize:'2.5rem',marginLeft:'0px' }} />
         </div>  
   )
}

const NextBtn = (props) =>{
   const {className,onClick} = props;
   return (
     <div  className={className} onClick={onClick}>
       <ChevronRightOutlined sx={{color:'white',  zIndex:'10',fontSize:'2.5rem',marginLeft:'0px'}} />
     </div>
   )
}


const Block1 = (props) => {
  
  const settings = {
    dots: true,
    arrows:true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    initialSlide:0,
    prevArrow:<PreviousBtn />,
    nextArrow:<NextBtn />,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 300,
            arrows:true,
          },
        },
         {
          breakpoint: 960,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 300,
            arrows:false,
            autoplay:true,
          },
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 300,
            arrows:false,
            autoplay:true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 300,
            arrows:false,
            autoplay:true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 300,
            arrows:false,
            autoplay:true,
            dots: true,
            infinite: true,
          },
        },
    ]
  };
  const router = useRouter()
  return (
    <>
     {/* <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'80px'}}>
       <Typography sx={{fontSize:{xs:'30px',sm:'35px',md:'45px'},fontWeight:'700',color:'black',paddingLeft:{xs:'10px',sm:'60px',md:'120px'}}}>NEW ARRIVALS</Typography>
       
       </Box> */}
    <SliderContainer>         
       <SliderInnerContainer onClick={() => router.push('/tshirts/tshirts')}>
    <Slider {...settings}>
     { props.sliderData.map((item)=>(
      <SliderItem posterLinks={item} />
      ))}
    </Slider>
      </SliderInnerContainer>  
    </SliderContainer>

      
    </>
  )
}

export default Block1