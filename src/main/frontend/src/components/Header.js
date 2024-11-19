import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import VideoBackGround from './VideoBackGround';
import TEXTS from '../local-data/Texts';

function Header({ scrollToSection }) {

  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // for text content resolution at line 57
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
      {!isMobile ? ( <VideoBackGround /> ) : (
        <picture>
          <source srcSet="/images/kovaleva-static.webp" 
                  type="image/webp"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  alt="header bg img"
          />  
          <img src="/images/kovaleva-static.png" 
               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
               alt="header bg img" 
          />
        </picture>
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
            {location.pathname === '/' ? (TEXTS.TRANSCRIPTION.headingSample) : (TEXTS.TRANSCRIPTION.heading)}
          </h2>
        </Link>
        
      </div>
      
    </div>
    </>
    
  );

};

export default Header;