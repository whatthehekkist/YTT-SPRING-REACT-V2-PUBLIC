import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Documents = () => {

    // const [documents, setDocuments] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('http://localhost:8081/documents');
                setColumns(response.data);
                // console.log(response.data)

            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };
        fetchDocuments();
        // console.log(columns)

    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>title</th>
                </tr>
            </thead>

            <tbody>
                {columns.map((col, index) => (
                    <tr key={index}>
                        <td>{col.id}</td>
                        <td>{col.videoId}</td>
                        <td>{col.title}</td>

                        {col.captionTracks.map((captionTrack, captionTracksIndex) => (
                            <td>{captionTrack.name}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

};

export default Documents;