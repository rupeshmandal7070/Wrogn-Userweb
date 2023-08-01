import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/src/layouts/navbar/Navbar'

import Footer from '@/src/components/footer/Footer'
import Block1 from '@/src/contents/home/Block1/Block1'
import { Data1 } from '@/src/constants/Data1/Data1'
import Block2 from '@/src/contents/home/Block2/Block2'
import Block3 from '@/src/contents/home/Block3/Block3'
import { Data2 } from '@/src/constants/Data2/Data2'
import Block4 from '@/src/contents/home/Block4/Block4'
import { Data3 } from '@/src/constants/Data3/Data3'
import Block5 from '@/src/contents/home/Block5/Block5'
import { useSelector,useDispatch } from '@/src/redux/store/store'
import { useEffect, useState } from 'react'
import { getUser } from '@/src/redux/slices/auth'
import { readCart } from '@/src/redux/slices/cart'
import Cookies from 'js-cookie'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth)
  const [filters, setFilters] = useState({"isDeleted":false,"userId":user && user.user &&  user.user.id})


const fetchCarts = async() => {
 
  let result = await dispatch(readCart(1,10,filters))
  console.log(result)
  if(result)
return true
}  

const fetchToken =async()=>{

 
  if(Object.keys(user.user).length==0){
    let token = Cookies.get("authCookie");
    if(token!==undefined){
      localStorage.setItem("accessToken",token)
      await getUser()
    }
  }
}

useEffect(()=>{
fetchCarts()
fetchToken()
},[])
  return (
    <>

       <Navbar filters={filters} setFilters={setFilters}/> 
      
     <Block1 sliderData={Data1}/>
     <Block2 />
     <Block3 sliderData={Data2}/>
     <Block4 sliderData={Data3}/>
     <Block5/>
     <Footer/>

  
    </>
  )
}
