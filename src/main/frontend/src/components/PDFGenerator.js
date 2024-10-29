import React, { useRef, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import LoadingSpinner from './Spinner';
import html2pdf from 'html2pdf.js';

/**
 * @param title props | script title (language name) at current index of doc.captionTracks
 * @param script props | script at current index of doc.captionTracks
 * @remark - Some language like Korean/Japanese tends to relatively have large font-size, letter-spacing, and line-height by default,
 *            causing content cut-off between bottom of page and top of page (starting from page 2 in general)
 *         - PDF with more than 3 pages also causes content cut-off
 *         - Current alt approach for now: if device is mobile, generate script whose legnth is appropriate to be rendered in a single page only
 * @returns PDF 
 */
const PDFGenerator = ({ title, script }) => {

    // states
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hideDownloadBtnOnMobile, setHideDownloadBtnOnMobile] = useState(true);
    
    // ref for current DOM element
    const contentRef = useRef();

    // function for PDF creation
    const generatePDF = () => {
        setLoading(true); // Set loading to true while generating PDF

        const element = contentRef.current; // get current DOM element
        if (!element) {
            console.error("PDF generation error: Element not found");
            setLoading(false);
            return;
        }

        const options = {
            filename: `${title}-script-by-ytt-koyeb-app.pdf`, 
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
                setLoading(false); // Reset loading after PDF generation
            })
            .catch((error) => {
                console.error('PDF generation error:', error);
                setLoading(false); // Reset loading if error
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
            // on mobile, check if the script length exceeds average # of chars in a single page
            setHideDownloadBtnOnMobile(script.length > 2750);
        } else {
            // whatever is just OK on desktop
            setHideDownloadBtnOnMobile(false);
        }
    }, [isMobile, script]);
    
    return (
        <div style={{ margin: 0 }}> 

            {loading && <LoadingSpinner />} 

            {/* allow PDF download only if hideDownloadBtnOnMobile is true */}
            {!hideDownloadBtnOnMobile && (
                <Button 
                    className='mt-4 mb-1 mx-1' 
                    style={{
                        backgroundColor: '#adb5bd', 
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '3px 8px', 
                        fontSize: '12px', 
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s, transform 0.3s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6c757d'} 
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#adb5bd'} 
                    onClick={generatePDF} 
                >
                    Download PDF
                </Button>
            )}

            {/* Target DOM element to be captured as pdf */}
            <div ref={contentRef} 
                 className={ hideDownloadBtnOnMobile ? 'mt-4 mb-1' : '' }
                 style={{ 
                    pageBreakInside: 'avoid', 
                    padding: 0,
                    maxWidth: '100%',
                    margin: 'auto'
                }}>
                {script}
            </div>
        </div>
    );
};

export default PDFGenerator;