import Block1 from '@/src/contents/payment/Block1'
import { readCart } from '@/src/redux/slices/cart'
import { useDispatch, useSelector } from '@/src/redux/store/store'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const index = () => {
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

export default index
