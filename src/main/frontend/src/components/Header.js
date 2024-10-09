import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import {
  Button,
  Badge,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header({ scrollToSection }) {

  // for text content resolution at line 42
  const location = useLocation();
  useEffect(() => {

    (!location.search) ? 
      console.log(location.pathname) : console.log(`${location.pathname}${location.search}`);

  }, [ location ])


  return (
    <>
    <div id='myNav' style={{ height: '50vh', backgroundColor: '#212529' }}>

      <div className='pt-5 mt-5'></div>
      <Link className="navbar-brand">
        <Badge bg="dark" 
               variant="secondary" 
               as={Button} 
               onClick={ () => scrollToSection(0) } // init scrollToSection value 
        > 
            Transcription List
        </Badge>
      </Link>

      <Link className="navbar-brand">
        <Badge bg="dark" 
               variant="secondary" 
               as={Button} 
               onClick={ () => scrollToSection(1) } // init scrollToSection value 
        > 
          {location.pathname === '/' ? ('Sample Transcription') : ('Transcription')}
        </Badge>
      </Link>
      <div className='pt-5 mt-5'></div>
      
    </div>
    </>
  
  );

};

export default Header;