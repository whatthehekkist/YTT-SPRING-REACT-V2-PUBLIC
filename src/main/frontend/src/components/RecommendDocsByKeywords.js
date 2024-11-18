import { Carousel, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/**
* @param recommends props | keyword-based recommend documents; _id, videoId, title
*  - keyword similarities pre-generated using TfidfVectorizer and TruncatedSVD (scikit-learn, numpy) in django/python script
*  - saved to documents in the current mongoDB collection 
* @return keyword-based documment recommendations rendered using React Carousel on browser
*/ 
const RecommendDocsByKeywords = ({ recommends }) => {

    const history = useNavigate();

    const fetchDocHandler = (id) => {
        if (id) {
            history(`/doc/${id}`);
        } else {
            (id) ? history(`/doc/${id}`) : alert(`error while routing to /doc/${id} ... try again.`);
        }
    };

    // function shuffling arrray elements
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // swap
        }
        return array;
    };

    // suffle indices in recommends
    const shuffledRecommends = shuffleArray([...recommends]);

    return (
        <div className='mt-3 pb-3'>
            <Carousel indicators={false} controls={true} touch={true}>
                {shuffledRecommends.map(doc => (
                    <Carousel.Item key={doc.docId}>
                        <div 
                            onClick={() => fetchDocHandler(doc.docId)} 
                            style={{ cursor: 'pointer' }}
                        >
                            <Card style={{ width: '65%', margin: '0 auto' }}>
                                <Card.Img 
                                    variant="top" 
                                    // className='img-fluid'
                                    src={`https://img.youtube.com/vi/${doc.videoId}/mqdefault.jpg`} 
                                    title={doc.title}
                                    alt={doc.title}
                                />
                                <Card.Body>
                                    <Card.Text className="text-center text-muted small">
                                        {doc.title}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default RecommendDocsByKeywords;
