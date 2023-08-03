import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDispatch, useSelector } from '@/src/redux/store/store';
import { getProducts } from '@/src/redux/slices/product';
import { useRouter } from 'next/router';
import { productApi } from '@/src/mocks/product';

export default function ComboBox() {
const router = useRouter();
    const [query,setQuery] = useState('')
    const [productData,setProductData] = useState([]);

    const fetchproducts = async () => {
        let result = await productApi.getProducts(1,10,{"title.shortTitle":{"$regex":query,"$options":"i"}})

        if (result.status==='SUCCESS'){
             setProductData(result.data.data);
        } else{
          setProductData([]);
        }
    }
    // console.log(setProductData)
     useEffect(() => {
        fetchproducts();
     },[query])

  

  return (
    <Box sx={{position:'relative'}}>
      <Autocomplete size='small'

        
                          disablePortal
                          options={productData}
                          getOptionLabel={(product) => product.title.shortTitle}
                          onChange={(e,value) => value && router.push(`/tshirts/${value && value.title && value.title.shortTitle}`) } 
                        
                          renderInput={(params) => (
                            <TextField size='small'
                            onChange={(event, value) => setQuery(event.target.value)} 
                              fullWidth
                              name="shortTitle"
                              {...params}
                              label='Search here ...'
                              sx={{width:'300px' , "& fieldset": {borderRadius:'3px'}}}
                              
                            />
                           
                          )}                         
               />

    <Box sx={{position:'absolute',right:'0',top:'2px',background:'red',borderRadius:'0px 5px 5px 0px'}}>
        <Search sx={{fontSize:'33px'}}/>
    </Box>
    </Box>
  );
}