import React, { useEffect, useState } from 'react';
import { Accordion, Container, Button } from 'react-bootstrap';
import LoadingSpinner from './Spinner';
import TEXTS from '../local-data/Texts';
import ImageEmbed from './ImageEmbed';
import WordCloud from './WordCloud';
import SummaryAndPDF from './SummaryAndPDF';

/**
 * @param refs props for scroll event
 * @param doc props for a specific document rendering
 * @returns a single document rendered
 */
const Transcription = ({ refs, doc }) => {

	/* declare and init each state with the values as follows to the length of doc.captionTracks */
	const [openWordCloud, setOpenWordCloud] = useState(Array(doc.captionTracks.length).fill(false));
	const [openScript, setOpenScript] = useState(Array(doc.captionTracks.length).fill(false));
	const [renderedWordCloud, setRenderedWordCloud] = useState(Array(doc.captionTracks.length).fill(null));
	const [renderedScript, setRenderedScript] = useState(Array(doc.captionTracks.length).fill(null));

	/* enSummary, enKeywords, and recommendDocs */
	const [enSummary, setEnSummary] = useState('');
	const [enKeywords, setEnKeywords] = useState('');
	const [recommendDocs, setRecommendDocs] = useState([]);
	
	// keep initializing the states on change of doc
	useEffect(() => {
		setOpenWordCloud(Array(doc.captionTracks.length).fill(false));
		setOpenScript(Array(doc.captionTracks.length).fill(false));
		setRenderedWordCloud(Array(doc.captionTracks.length).fill(null));
		setRenderedScript(Array(doc.captionTracks.length).fill(null));
	}, [doc]);

	// enSummary, enKeywords, and recommendDocs setter 
	useEffect(() => {
		// find the 1st matching english languageCode in doc.captionTracks
		const regex = /^en(-|$)/; // en, en-US, en-UK...
		for (const captionTrack of doc.captionTracks) {	
			const isMatch = regex.test(captionTrack.languageCode);
			if (isMatch) {
				console.log("[FOUND] captionTrack.languageCode: ", captionTrack.languageCode);
				// get and set the values for each of the states 
				setEnSummary(captionTrack.summary); 
				setEnKeywords(captionTrack.keywords);
				setRecommendDocs(captionTrack.recommends);
				break; 
			}
		}
	}, [doc]); 



	/* handle Accordion toggles (collapse state) between the buttons "Word Cloud" and "Script" in Accordion */
	/* say "Word Cloud" clicked, force "Script" content to be collapsed if being shown, otherwise just show the content. (vise-versa) */

	// function toggleWordCloud on clicking the button "Word Cloud" in Accordion.Body
	const toggleWordCloud = (index) => {

		// force all other word cloud content to be collapsed except current word cloud content (which is doc.captionTracks[current_index])  
		setOpenWordCloud(prev => {
			const newState = Array(doc.captionTracks.length).fill(false);
			newState[index] = !prev[index];
			return newState;
		});

		// all the content in the button "Script" in Accordion.Body should also be collapsed
		setOpenScript(prev => {
			const newState = Array(doc.captionTracks.length).fill(false);
			return newState;
		});

		// word cloud content in current Accordion is not rendered yet, 
		// so store data to the array newRenderedState at current index and renderedWordCloud gets updated on return
		if (renderedWordCloud[index] === null) {
			setRenderedWordCloud(prev => {
				const newRenderedState = [...prev]; // create a new array by shallow-copying prev rendering state
				newRenderedState[index] = <WordCloud text={doc.captionTracks[index].script} />;
				return newRenderedState;
			});
		}
	};

	// function toggleScript on clicking the button "Script" in Accordion.Body
	const toggleScript = (index) => {

		// force all other script content to be collapsed except current script content (which is doc.captionTracks[current_index])  
		setOpenScript(prev => {
			const newState = Array(doc.captionTracks.length).fill(false);
			newState[index] = !prev[index];
			return newState;
		});

		// all the content in the button "Word Cloud" in Accordion.Body should be collapsed
		setOpenWordCloud(prev => {
			const newState = Array(doc.captionTracks.length).fill(false);
			return newState;
		});

		// script content in current Accordion is not rendered yet,
		// so store data to the array newRenderedState at current index and renderedScript gets updated on return
		if (renderedScript[index] === null) {
			setRenderedScript(prev => {
				const newRenderedState = [...prev]; // create a new array by shallow-copying prev rendering state
				newRenderedState[index] = doc.captionTracks[index].script;
				return newRenderedState;
			});
		}
	};

	return (
		<div className='bg-transcription transcription' id="transcription">
			<Container className="pb-5 container">
				<h1 /* scroll event ref */ ref={refs[1]} className="pt-5 pb-4 text-center text-white">{TEXTS.TRANSCRIPTION.heading}</h1>
				<Container className="mt-5 mb-5">
					{/* <YouTubeEmbed videoId={doc.videoId} title={doc.title} />  */}
					<ImageEmbed videoId={doc.videoId} title={doc.title} />
				</Container>

				<h3 className='text-white text-center mb-3'>{doc && doc.title}</h3>
				{doc && doc.captionTracks.map((captionTrack, captionTracksIndex) => (
					<Accordion defaultActiveKey={null} key={captionTracksIndex}>
						<Accordion.Item className='mt-2'>

							<Accordion.Header>{captionTrack.name}</Accordion.Header>
							<Accordion.Body>
								<div className="text-center mb-1">

									{/* check if current script (doc.captionTracks[captionTracksIndex]) is ok to be rendered as word cloud or text */}
									{/* refer to the function toggleWordCloud */}
									<Button
										className={openWordCloud[captionTracksIndex] ? "button-in-accordion-body mx-2 fw-bold" : "button-in-accordion-body mx-2"}
										onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#abc5ed'} 
										onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#d9e8ff'} 
										onClick={() => toggleWordCloud(captionTracksIndex)}
									>
										Word Cloud
									</Button>

									{/* refer to the function toggleScript */}
									<Button
										className={openScript[captionTracksIndex] ? "button-in-accordion-body mx-2 fw-bold" : "button-in-accordion-body mx-2"}
										onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#abc5ed'} 
										onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#d9e8ff'} 
										onClick={() => toggleScript(captionTracksIndex)}
									>
										Script
									</Button>
								</div>

								
								{/* Within current Accordion, the button "Word Cloud" is clicked (true), 
								and if word cloud content has already been rendered, re-use the rendered resource.
								Otherwise, loading -> generate word cloud -> React automatically re-renders on state updates -> renderedWordCloud[captionTracksIndex] becomes not null
								*/}
								{openWordCloud[captionTracksIndex] && (
									<div>
										{renderedWordCloud[captionTracksIndex] ? (
											renderedWordCloud[captionTracksIndex] // word cloud already rendered
										) : (
											<div><LoadingSpinner /></div>
										)}
									</div>
								)}
								{/* works nearly the same as above (and no need loading as it's plain text) */}
								{openScript[captionTracksIndex] && renderedScript[captionTracksIndex] && (
									<div>
										{/* call SummaryAndPDF to render current script in
											plain text, summary, keywords, recommended documents, and spdf */}
										<SummaryAndPDF 
											title={captionTrack.name} 
											script={renderedScript[captionTracksIndex]} 
											summary={enSummary}  
											keywords={enKeywords}
											recommends={recommendDocs}
										/>
									</div>
								)}
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				))}

			</Container>
		</div>
	);
};

export default Transcription;

