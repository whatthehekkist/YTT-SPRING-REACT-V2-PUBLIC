import React, { useEffect, useRef, useState } from 'react';

const FixedBackground = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [animate, setAnimate] = useState(false);
	const cardRefs = useRef([]);
	const [backgroundImage, setBackgroundImage] = useState({});

	// isMobile setter
	useEffect(() => {
		const userAgent = navigator.userAgent || navigator.vendor || window.opera;
		if (/Mobi|android|ip(hone|od|ad)|windows phone/i.test(userAgent)) {
			setIsMobile(true);
		}
	}, []);

	// animate setter for links to appear when its component top is visible on page
	useEffect(() => {
		const handleScroll = () => {
			cardRefs.current.forEach((card) => {
				if (card) {
					const { top } = card.getBoundingClientRect();
					if (top < window.innerHeight && top > 0) {
						setAnimate(true);
					}
				}
			});
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	// go webp or jpg for background image
	useEffect(() => {
        const webpImage = new Image(); // preload webp
        webpImage.src = '/images/bg-image.webp';
        webpImage.onload = () => {
            setBackgroundImage({
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(${webpImage.src})`,
            });
        };
        webpImage.onerror = () => {
            setBackgroundImage({
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url("/images/bg-image.jpg")',
            });
        };
    }, []);

	const backgroundStyle = {
		height: isMobile ? '70vh' : '100vh',
		backgroundAttachment: isMobile ? 'relative' : 'fixed',
		// backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url("/images/bg-image.jpg")',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		flexDirection: 'column',
	};

	const cardStyle = {
		opacity: animate ? 1 : 0,
		transform: animate ? 'translateY(0)' : 'translateY(20px)',
		transition: 'opacity 0.5s ease, transform 0.5s ease',
		backgroundColor: 'linear-gradient(135deg, #f3ec78, #af4261)', 
		padding: '20px',
		borderRadius: '12px',
		boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
		textAlign: 'center',
		width: isMobile ? '300px' : '450px',
		margin: '15px 0',
		transformOrigin: 'bottom',
		cursor: 'pointer',
		position: 'relative',
		overflow: 'hidden',
		textDecoration: 'none',
	};

	const cardHoverStyle = {
		transform: 'translateY(-5px) scale(1.05)',
		boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)',
		transition: 'transform 0.3s ease, box-shadow 0.3s ease',
	};

	const cardsData = [
		{
			link: "https://github.com/whatthehekkist/YTT-SPRING-REACT-V2-PUBLIC",
			title: "YTT (Spring, React) git",
			description: "public repo for current project"
		},
		{
			link: "https://ytt-v2.vercel.app/",
			title: "YTT (nodeJS)",
			description: "Legacy project in nodeJS"
		},
		{
			link: "https://dev-whatthehekkist.netlify.app/",
			title: "Blog",
			description: "some dirty records on CS study"
		},
	];

	// creates a link for each card by mapping the cardsData array.
	return (
		// apply a merged style by shallow-copying the objects backgroundStyle and backgroundImage
		<div style={{ ...backgroundStyle, ...backgroundImage }}>
			{cardsData.map((card, index) => (
				<a
					key={index}
					href={card.link}
					ref={el => cardRefs.current[index] = el}
					style={{
						...cardStyle,
						transitionDelay: `${index * 200}ms`,
					}}
					target='_blank'
					rel='noreferrer'
					onMouseEnter={e => {
						Object.assign(e.currentTarget.style, cardHoverStyle);
					}}
					onMouseLeave={e => {
						e.currentTarget.style.transform = 'translateY(0)'; 
						e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
					}}
				>
					<h2 style={{ color: '#ffffff' }}>{card.title}</h2>
					<p style={{ color: '#ffffff' }}>{card.description}</p>
				</a>
			))}
		</div>
	);
};

export default FixedBackground;
