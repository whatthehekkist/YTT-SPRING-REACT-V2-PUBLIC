import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TEXTS from '../local-data/Texts';


/**
* @param recommends props | an array having inner objects with the fields _id, videoId, title for content recommendation
*  - keyword similarities pre-generated using TfidfVectorizer and TruncatedSVD (scikit-learn, numpy) in django/python script
*  - saved to documents in the current mongoDB collection 
* @return keyword-based documment recommendations rendered using React Carousel on browser
*/ 
const SlickRecommendDocsByKeywords = ({ recommends }) => {

    const history = useNavigate();
    const [isDragging, setIsDragging] = useState(false);
    const randomIndex = Math.floor(Math.random() * recommends.length); // for slider

    // for recommendation heading
    const [recommendIndex, setRecommendIndex] = useState(0);
    useEffect(() => {
        setRecommendIndex(Math.floor(Math.random() * TEXTS.RECOMMEND.length));
    }, []);
        
    // function to send a GET request of a doc
	const fetchDocHandler = (id) => {
		(id) ? history(`/doc/${id}`) : alert(`error while routing to /doc/${id} ... try again.`);
	};

    // onclick handler
    // call the function fetchDocHandler() when user is not dragging the slick item
    const handleClick = (docId) => {
        if (!isDragging) {  
            fetchDocHandler(docId);
        }
    };

    // slick slider setting
    const settings = {
        initialSlide: randomIndex,
        dots: false,
        autoplay: true,
        speed: 500, 
        autoplaySpeed: 2000, 
        className: "center",
        // centerMode: true,
        // centerPadding: "0px",
        pauseOnHover: true, 
        cssEase: "linear",
        infinite: true,
        swipeToSlide: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false, 
        // adaptiveHeight: true,
        draggable : true,
        responsive: [
            {
                breakpoint: 1200, 
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        
        // drag event handler
        beforeChange: () => setIsDragging(true),
        afterChange: () => setIsDragging(false)
    };

    return (
        <div className='mt-3 pb-3 slider-container contianer'>
            <Slider {...settings}>
                { recommends.map(doc => (
                    <div key={ doc.docId } 
                         onClick={() => handleClick( doc.docId )}    
                    >
                        <Card
                            style={{ width: '11rem', cursor: 'pointer', position: 'relative', margin: '0 auto'}}
                            className='transcription-list-card'
                        >
                            <Card.Img 
                                variant="top" 
                                src={`https://img.youtube.com/vi/${doc.videoId}/mqdefault.jpg`} 
                                title={doc.title}
                                alt={doc.title}
                            />
                            <Card.Body>
                                <Card.Text className="text-center text-muted small">
                                    <span style={{display: 'block', marginBottom: '10px'}}>
                                        <Badge bg="light" text="muted">
                                            {TEXTS.RECOMMEND[recommendIndex]}
                                        </Badge> 
                                    </span>
                                    <span>{doc.title}</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SlickRecommendDocsByKeywords;


