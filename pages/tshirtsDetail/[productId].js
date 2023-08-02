import Footer from '@/src/components/footer/Footer'
import Block1 from '@/src/contents/tshirtsDetail/Block1/Block1'
import Block2 from '@/src/contents/tshirtsDetail/Block2/Block2'
import Navbar from '@/src/layouts/navbar/Navbar'
import { readCart } from '@/src/redux/slices/cart';
import { useDispatch, useSelector } from '@/src/redux/store/store';
// import Navbar2 from '@/src/layouts/navbar/Navbar2';

import React, { useEffect, useState } from 'react';

const Details = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)
  const [filters, setFilters] = useState({"isDeleted":false,"userId":user && user.user &&  user.user.id})
  const fetchCarts = async() => {
 
    let result = await dispatch(readCart(1,10,filters))
    console.log(result)
    if(result)
  return true
  }  

useEffect(()=>{
fetchCarts()
},[])
  return (
    <>
     <Navbar/>
      <Block1/>
      <Block2 />
      <Footer/>
    </>
  )
}

export default Details
