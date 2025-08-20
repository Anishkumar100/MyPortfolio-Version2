import React, { useEffect,useState } from 'react'
import HomeBg from '../components/homeComponents/HomeBg'
import { Header } from '../components/indexComponents'


export const Home = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // This check runs once on the client-side to see if it's a mobile device.
    const mobileCheck = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);
  }, []);
  return (
    <>
      <main className='relative h-screen overflow-auto bg-[#111827] '>

        {/* Background */}
        <div className=' absolute inset-0 h-screen z-0'>
          <HomeBg
             // --- KEY PROPS FOR UNIVERSAL PERFORMANCE ---

        // 1. Tell the component to use the fast shader on mobile
        mobile={isMobile}
        
        // 2. Render at a lower resolution on mobile for a massive FPS boost
        resolutionScale={isMobile ? 0.75 : 1.0}

        // All other props work as expected
        density={1.0}
        mouseRepulsion={true}/>
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