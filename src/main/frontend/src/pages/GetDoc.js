import React, { useContext, useState, useEffect, forwardRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Accordion,
    // Button,
    Card, CardGroup,
    Row, Col
} from 'react-bootstrap';
import LoadingSpinner from '../components/Spinner';
import ScrollToTranscription from '../components/ScrollToTranscription';
import TEXTS from '../local-data/Texts';
import ImageEmbed from '../components/ImageEmbed';
// import YouTubeEmbed from '../components/VideoEmbed';

// context having data (random documents)
import { RandomDocumentsContext } from '../context/RandomDocContext';



const GetDoc = forwardRef(({ refs }) => {
    
    // reference RandomDocumentsContext
    const { randomDocs, loadingRandomDocs, errorRandomDocs } = useContext(RandomDocumentsContext);

    // extract value of query param
    const history = useNavigate();
    const propsParam = useParams();
    const id = propsParam.id;
    console.log("at GetDoc.js: ", id);

    // init doc and fetch data from the endpoint /doc?id=id in Spring
    const [doc, setDocument] = useState([]);
    const [loading, setLoading] = useState(true); // true initially
    const [error, setError] = useState(null); // null initially

    useEffect(() => {

        const fetchDocuments = async () => {

            try {

                // const response = await axios.get(`/doc/${id}`);

                // req with query string
                const response = await axios.get('/doc', {
                    params: { id }
                });

                setDocument(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("Error fetching documents:", error); 
                setError(error); 
            } finally {
                setLoading(false);
            }
        };
        
        fetchDocuments();

    }, [id]);

    // function to send a GET request of a doc 
    const fetchDocHandler = (id) => {
        
        (id) ? history(`/doc/${id}`) : alert("something went wrong..try again.");   
    };

    if (loadingRandomDocs || loading) return (<div><LoadingSpinner /></div>);
    if (errorRandomDocs) {
        return <div>Error fetching random documents: {errorRandomDocs.message}</div>;
    }
    if (error) {
        return <div>Error fetching document: {error.message}</div>;
    }

    return (
        <>
            <ScrollToTranscription/>

            {/* render data using RandomDocumentsContext */}
            <div className='bg-attach-transcription-list'>
                <Container>
                    <div ref={refs[0]} className='text-center'>
                        <h1 className='pt-5 pb-4'>{TEXTS.TRANSCRIPTION_LIST.heading}</h1>
                        <p>
                            {TEXTS.TRANSCRIPTION_LIST.desc1}<br/>
                            {randomDocs ? (randomDocs.length) : ('Multiple')} {TEXTS.TRANSCRIPTION_LIST.desc2}
                        </p>

                        <div className='container mt-5 pb-5'>
                            <Row className='justify-content-center g-4'>
                                {randomDocs && randomDocs.length > 0 ? (
                                            randomDocs.map((doc, index) => (
                                    
                                    <Col xs={12} sm={6} md={4} key={index} className="d-flex justify-content-center mx-5 mb-4"> {/* xs: 1열, sm: 2열, md: 3열 */}
                                        <CardGroup>
                                                            
                                            <Card style={{ width: '18rem',  cursor: 'pointer' }} 
                                                    onClick={ () => fetchDocHandler(doc.id) } 
                                                    className='transcription-list-card'
                                            >
                                                <Card.Img variant="top" src={`https://img.youtube.com/vi/${doc.videoId}/hqdefault.jpg`} />
                                                    <Card.Body>
                                                        <Card.Text>{doc.title}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                                        
                                        </CardGroup>
                                    </Col>
                                ))) : (
                                    <p>No random documents found.</p>
                                )}
                                
                            </Row>
                        </div>
                    </div>
                </Container>
            </div>

            {/* a specific doc response on user request   */}
            <div className='bg-transcription transcription' id="transcription">
                <Container className="pb-5 container">
                    
                    <h1 ref={refs[1]} className="pt-5 pb-4 text-center text-white">{TEXTS.TRANSCRIPTION.heading}</h1>
                    <Container className="mt-5 mb-5">
                        {/* <YouTubeEmbed videoId={doc.videoId} title={doc.title} />  */}
                        <ImageEmbed videoId={doc.videoId} title={doc.title} /> 
                    </Container>

                    <h3 className='text-white text-center mb-3'>{doc && doc.title}</h3>
                    {doc && doc.captionTracks.map((captionTrack, captionTracksIndex) => (

                        <Accordion defaultActiveKey="0" key={captionTracksIndex}>
                            <Accordion.Item className='mt-2'>
                                <Accordion.Header>{captionTrack.name}</Accordion.Header>
                                <Accordion.Body>
                                    {captionTrack.script}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                    ))}
                </Container>
            </div>
        </>

    );

});

export default GetDoc;