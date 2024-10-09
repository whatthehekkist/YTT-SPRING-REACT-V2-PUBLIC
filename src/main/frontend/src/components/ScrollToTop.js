import React, { useEffect, useState } from 'react';

const ScrollToTop = () => {

    const [visible, setVisible] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={handleScrollToTop}
            style={{
                zIndex: '999',
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: '#333',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                opacity: '0.8',
                // padding: '5px',
                cursor: 'pointer',
                display: visible ? 'block' : 'none', 
            }}
        >
            <span style={{fontSize: '30px'}}>&uarr;</span>
        </button>
    );
};

export default ScrollToTop;
