import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import LoadingSpinner from '../components/Spinner';

/**
 * @param text props for frequency word calc
 * @returns word cloud
 */
const WordCloud = ({ text }) => {
    const svgRef = useRef(null);
    const [svgSize, setSvgSize] = useState({ width: 600, height: 600 });
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [topWords, setTopWords] = useState([]); // top frequency Words

    // isMobile setter
    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        setIsMobile(/Mobi|android|ip(hone|od|ad)|windows phone/i.test(userAgent));
    }, []);

    // svgSize setter
    useEffect(() => {
        const handleResize = () => {
            // go for device width if smaller than 600 
            const width = window.innerWidth < 600 ? window.innerWidth : 600;
            const height = window.innerHeight < 600 ? window.innerHeight : 600;
            setSvgSize({ width, height });
        };

        // resize svg on width change if not mobile device
        if (!isMobile) {
            handleResize(); 
            window.addEventListener('resize', handleResize);
        }

        return () => {
            if (!isMobile) {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, [isMobile]);

    // calc word frequency in text
    useEffect(() => {

        setLoading(true);

        const wordCounts = {};
        const wordsArray = text.split(' ');

        // count word frequency
        wordsArray.forEach(word => {
            word = word.toLowerCase();
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        });

        // if the frequency is high, increase the size.
        const calculatedWords = Object.entries(wordCounts).map(([word, count]) => ({
            text: word,
            size: Math.max(10, count * (isMobile ? 2 : 10)) // go smaller for mobile
        })).sort((a, b) => b.size - a.size); // sort in DESC on frequency

        // topWords takes max 200 words in calculatedWords for mobile (, seems not really effective tho)
        const topWords = isMobile ? calculatedWords.slice(0, 200) : calculatedWords;
        // const topWords = calculatedWords;

        setTopWords(topWords); // set a new state to topWords
        setLoading(false); // close loading spinner
    }, [text, isMobile]);


    // draw word cloud based on layout
    const draw = useCallback((words) => {
        d3.select(svgRef.current)
            .selectAll('*').remove();

        const g = d3.select(svgRef.current)
            .append('g')
            .attr('transform', `translate(${svgSize.width / 2}, ${svgSize.height / 2})`);

        const text = g.selectAll('text')
            .data(words)
            .enter()
            .append('text')
            .attr('data-index', (d, i) => i) 
            .style('font-size', d => `${d.size}px`)
            .style('font-family', 'sans-serif')
            .style('font-weight', 'bold')
            .style('fill', () => `hsl(${Math.random() * 360}, 50%, 70%)`)
            .attr('text-anchor', 'middle')
            .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
            .text(d => d.text)
            .style('opacity', 0);

        text.transition()
            .duration(1000)
            .delay((d, i) => i * 100)
            .style('opacity', 1);
    }, [svgSize]); // execute the hook on dependancy state changes

    // d3 codes for layout setting
    useEffect(() => {
        if (topWords.length > 0) {
            const layout = cloud()
                .size([svgSize.width, svgSize.height])
                .words(topWords) 
                .padding(5)
                .rotate(() => (Math.random() > 0.5 ? 90 : 0))
                .fontSize(d => d.size)
                .on('end', draw); // call the function draw

            layout.start();
        }
    }, [topWords, svgSize, draw]); // execute the hook on dependancy states change

    // object for div style
    const fixedBackgroundStyle = {
        height: isMobile ? '70vh' : '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    };

    return (
        <div style={fixedBackgroundStyle}>
            {loading && <LoadingSpinner />} 
            <svg 
                ref={svgRef} 
                width={svgSize.width} 
                height={svgSize.height} 
                viewBox={`0 0 ${svgSize.width} ${svgSize.height}`} 
            />
        </div>
    );
};

export default WordCloud;
