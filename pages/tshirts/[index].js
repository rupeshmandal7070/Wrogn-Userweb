// import Footer from '@/src/components/footer/Footer'
import Block1 from '@/src/contents/tshirts/Block1/Block1'
import Navbar from '@/src/layouts/navbar/Navbar'
import { readCart } from '@/src/redux/slices/cart'
import { useSelector } from '@/src/redux/store/store'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const Tshirt = () => {
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
      
      <Block1/>
     
    </>
  )
}

export default Tshirt
