import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// context reference for children components
export const RandomDocumentsContext = createContext();

// a context provider that fetches data from the endpoint /randomdocs in Spring
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
			{/* define context provider for child components (subscriber to the context) to access the props value */}
			<RandomDocumentsContext.Provider value={{ randomDocs, loadingRandomDocs, errorRandomDocs }}>
				{children}
			</RandomDocumentsContext.Provider>
		</>
	);
};

export default RandomDocumentsProvider;