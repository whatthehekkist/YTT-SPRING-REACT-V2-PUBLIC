import React, { useContext, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/Spinner';
import TEXTS from '../local-data/Texts';
import {
    Container,
    Accordion,
    Button,
} from 'react-bootstrap';

import { RandomDocumentsContext } from '../context/RandomDocContext';
import { SampleDocumentContext } from '../context/SampleDocContext';
import YouTubeEmbed from '../components/VideoEmbed';

const Home = forwardRef(({ refs }) => {

    const history = useNavigate();
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
            <Container>
            <div ref={refs[0]} className='text-center mt-5'>
                <h1>{TEXTS.TRANSCRIPTION_LIST.heading}</h1>
                <p>
                    {TEXTS.TRANSCRIPTION_LIST.desc1}<br/>
                    {randomDocs ? (randomDocs.length) : ('Multiple')} {TEXTS.TRANSCRIPTION_LIST.desc2}
                </p>
                {randomDocs && randomDocs.length > 0 ? (
                    randomDocs.map((doc, index) => (
                        <div key={index}>
                            <Button variant="light" 
                                    className='m-1'
                                    onClick={ () => fetchDocHandler(doc.id) } 
                            >
                                {doc.title}
                            </Button>
                        </div>
                    ))
                ) : (
                    <p>No random documents found.</p>
                )}
            </div>
            </Container>

            <div className='transcription' id="transcription" style={{ backgroundColor: '#212529' }} >
            <Container className="bg-dark mt-5 pt-5 pb-5 container">
                <h1 ref={refs[1]} className="text-center text-white">{TEXTS.TRANSCRIPTION.heading}</h1>
                <Container className="mt-5 mb-5">
                    <YouTubeEmbed videoId={sampleDoc.videoId} title={sampleDoc.title} /> 
                </Container>
                
                <h3 className='text-white text-center mb-3'>{sampleDoc && sampleDoc.title}</h3>
                {sampleDoc && sampleDoc.captionTracks.map((captionTrack, captionTracksIndex) => (
                    
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

export default Home;