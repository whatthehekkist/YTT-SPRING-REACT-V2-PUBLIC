import React, { useContext, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/Spinner';
import TEXTS from '../local-data/Texts';
import {
    Container,
    Accordion,
    // Button,
    Card, CardGroup,
    Row, Col
} from 'react-bootstrap';
import ImageEmbed from '../components/ImageEmbed';

// contexts having each of data (random documents and sample document respectively)
import { RandomDocumentsContext } from '../context/RandomDocContext';
import { SampleDocumentContext } from '../context/SampleDocContext';


const Home = forwardRef(({ refs }) => {

    const history = useNavigate();

    // reference RandomDocumentsContext and SampleDocumentContext
    const { randomDocs, loadingRandomDocs, errorRandomDocs } = useContext(RandomDocumentsContext);
    const { sampleDoc, loadingSampleDoc, errorSampleDoc } = useContext(SampleDocumentContext);
    // console.log("randomDocs:", randomDocs);
    // console.log("sampleDoc:", sampleDoc);

    if (loadingRandomDocs || loadingSampleDoc) return (<div><LoadingSpinner /></div>);
    if (errorRandomDocs) {
        return <div>Error fetching random documents: {errorRandomDocs.message}</div>;
    }
    if (errorSampleDoc) {
        return <div>Error fetching sample document: {errorSampleDoc.message}</div>;
    }

    // function to send a GET request of a doc 
    const fetchDocHandler = (id) => {   
        (id) ? history(`/doc/${id}`) : alert("something went wrong..try again.");     
    };

    return (
        <>  
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

            {/* render data using SampleDocumentContext */}                
            <div className='/*bg-attach-transcription*/ bg-transcription transcription' id="transcription">
                <Container className="pb-5 container">
                    <h1 ref={refs[1]} className="pt-5 pb-4 text-center text-white">{TEXTS.TRANSCRIPTION.heading}</h1>
                    <Container className="mt-5 mb-5">
                        {/* <YouTubeEmbed videoId={sampleDoc.videoId} title={sampleDoc.title} />  */}
                        <ImageEmbed videoId={sampleDoc.videoId} title={sampleDoc.title} /> 
                    </Container>
                    
                    <h3 className='text-white text-center mb-3'>{sampleDoc && sampleDoc.title}</h3>
                    {sampleDoc && sampleDoc.captionTracks.map((captionTrack, captionTracksIndex) => (
                        
                        <Accordion defaultActiveKey="0" key={captionTracksIndex}>
                            <Accordion.Item className='mt-2'>
                                <Accordion.Header>{captionTrack.name}</Accordion.Header>
                                <Accordion.Body>{captionTrack.script}</Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))}
                </Container>
            </div>

        </>

    );

});

export default Home;