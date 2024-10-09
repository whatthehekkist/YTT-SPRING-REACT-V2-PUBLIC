import React, { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ScrollToTop from "./components/ScrollToTop";
import StickyHome from './components/StickyHome';
import Home from './pages/Home';
import GetDoc from './pages/GetDoc';
import RandomDocumentsProvider from './context/RandomDocContext';
import SampleDocumentProvider from './context/SampleDocContext';


function App() {

	// for in-page nav scroll on click
	 const sections = [useRef(null), useRef(null), useRef(null)];
	 const scrollToSection = (index) => {
		if(sections[index].current) {
            sections[index].current.scrollIntoView({ behavior: 'smooth' });
        }
	 };

	// main component structure 
	return (
		<div>
			<StickyHome />
			<Header scrollToSection={scrollToSection} />			

			<RandomDocumentsProvider>
				<SampleDocumentProvider>
					<Routes>

						<Route 	
							exact path="/" 
							element={
								<Home refs={sections} 
									  titles={["Home", "Transcription List", "Sample Transcription"]} 
								/>
							} 
						/>
						
						<Route 	
							path="/doc/:id"
							element={
								<GetDoc refs={sections} 
										titles={["Home", "Transcription List", "Transcription"]} 
								/>
							} 
						/>						
						{/* <Route path="/doc?id=" element={<GetDoc />} /> */}
					
					</Routes>
				</SampleDocumentProvider>
			</RandomDocumentsProvider>

			<ScrollToTop />
		</div>
	);
}

export default App;
