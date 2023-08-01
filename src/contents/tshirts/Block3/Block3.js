

import { Box, Checkbox, Divider, Slider, Typography, colors } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Block3 = ({filters,setFilters}) => {

  const handleChangeQuery = async (value) =>{
    let query = {"category":value}
    console.log({...filters})
    setFilters({...query})
    console.log(setFilters)
  }

  const handleChangeColor = async(value) => {
       let color = {"subCategory":value}
       setFilters({...filters,...color})
  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const [value,setValue] = useState(15)
  const customPrice = [
    {
      value: 15,
      label: '₹1000',
    },
    {
      value: 30,
      label: '₹2000',
    },
    {
      value: 45,
      label: '₹3000',
    },
    {
      value: 70,
      label: '₹4000',
    },
    {
      value: 90,
      label: '₹5000',
    },
    
  ];
  const changeValue = (event, value) => {
    setValue(value);
  };
  return (
    <Box >
      <Box sx={{display:{xs:'nome',sm:'none',md:'flex'},justifyContent:'space-between'}}>
  <Typography sx={{fontSize:'16px'}}>FILTERS</Typography>
  <Typography sx={{fontSize:'12px',color:'blue'}}>Clear all</Typography>
</Box>
<Typography sx={{fontSize:'14px',fontWeight:'500',margin:'5px 0px'}}>Catogeries</Typography>
<Box sx={{marginBottom:'15px'}}>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'0px'}}><Checkbox name='hello' value='a' onClick={() => handleChangeQuery("tshirts")}  {...label} size='small' sx={{height:'20px'}}/>tshirts</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox name='hello' value='b' onClick={() => handleChangeQuery("shirts")}  {...label} size='small' sx={{height:'20px'}}/>Shirts</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox name='hello' value='c' onClick={() => handleChangeQuery("jacket")}  {...label} size='small' sx={{height:'20px'}}/>Jackets</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox name='hello' value='d' onClick={() => handleChangeQuery("jeans")}  {...label} size='small' sx={{height:'20px'}}/>Jeans</Typography>
  <Typography sx={{fontSize:'14px',color:'blue',marginLeft:'20px'}}> 
 +view more
      </Typography>
</Box>
<Divider/>


<Typography sx={{fontSize:'14px',fontWeight:'500',margin:'5px 0px'}}>Price Range</Typography>
<Box sx={{marginBottom:'20px'}}>
<Slider 
min={1000}
max={5000}
step={5}
value={value}
marks={customPrice}
onChange={changeValue}
valueLabelDisplay='auto'

sx={{color:'blue',padding:'10px'}} />
<Box sx={{display:'flex',justifyContent:'space-between'}}>
  <input style={{height:'30px',width:'60px'}} type='text' placeholder='min'/>
  <input style={{height:'30px',width:'60px'}} type='text' placeholder='3000+'/>

</Box>
</Box>
<Divider/>

<Typography sx={{fontSize:'14px',fontWeight:'500',margin:'5px 0px'}}>Color</Typography>
<Box sx={{marginBottom:'15px'}}>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox onClick = {() => handleChangeColor('white')} {...label} size='small' sx={{height:'20px'}}/>white</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox onClick = {() => handleChangeColor('black')} {...label} size='small' sx={{height:'20px'}}/>black</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox onClick = {() => handleChangeColor('blue')} {...label} size='small' sx={{height:'20px'}}/>blue</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox onClick = {() => handleChangeColor('yellow')} {...label} size='small' sx={{height:'20px'}}/>yellow</Typography>
  <Typography sx={{fontSize:'14px',color:'blue',marginLeft:'20px'}}>+View More</Typography>
</Box>
<Divider/>


<Typography sx={{fontSize:'14px',fontWeight:'500',margin:'5px 0px'}}>Sleeve</Typography>
<Box sx={{marginBottom:'15px'}}>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Full Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'14px',color:'blue',marginLeft:'20px'}}>+View More</Typography>
</Box>
<Divider/>





<Typography sx={{fontSize:'14px',fontWeight:'500',margin:'5px 0px'}}>Size</Typography>
<Box sx={{marginBottom:'15px'}}>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>S</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>M</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>L</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>XL</Typography>
  <Typography sx={{fontSize:'14px',color:'blue',marginLeft:'20px'}}>+View More</Typography>
</Box>
<Divider/>


<Typography sx={{fontSize:'14px',fontWeight:'500',margin:'5px 0px'}}>Fabric</Typography>
<Box sx={{marginBottom:'15px'}}>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'14px',color:'blue',marginLeft:'20px'}}>+View More</Typography>
</Box>
<Divider/>

<Typography sx={{fontSize:'14px',fontWeight:'500',margin:'5px 0px'}}>Neck</Typography>
<Box sx={{marginBottom:'15px'}}>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>round</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>V shape</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'14px',color:'blue',marginLeft:'20px'}}>+View More</Typography>
</Box>
<Divider/>


<Typography sx={{fontSize:'14px',fontWeight:'500',margin:'5px 0px'}}>Fit</Typography>
<Box sx={{marginBottom:'15px'}}>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'14px',color:'blue',marginLeft:'20px'}}>+View More</Typography>
</Box>
<Divider/>








<Typography sx={{fontSize:'14px',fontWeight:'500',margin:'5px 0px'}}>Pattern</Typography>
<Box sx={{marginBottom:'15px'}}>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'14px',color:'blue',marginLeft:'20px'}}>+View More</Typography>
</Box>
<Divider/>

<Typography sx={{fontSize:'14px',fontWeight:'500',margin:'5px 0px'}}>Discounts</Typography>
<Box sx={{marginBottom:'15px'}}>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><Checkbox  {...label} size='small' sx={{height:'20px'}}/>Half Sleeve</Typography>
  <Typography sx={{fontSize:'14px',color:'blue',marginLeft:'20px'}}>+View More</Typography>
</Box>
<Divider/>

    </Box>
  )
}

export default Block3
