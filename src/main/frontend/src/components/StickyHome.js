import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {

    const history = useNavigate();
    const handleRedirect = () => {
        
        // history('/');

        // Due to React's CSR native,
        // it's unable to fetch random documents on clicking 🏠 icon
        // Thus, go for replace("/") to force page refresh. Otherwise, history("/")
        window.location.replace("/") || history('/');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={handleRedirect}
            style={{
                zIndex: '999',
                position: 'fixed',
                top: '20px',
                left: '20px',
                backgroundColor: '#c4ff17',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                opacity: '0.4',
                padding: '10px',
                cursor: 'pointer',
            }}
        >
            <span style={{fontSize: '30px'}}>🏠</span>
        </button>
    );
};

export default HomeButton;
