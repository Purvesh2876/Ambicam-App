import '@/styles/globals.css'
import Image from 'next/image'
import logo from '@img/logo.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ChakraProvider,CSSReset  ,Skeleton, SkeletonCircle, SkeletonText,useBreakpointValue } from '@chakra-ui/react'

export default function App({ Component, pageProps }) {
  const [showLoader, setShowLoader] = useState(true);
  const [appInitialized, setAppInitialized] = useState(false);
  const [onOffStatus, setOnOffStatus] = useState(null);

  useEffect(() => {
    fetchOnOffStatus();
  }, []);

  const fetchOnOffStatus = async () => {
    try {
      const response = await axios.get('/api/ambicam', {
        params: { langflag: 'en' },
      });

      const { onOffStatus } = response.data;
      setOnOffStatus(onOffStatus);
    
  } catch (error) {
    console.error('Error:', error);
  }
};
  useEffect(() => {
    // Simulating app initialization delay
    const timer = setTimeout(() => {
      setShowLoader(false);
      setAppInitialized(true);
    }, isMobileView() ? 2000 : 0);


    return () => clearTimeout(timer);
  }, []);

  const isMobileView = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  };

  return (
    <>

   <ChakraProvider>
    
 {showLoader && (
        <div className="loader-container">
          
          <Image src={logo} alt="Loading Logo" className="loader-logo" />
          <Skeleton startColor='blue.200' endColor='blue.500' height='4px'>
             {/* span text is necessary for show SKeleton */}
              <span>Loading Ambicam</span>
          </Skeleton> 
        </div>
      )}

       {appInitialized && !showLoader && <Component {...pageProps} />}




      <style jsx>{`
        .loader-container {
          display: none;
        }

        @media (max-width: 768px) {
          .loader-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
        }

        .loader-logo {
          width: 100px;
          height: 100px;
        }

        .loader-time {
          margin-top: 10px;
        }
      `}</style>
</ChakraProvider>
<div>
      <h1>On/Off Status: {onOffStatus}</h1>
    </div> 
</>
);

};
