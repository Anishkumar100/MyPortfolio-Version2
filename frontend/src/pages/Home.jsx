import React from 'react'
import HomeBg from '../components/homeComponents/HomeBg'
import { Header } from '../components/indexComponents'

export const Home = () => {
  return (
    <>
    <main className='relative h-screen overflow-auto bg-[#111827] flex justify-center items-center  '>
      
      {/* Background */}
      <div className=' absolute inset-0 h-screen z-0'>
        <HomeBg />
      </div>

         {/* Foreground (Header) */}
      <div >
        <Header />
        <br/>
      </div>

    </main>

   
      
   </>
  )
}