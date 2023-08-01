import Block1 from '@/src/contents/checkout/Block1'
import Navbar from '@/src/layouts/navbar/Navbar'
import { readCart } from '@/src/redux/slices/cart'
import { useDispatch, useSelector } from '@/src/redux/store/store'
import React, { useEffect } from 'react'
import { useState } from 'react'

const Checkout = () => {

  const user = useSelector((state)=> state.auth)
  const [filters,setFilters] = useState({"isDeleted":false,"userId":user && user.user &&  user.user.id})
const dispatch= useDispatch();
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
    </>
  )
}

export default Checkout
