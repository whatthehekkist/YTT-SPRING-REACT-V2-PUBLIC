import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// context reference for children components
export const SampleDocumentContext = createContext();

// a context provider that fetches data from the endpoint /sampledoc in Spring
const SampleDocumentProvider = ({ children }) => {
	const [sampleDoc, setDocuments] = useState([]);
	const [loadingSampleDoc, setLoading] = useState(true);
	const [errorSampleDoc, setError] = useState(null);

	useEffect(() => {
		const fetchDocuments = async () => {
			try {
				const response = await axios.get('/sampledoc');
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
			<SampleDocumentContext.Provider value={{ sampleDoc, loadingSampleDoc, errorSampleDoc }}>
				{children}
			</SampleDocumentContext.Provider>
		</>
	);
};


export default SampleDocumentProvider;