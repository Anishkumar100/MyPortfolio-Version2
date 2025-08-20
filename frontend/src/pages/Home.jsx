import React, { useEffect } from 'react'
import HomeBg from '../components/homeComponents/HomeBg'
import { Header } from '../components/indexComponents'


export const Home = () => {


  return (
    <>
      <main className='relative h-screen overflow-auto bg-[#111827] '>

        {/* Background */}
        <div className=' absolute inset-0 h-screen z-0'>
          <HomeBg
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1.5}
            glowIntensity={0.5}
            saturation={0.8}
            hueShift={240} />
        </div>

        {/* Foreground (Header) */}
        <div >
          <Header />
          <br />
        </div>

      </main>



    </>
  )
}