import React, { useContext, useState, useEffect, forwardRef } from 'react';
import LoadingSpinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Accordion,
    Button,
} from 'react-bootstrap';
import TEXTS from '../local-data/Texts';
import { RandomDocumentsContext } from '../context/RandomDocContext';
import YouTubeEmbed from '../components/VideoEmbed';
import ScrollToTranscription from '../components/ScrollToTranscription';


const GetDoc = forwardRef(({ refs }) => {
    
    const { randomDocs, loadingRandomDocs, errorRandomDocs } = useContext(RandomDocumentsContext);

    const history = useNavigate();
    const propsParam = useParams();
    const id = propsParam.id;
    console.log("at GetDoc.js: ", id);

    const [doc, setDocument] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchDocuments = async () => {
            try {
                const response = await axios.get('/doc', {
                    params: { id } // body
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

    /***
     // [ALT] ScrollToTranscription 
    useEffect(() => {
        const element = document.getElementById("transcription");
        if (element) {
            const location = element.offsetTop;
            window.scrollTo({ top: location, behavior: 'smooth' });
        }
    }, [history]);
    ***/

    // function to send a GET request of a doc 
    const fetchDocHandler = (id) => {
        (id) ? history('/' + id) : alert("something went wrong..try again.");
        // (id) ? history('/?id=' + id) : alert("something went wrong..try again.");

        /***
        // [ALT] ScrollToTranscription 
        let location = document.querySelector("#transcription").offsetTop;
        window.scrollTo({top:location, behavior:'smooth'});
        ***/

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

            <div ref={refs[0]} className='text-center mt-5'>
                <h1 id='transcription_list'>{TEXTS.TRANSCRIPTION_LIST.heading}</h1>
                <p>
                    {TEXTS.TRANSCRIPTION_LIST.desc1}<br/>
                    {randomDocs ? (randomDocs.length) : ('Multiple')} {TEXTS.TRANSCRIPTION_LIST.desc2}
                </p>

                {randomDocs && randomDocs.length > 0 ? (
                    randomDocs.map((doc, index) => (
                        <div key={index}>
                            <Button variant="light" 
                                    className='m-1'
                                    onClick={ () => fetchDocHandler(doc.id)} 
                            >
                                {doc.title}
                            </Button>
                        </div>
                    ))
                ) : (
                    <p>No random documents found.</p>
                )}
            </div>

            <div className='transcription' id="transcription" /*ref={transcriptionRef}*/ style={{ backgroundColor: '#212529' }} >
            <Container ref={refs[1]} className="bg-dark mt-5 pt-3 pb-5">
                
                <Container className="mt-5 mb-5">
                    <YouTubeEmbed videoId={doc.videoId} title={doc.title} /> 
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