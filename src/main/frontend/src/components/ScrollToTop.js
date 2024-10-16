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
                padding: '5px',
                cursor: 'pointer',
                display: visible ? 'block' : 'none', // 버튼 표시 여부 결정
            }}
        >
            {/* <span style={{fontSize: '30px'}}>&uarr;</span> */}
            {/* <span style={{fontSize: '30px', fontWeight: 'bold'}}>^</span> */}
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-up" viewBox="0 0 16 16">
                    <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659"/>
                </svg>
            </span>

        </button>
    );
};

export default ScrollToTop;
