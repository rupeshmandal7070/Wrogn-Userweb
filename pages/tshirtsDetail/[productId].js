import Footer from '@/src/components/footer/Footer'
import Block1 from '@/src/contents/tshirtsDetail/Block1/Block1'
import Block2 from '@/src/contents/tshirtsDetail/Block2/Block2'
import Navbar from '@/src/layouts/navbar/Navbar'
// import Navbar2 from '@/src/layouts/navbar/Navbar2';

import React, { useEffect, useState } from 'react';

const Details = () => {
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
