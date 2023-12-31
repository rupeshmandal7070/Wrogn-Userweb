import React from 'react'


import { Box } from '@mui/system'
import { Typography, styled } from '@mui/material'
import { useRouter } from 'next/router'

const SliderContainer = styled("div")({
width:"100%",
height:"auto",
paddingRight:"0px",
background:'transparent',
// zIndex:"1",
// border:'1px solid black'
"@media (max-width: 900px)": {
    
},
"@media (max-width: 600px)": {
    
     },

})
const ImageContainer = styled("div")({
    display:"flex",
    width:'242px',
    alignItems:"center",
    // justifyContent:"center",
    flexDirection:"column",
    // margin:"10px 20px",
    background:'transparent',
    border:'1px solid rgba(0,0,0,0.2)',
    "@media (max-width: 900px)": {
      gap:'0px',
       width:'100%',
       padding:' 0px 5px',
       border:'none'
       },
    "@media (max-width: 600px)": {
       gap:'0px',
        width:'100%',
        padding:' 0px 5px',
        border:'none'
        },

})
const Image = styled("img")({
    width:"240px",
    height:"250px",
    objectFit:"cover",
    // margin:"40px",
    zIndex:"1",
    // border:'1px solid black',
    "@media (max-width: 900px)": {
       width:'240px',
       height:'250px',
       
       },
     
        "@media (max-width: 600px)": {
          width:'100%',
          height:'150px',
            
            },
           
})
const Head = styled("h3")({
    fontSize: "15px",
    fontWeight:"400",
    // textAlign:"center",
    marginBottom:"0px",
    "@media (max-width: 600px)": {
    //    fontSize: "23px",
       },
})
// const Para = styled("p")({
//     fontSize:"14px",
//     fontWeight:"600",
//     "@media (max-width: 600px)": {
//         fontSize: "12px",
//         },
// })
 const SliderItem = ({posterLinks}) => {
    // console.log(posterLinks)
    const router = useRouter();
  return (
    <>
      
    <SliderContainer>
     <ImageContainer onClick={() => router.push(`/tshirts/tshirts`)}>
         <Image src={posterLinks.image} />
         <Box sx={{width:{xs:'120px',sm:'200px',md:'240px'}}}>
          <Head style={{fontWeight:{xs:'300',sm:'400',md:'500'}}}>{posterLinks.tagline}</Head>
          </Box>
         <Box sx={{width:{xs:'120px',sm:'200px',md:'240px'},display:'flex',gap:{xs:'5px',sm:'10px',md:'20px'}}}>
         <Head style={{fontWeight:{xs:'200',sm:'400',md:'500'}}}>{posterLinks.price.mrp}</Head>
         <Head style={{fontWeight:{xs:'200',sm:'400',md:'500'},textDecoration:'line-through',color:'rgba(0,0,0,0.5)'}}>{posterLinks.price.cost}</Head>
         <Head style={{color:'red'}}>{posterLinks.price.discount}</Head>
         </Box>
     </ImageContainer>
    </SliderContainer>
    </>
  )
}

export default SliderItem