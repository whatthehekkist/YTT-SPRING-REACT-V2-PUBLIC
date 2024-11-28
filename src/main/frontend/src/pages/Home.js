import React, { useContext, forwardRef } from 'react';
import LoadingSpinner from '../components/Spinner';
import { RandomDocumentsContext } from '../context/RandomDocContext';
import { SampleDocumentContext } from '../context/SampleDocContext';
import TranscriptionList from '../components/TranscriptionList';
import Transcription from '../components/Transcription';


const Home = ({ refs }) => {

	// reference RandomDocumentsContext and SampleDocumentContext 
	// by explicitly calling useContext initialized with each of the source contexts accordingly
	const { randomDocs, loadingRandomDocs, errorRandomDocs } = useContext(RandomDocumentsContext);
	const { sampleDoc, loadingSampleDoc, errorSampleDoc } = useContext(SampleDocumentContext);
	// console.log("randomDocs:", randomDocs);
	// console.log("sampleDoc:", sampleDoc);

	// handle loading and error
	if (loadingRandomDocs || loadingSampleDoc) return (<div><LoadingSpinner /></div>);
	if (errorRandomDocs) {
		return <div>Error fetching random documents: {errorRandomDocs.message}</div>;
	}
	if (errorSampleDoc) {
		return <div>Error fetching sample document: {errorSampleDoc.message}</div>;
	}

	// call the components TranscriptionList and Transcription
	return (
		<>
			<TranscriptionList refs={refs}  randomDocs={randomDocs} />
			<Transcription refs={refs} doc={sampleDoc} />
		</>

	);

};

export default Home;