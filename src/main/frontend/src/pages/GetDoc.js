import React, { useContext, useState, useEffect, forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/Spinner';
import ScrollToTranscription from '../components/ScrollToTranscription';
import { RandomDocumentsContext } from '../context/RandomDocContext';
import TranscriptionList from '../components/TranscriptionList';
import Transcription from '../components/Transcription';


const GetDoc = forwardRef(({ refs }) => {

	// reference RandomDocumentsContext
	const { randomDocs, loadingRandomDocs, errorRandomDocs } = useContext(RandomDocumentsContext);

	// extract the path parameter :id from /doc/:id
	const propsParam = useParams();
	const id = propsParam.id;
	console.log("at GetDoc.js: ", id);

	// declare and init doc
	const [doc, setDocument] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {

		const fetchDocuments = async () => {

			try {
				// req with query param id to /doc?id=:id in Spring
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
	}, [id]); // re-renders every time id changes

	// handle loading and error
	if (loadingRandomDocs || loading) return (<div><LoadingSpinner /></div>);
	if (errorRandomDocs) {
		return <div>Error fetching random documents: {errorRandomDocs.message}</div>;
	}
	if (error) {
		return <div>Error fetching document: {error.message}</div>;
	}

	// call the components ScrollToTranscription, TranscriptionList, and Transcription
	return (
		<>
			<ScrollToTranscription />
			<TranscriptionList refs={refs} randomDocs={randomDocs} />
			<Transcription refs={refs} doc={doc} />
		</>

	);

});

export default GetDoc;