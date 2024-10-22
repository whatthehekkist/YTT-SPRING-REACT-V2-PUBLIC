import React, { useEffect } from 'react';

const LoadingSpinner = ({ isLoading }) => {
  useEffect(() => {
    // disable scroll while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; // restore scroll on component unmount
    };
  }, [isLoading]);

  return (
    <div className="loader-wrapper">
      <span className="loader"><span className="loader-inner"></span></span>
      <div className="row text-center mt-2" style={{ color: "rgb(114, 119, 119)", fontSize: 20 }}>
        loading...
      </div>
    </div>
  );
};

export default LoadingSpinner;






/***
// ALT 
 import React from 'react';

const LoadingSpinner = () => {
  return (
    <div class="loader-wrapper">
    <span class="loader"><span class="loader-inner"></span></span>
    <div class="row text-center mt-2" style={{color:"rgb(114, 119, 119)", fontSize: 20}}>
      loading...
    </div>
  </div>
  );
};
export default LoadingSpinner;
***/

/***
// ALT 
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
  return (
    <div className=''>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  );
};

export default LoadingSpinner;
***/

/***
// ALT 
import React from 'react';
import Spinner from '../img/spinner.gif';

const LoadingSpinner = () => {
  return (
    <div className='loading-background'>
      <span>Loading...</span>
      <img src={Spinner} alt="loading-spinner" width="5%" />
    </div>
  );
};
export default LoadingSpinner;
 ***/