import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import {
  Button,
  Badge,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header({ scrollToSection }) {

  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [ location ])


  return (
    <>
    <div id='myNav' style={{ height: '50vh', backgroundColor: '#212529' }}>

      <div className='pt-5 mt-5'></div>
      <Link className="navbar-brand">
        <Badge bg="dark" variant="secondary" as={Button} onClick={ () => scrollToSection(0) }>
            Transcription List
        </Badge>
      </Link>

      <Link className="navbar-brand">
        <Badge bg="dark" variant="secondary" as={Button} onClick={ () => scrollToSection(1) }>
          {location.pathname === '/' ? ('Sample Transcription') : ('Transcription')}
        </Badge>
      </Link>
      <div className='pt-5 mt-5'></div>
      
    </div>
    </>
    
  );

};

export default Header;