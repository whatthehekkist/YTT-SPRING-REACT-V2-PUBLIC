import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// a context that fetches data from the endpoint /randomdocs in Spring
export const RandomDocumentsContext = createContext();

const RandomDocumentsProvider = ({ children }) => {
    const [randomDocs, setDocuments] = useState([]);
    const [loadingRandomDocs, setLoading] = useState(true);
    const [errorRandomDocs, setError] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('/randomdocs');
                // console.log("Documents Response:", response.data);
                setDocuments(response.data);
            } catch (error) {
                console.error("Error fetching documents:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();

    }, []);

    return (
        <>
        {/* <pre>{JSON.stringify(randomDocs, null, 2)}</pre>  */}
        <RandomDocumentsContext.Provider value={{ randomDocs, loadingRandomDocs, errorRandomDocs }}>
            {children}
        </RandomDocumentsContext.Provider>
        </>
    );
};

export default RandomDocumentsProvider;