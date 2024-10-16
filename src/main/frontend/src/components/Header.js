import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
  
function Header({ scrollToSection }) {

  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // for text content resolution at line 52
  useEffect(() => {
    (!location.search) ? 
      console.log(location.pathname) : console.log(`${location.pathname}${location.search}`);

  }, [ location ]);

   // isMobile setter
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/Mobi|android|ip(hone|od|ad)|windows phone/i.test(userAgent)) {
        setIsMobile(true);
    }
  }, []);

  return (
    <>
    <div /*id='myNav'*/ className="nav-bg-video-attach" style={{ height: '100vh' , backgroundColor: '#212529' }}>
      
      <div className='overlay'></div>

      {/* if mobile, go for image instead of bg video */}
      {!isMobile ? (
          <video preload="metadata" autoPlay loop muted>
              <source src="/videos/kovaleva.mp4" type="video/mp4" />
              Your browser does not support the video tag.
          </video>
      ) : (
          <img src="/images/kovaleva-static.png" 
                alt="Background" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
      )}

      {/* navs */}
      <div className='content'>
        <Link>
          <h2 onClick={ () => scrollToSection(0) }>
              Transcription List
          </h2>
        </Link>
        <Link>
          <h2 onClick={ () => scrollToSection(1) }>
            {location.pathname === '/' ? ('Sample Transcription') : ('Transcription')}
          </h2>
        </Link>
        
      </div>
      
      
      
    </div>
    </>
    
  );

};

export default Header;