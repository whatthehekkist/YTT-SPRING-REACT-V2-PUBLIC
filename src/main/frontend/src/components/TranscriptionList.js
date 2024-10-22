import React from 'react';
import { useNavigate } from 'react-router-dom';
import TEXTS from '../local-data/Texts';
import {
	Container,
	Card, CardGroup,
	Row, Col
} from 'react-bootstrap';

/**
 * @param refs props for scroll event
 * @param randomDocs props for random documents rendering
 * @returns random documents rendered
 */
const TranscriptionList = ({ refs, randomDocs }) => {

	const history = useNavigate();

	// function to send a GET request of a doc
	const fetchDocHandler = (id) => {
		(id) ? history(`/doc/${id}`) : alert("something went wrong..try again.");
	};

	// render randomDocs
	return (
		<div className='bg-attach-transcription-list'>
			<Container>
				<div ref={refs[0]} className='text-center'>
					<h1 className='pt-5 pb-4'>{TEXTS.TRANSCRIPTION_LIST.heading}</h1>
					<p>
						{TEXTS.TRANSCRIPTION_LIST.desc1}<br />
						{randomDocs ? (randomDocs.length) : ('Multiple')} {TEXTS.TRANSCRIPTION_LIST.desc2}
					</p>

					<div className='container mt-5 pb-5'>
						<Row className='justify-content-center g-4'>
							{randomDocs && randomDocs.length > 0 ? (
								randomDocs.map((doc, index) => (

									<Col xs={12} sm={6} md={4} key={index} className="d-flex justify-content-center mx-5 mb-4"> {/* xs: 1열, sm: 2열, md: 3열 */}
										<CardGroup>
											<Card style={{ width: '18rem', cursor: 'pointer' }}
												onClick={() => fetchDocHandler(doc.id)}
												className='transcription-list-card'
											>
												<Card.Img variant="top" src={`https://img.youtube.com/vi/${doc.videoId}/hqdefault.jpg`} />
												<Card.Body>
													<Card.Text>{doc.title}</Card.Text>
												</Card.Body>
											</Card>
										</CardGroup>
									</Col>
									
								))) : (
								<p>No random documents found.</p>
							)}
						</Row>
					</div>
				</div>
			</Container>
		</div>
	);

};


export default TranscriptionList; 