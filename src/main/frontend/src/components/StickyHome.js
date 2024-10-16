import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {

    const history = useNavigate();
    const handleRedirect = () => {
        
        //history('/');

        // Due to React's CSR native,
        // it's unable to fetch new random documents on clicking HOME icon
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
                backgroundColor: '#1f2221',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                opacity: '0.4',
                padding: '10px',
                cursor: 'pointer',
            }}
        >
            {/* https://icons.getbootstrap.com/icons/house/ */}
            <span style={{fontFamily: ('Oswald', 'sans-serif'), fontSize: '30px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                </svg>
            </span>
        </button>
    );
};

export default HomeButton;
