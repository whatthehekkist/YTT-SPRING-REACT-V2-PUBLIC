import React, { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import GetDoc from './pages/GetDoc';
import RandomDocumentsProvider from './context/RandomDocContext';
import SampleDocumentProvider from './context/SampleDocContext';
import ScrollToTop from "./components/ScrollToTop";
import StickyHome from './components/StickyHome';

function App() {

	 const sections = [useRef(null), useRef(null), useRef(null)];
	 const scrollToSection = (index) => {
		if(sections[index].current) {
            sections[index].current.scrollIntoView({ behavior: 'smooth' });
        }
	 };

	return (
		<div>
			<StickyHome />
			<Header scrollToSection={scrollToSection} />			

			<RandomDocumentsProvider>
				<SampleDocumentProvider>
					<Routes>
					
						{/* <Route path="/" element={<Home />} /> */}
						<Route 	
							exact path="/" 
							element={
								<Home refs={sections} 
										titles={["Home", "Transcription List", "Sample Transcription"]} 
								/>
							} 
						/>
						
						{/* <Route path="/:id" element={<GetDoc />} /> */}
						<Route 	
							exact path="/:id" 
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
