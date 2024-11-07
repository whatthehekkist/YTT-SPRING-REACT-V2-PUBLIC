import React, { useRef, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import LoadingSpinner from './Spinner';
import html2pdf from 'html2pdf.js';

/**
 * @param title props | script title (language name) at current index of doc.captionTracks
 * @param script props | script at current index of doc.captionTracks
 * @param summary props | summarization of the script (English only)
 *  - generated using hugging face transformer (facebook/bart-large-cnn) in django/python script
 *  - saved to documents in the current mongoDB collection 
 * @remarkOnGeneratingPDF 
 *  - script
 *      - Some language like Korean/Japanese tends to relatively have large font-size, letter-spacing, and line-height by default,
 *            causing content cut-off between bottom of page and top of next page (starting from page 2 in general)
 *      - PDF with more than 3 pages also causes content cut-off
 *      - Current alt approach for now: if device is mobile, generate script whose legnth is appropriate to be rendered in a single page only
 *  - script and summary on desktop
 *      - just OK up to 3 pages
 *  - device
 * @returns summary in English, script or PDF by available lang
 */
const SummaryAndPDF = ({ title, script, summary }) => {

    // states
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hideDownloadBtnOnMobile, setHideDownloadBtnOnMobile] = useState(true);
    const [summaryVisible, setSummaryVisible] = useState(false);
    
    // ref for current DOM element
    const contentRef = useRef();

    // convert \n to <br/> source text and return formatted text with line breaks
    const BreakText = ({ sourceText }) => {
        const formattedText = sourceText.replace(/\n/g, '<br/>');
    
        return (
            <div dangerouslySetInnerHTML={{ __html: formattedText }} />
        );
    };

    // function for PDF creation
    const generatePDF = () => {

        // if (summaryVisible) setSummaryVisible(!summaryVisible); // force script download only

        setLoading(true);
        const pdfBtn = document.getElementById('pdf-btn');
        const summaryBtn = document.getElementById('summary-btn');
        summaryBtn.classList.remove('fw-bold', 'text-muted'); 
        pdfBtn.classList.add('fw-bold', 'text-muted'); 
        
        const element = contentRef.current; // get current DOM element
        if (!element) {
            console.error("PDF generation error: Element not found");
            setLoading(false);
            return;
        }

        const options = {
            filename: summaryVisible ? 'english-summary-by-ytt-koyeb-app.pdf' : `${title}-script-by-ytt-koyeb-app.pdf`, 
            margin: 1, 
            html2canvas: {
                scale: 2, // default: 1
                background: '#fff' 
            },
            jsPDF: {
                unit: 'in', 
                format: 'letter', 
                orientation: 'portrait', 
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        };

        html2pdf()
            .from(element)
            .set(options)
            .save()
            .then(() => {
                console.log('PDF successfully created!');
                setLoading(false); 
                pdfBtn.classList.remove('fw-bold', 'text-muted');
                if (summaryVisible) setSummaryVisible(!summaryVisible); // toggle to script (default content)
            })
            .catch((error) => {
                console.error('PDF generation error:', error);
                setLoading(false); 
                pdfBtn.classList.remove('fw-bold', 'text-muted');
                if (summaryVisible) setSummaryVisible(!summaryVisible); // toggle to script (default content)
            });
    };

    // isMobile setter
    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/Mobi|android|ip(hone|od|ad)|windows phone/i.test(userAgent)) {
            setIsMobile(true);
        }
    }, []);

    // hideDownloadBtnOnMobile setter
    useEffect(() => {
        if (isMobile) {

            // on mobile, check if the summary length exceeds average # of chars in a single page
            if (summaryVisible) setHideDownloadBtnOnMobile(summary.length > 2750);

            // on mobile, check if the script length exceeds average # of chars in a single page
            else setHideDownloadBtnOnMobile(script.length > 2750);

        } else {
            // whatever is just OK on desktop
            setHideDownloadBtnOnMobile(false);
        }
    }, [isMobile, script, summary, summaryVisible]);


    const btnStyle = {
        backgroundColor: '#adb5bd', 
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '3px 8px', 
        fontSize: '12px', 
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s, transform 0.3s'
    };
    
    return (
        <div style={{ margin: 0 }}> 

            { loading && <LoadingSpinner /> } 

            <Button 
                id='summary-btn'
                className={ summaryVisible ? 'fw-bold text-muted mt-4 mb-1 mx-1' : 'mt-4 mb-1 mx-1' }
                style={ btnStyle }
                title='English Only'
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6c757d'} 
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#adb5bd'} 
                onClick={() => setSummaryVisible(!summaryVisible)}  
            >
                Summary
            </Button>

            {/* allow PDF download only if hideDownloadBtnOnMobile is true */}
            {!hideDownloadBtnOnMobile && (
                <Button 
                    id='pdf-btn'
                    className={ 'mt-4 mb-1 mx-1' }
                    style={ btnStyle }
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6c757d'} 
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#adb5bd'} 
                    onClick={generatePDF} 
                >
                    Download PDF
                </Button>
            )}

            {/* Target DOM element to be captured as pdf */}
            <div ref={contentRef} 
                //  className={ hideDownloadBtnOnMobile ? 'mt-4 mb-1' : '' }
                 style={{ 
                    pageBreakInside: 'avoid', 
                    padding: 0,
                    maxWidth: '100%',
                    margin: 'auto'
                }
            }>
                { summary && summaryVisible ? <BreakText sourceText={summary} /> : script } 
            </div>
        </div>
    );
};

export default SummaryAndPDF;
