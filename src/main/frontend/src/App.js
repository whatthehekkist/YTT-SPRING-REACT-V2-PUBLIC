import React, { useRef, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ScrollToTop from "./components/ScrollToTop";
import StickyHome from './components/StickyHome';
import Home from './pages/Home';
import GetDoc from './pages/GetDoc';
import RandomDocumentsProvider from './context/RandomDocContext';
import SampleDocumentProvider from './context/SampleDocContext';
import FixedBackgroundLink from './components/FixedBackgroundLink';

function App() {

	// for scrollToSection in nav
	 const sections = [useRef(null), useRef(null), useRef(null)];
	 const scrollToSection = (index) => {
		if(sections[index].current) {
            sections[index].current.scrollIntoView({ behavior: 'smooth' });
        }
	 };

	const [ShowBgAttachBottom, setShowBgAttachBottom] = useState(false);
	const handleScroll = () => {
		const scrollPosition = window.scrollY;
	
		if (scrollPosition > window.innerHeight) {
		setShowBgAttachBottom(true);
		} else {
		setShowBgAttachBottom(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

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
					
					</Routes>
				</SampleDocumentProvider>
			</RandomDocumentsProvider>            

			{ShowBgAttachBottom && <FixedBackgroundLink />} 

			<ScrollToTop />
		</div>
	);
}

export default App;
