import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/Spinner';
import {
    Container,
    Accordion,
} from 'react-bootstrap';


const RandomDocs = () => {

    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('http://localhost:8081/randomdocs');
                setColumns(response.data);
                // console.log(response.data)

            } catch (error) {
                console.error("Error fetching documents:", error);
                setError(error); // 에러 상태 설정
            } finally {
                setLoading(false); // 로딩 완료
            }
        };
        fetchDocuments();
        console.log(columns)

    }, []);

    if (loading) return ( <div><LoadingSpinner /></div> );
    if (error) {
        return <div>Error fetching documents: {error.message}</div>;
    }
    
    return (
        <>
        RandomDocs
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>videoId</th>
                    <th>title</th>
                    <th>url</th>
                </tr>
            </thead>

            <tbody>
                {columns && columns.length > 0 ? (
                    columns.map((col, index) => (
                        <div key={index}>
                            <h2>{col.title}</h2>
                        </div>
                    ))
                ) : (
                    <p>No documents found.</p>
                )}
            </tbody>
        </table>

        </>

    );

};

export default RandomDocs;