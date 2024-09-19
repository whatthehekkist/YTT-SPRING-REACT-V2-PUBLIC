import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/Spinner';
import {
    Container,
    Accordion,
} from 'react-bootstrap';

import { RandomDocumentsContext } from '../context/RandomDocContext';


const Home = () => {

    const { documents, randomloading, randomerror } = useContext(RandomDocumentsContext);

    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('http://localhost:8081/');
                setColumns(response.data);
                // console.log(response.data)

            } catch (error) {
                console.error("Error fetching documents:", error); // 에러 메시지 출력
                setError(error); // 에러 상태 설정
            } finally {
                setLoading(false); // 로딩 완료
            }
        };
        fetchDocuments();
        // console.log(columns)

    }, []);

    if (loading) return ( <div><LoadingSpinner /></div> );
    
    return (
        <>

        <div>
            <h1>Random Documents List</h1>
            {documents.length > 0 ? (
                documents.map((document, index) => (
                    <div key={index}>
                        <h2>{document.title}</h2>
                    </div>
                ))
            ) : (
                <p>No documents found.</p>
            )}
        </div>

        <Container className="bg-dark mt-5 pt-5 pb-5">
        <h3 className='text-white text-center'>{columns.title}</h3>
        {columns && columns.captionTracks.map((captionTrack, captionTracksIndex) => (
            
            <Accordion defaultActiveKey="0">
                <Accordion.Item className='mt-2'>
                <Accordion.Header>{captionTrack.name}</Accordion.Header>
                <Accordion.Body>
                    {captionTrack.script}
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        ))}
        </Container>

        {/* <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>title</th>
                </tr>
            </thead>

            <tbody>
                    <tr>
                        <td>{columns.id}</td>
                        <td>{columns.videoId}</td>
                        <td>{columns.title}</td>

                        {columns && columns.captionTracks.map((captionTrack, captionTracksIndex) => (
                            <td key={captionTracksIndex}>{captionTrack.name}</td>
                        ))}

                    </tr>
            </tbody>
        </table> */}

        </>

    );

};

export default Home;