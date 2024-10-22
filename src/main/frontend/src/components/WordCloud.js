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
            {/* <div style={{ color: 'white', position: 'absolute', bottom: 20 }}>
                렌더링된 단어 수: {topWords.length} 
            </div> */}
        </div>
    );
};

export default WordCloud;












///////////////////////////////////////////////////////////////////////
// debounce 함수를 추가하여 resize 이벤트가 발생할 때마다 렌더링이 이루어지지 않도록 했습니다. 이제 resize 이벤트가 발생하고, 일정 시간(예: 200ms) 후에 실제로 크기가 변경되는 경우에만 상태가 업데이트됩니다.
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import * as d3 from 'd3';
// import cloud from 'd3-cloud';
// import LoadingSpinner from '../components/Spinner';

// const WordCloud = ({ text }) => {
//     const svgRef = useRef(null);
//     const [svgSize, setSvgSize] = useState({ width: 600, height: 600 });
//     const [isMobile, setIsMobile] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [words, setWords] = useState([]);

//     useEffect(() => {
//         const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//         setIsMobile(/Mobi|android|ip(hone|od|ad)|windows phone/i.test(userAgent));
//     }, []);

//     useEffect(() => {
//         const handleResize = () => {
//             const width = window.innerWidth < 600 ? window.innerWidth : 600;
//             const height = window.innerHeight < 600 ? window.innerHeight : 600;
//             setSvgSize({ width, height });
//         };

//         const debouncedHandleResize = debounce(handleResize, 200); // 디바운스 적용

//         handleResize(); // 초기 크기 설정
//         window.addEventListener('resize', debouncedHandleResize);
//         return () => {
//             window.removeEventListener('resize', debouncedHandleResize);
//         };
//     }, []);

//     useEffect(() => {
//         setLoading(true);

//         // 단어 빈도수 계산
//         const wordCounts = {};
//         const wordsArray = text.split(' ');

//         wordsArray.forEach(word => {
//             word = word.toLowerCase();
//             wordCounts[word] = (wordCounts[word] || 0) + 1;
//         });

//         // 단어와 빈도수를 기반으로 크기 설정
//         const calculatedWords = Object.entries(wordCounts).map(([word, count]) => ({
//             text: word,
//             size: isMobile ? Math.max(8, count * 2) : Math.max(10, count * 10)
//         }));

//         setWords(calculatedWords); // 상태 업데이트
//         setLoading(false); // 로딩 종료
//     }, [text, isMobile]);

//     const draw = useCallback((words) => {
//         d3.select(svgRef.current)
//             .selectAll('*').remove();

//         const g = d3.select(svgRef.current)
//             .append('g')
//             .attr('transform', `translate(${svgSize.width / 2}, ${svgSize.height / 2})`);

//         const text = g.selectAll('text')
//             .data(words)
//             .enter()
//             .append('text')
//             .style('font-size', d => `${d.size}px`)
//             .style('font-family', 'sans-serif')
//             .style('font-weight', 'bold')
//             .style('fill', () => `hsl(${Math.random() * 360}, 50%, 70%)`)
//             .attr('text-anchor', 'middle')
//             .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
//             .text(d => d.text)
//             .style('opacity', 0);

//         text.transition()
//             .duration(1000)
//             .delay((d, i) => i * 100)
//             .style('opacity', 1);
//     }, [svgSize]);

//     useEffect(() => {
//         if (words.length > 0) {
//             const layout = cloud()
//                 .size([svgSize.width, svgSize.height])
//                 .words(words)
//                 .padding(5)
//                 .rotate(() => (Math.random() > 0.5 ? 90 : 0))
//                 .fontSize(d => d.size)
//                 .on('end', draw); // draw 함수 호출

//             layout.start();
//         }
//     }, [words, svgSize, draw]); // draw를 의존성 배열에 추가

//     const fixedBackgroundStyle = {
//         height: isMobile ? '70vh' : '100vh',
//         backgroundColor: 'rgba(0, 0, 0, 0.9)',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'relative',
//         overflow: 'hidden',
//     };

//     // Debounce function
//     function debounce(func, wait) {
//         let timeout;
//         return function (...args) {
//             const context = this;
//             clearTimeout(timeout);
//             timeout = setTimeout(() => func.apply(context, args), wait);
//         };
//     }

//     return (
//         <div style={fixedBackgroundStyle}>
//             {loading && <LoadingSpinner />} {/* 로딩 메시지 */}
//             <svg 
//                 ref={svgRef} 
//                 width={svgSize.width} 
//                 height={svgSize.height} 
//                 viewBox={`0 0 ${svgSize.width} ${svgSize.height}`} 
//             />
//         </div>
//     );
// };

// export default WordCloud;



///////////////////////////////////////////////////////////////////////
// 두 번째 방법으로는 스크롤 이벤트에 따라 렌더링을 제어하는 방법입니다. 이 방법은 스크롤 이벤트가 발생할 때 워드 클라우드의 재렌더링을 방지하는 방식입니다. 이를 통해 사용자가 스크롤할 때 워드 클라우드가 불필요하게 다시 그려지는 것을 방지할 수 있습니다.
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import * as d3 from 'd3';
// import cloud from 'd3-cloud';
// import LoadingSpinner from '../components/Spinner';

// const WordCloud = ({ text }) => {
//     const svgRef = useRef(null);
//     const [svgSize, setSvgSize] = useState({ width: 600, height: 600 });
//     const [isMobile, setIsMobile] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [words, setWords] = useState([]);
//     const [isScrolling, setIsScrolling] = useState(false); // 스크롤 상태 추가

//     useEffect(() => {
//         const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//         setIsMobile(/Mobi|android|ip(hone|od|ad)|windows phone/i.test(userAgent));
//     }, []);

//     useEffect(() => {
//         const handleResize = () => {
//             const width = window.innerWidth < 600 ? window.innerWidth : 600;
//             const height = window.innerHeight < 600 ? window.innerHeight : 600;
//             setSvgSize({ width, height });
//         };

//         handleResize(); // 초기 크기 설정
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     useEffect(() => {
//         setLoading(true);

//         // 단어 빈도수 계산
//         const wordCounts = {};
//         const wordsArray = text.split(' ');

//         wordsArray.forEach(word => {
//             word = word.toLowerCase();
//             wordCounts[word] = (wordCounts[word] || 0) + 1;
//         });

//         // 단어와 빈도수를 기반으로 크기 설정
//         const calculatedWords = Object.entries(wordCounts).map(([word, count]) => ({
//             text: word,
//             size: isMobile ? Math.max(8, count * 2) : Math.max(10, count * 10)
//         }));

//         setWords(calculatedWords); // 상태 업데이트
//         setLoading(false); // 로딩 종료
//     }, [text, isMobile]);

//     const draw = useCallback((words) => {
//         d3.select(svgRef.current)
//             .selectAll('*').remove();

//         const g = d3.select(svgRef.current)
//             .append('g')
//             .attr('transform', `translate(${svgSize.width / 2}, ${svgSize.height / 2})`);

//         const text = g.selectAll('text')
//             .data(words)
//             .enter()
//             .append('text')
//             .style('font-size', d => `${d.size}px`)
//             .style('font-family', 'sans-serif')
//             .style('font-weight', 'bold')
//             .style('fill', () => `hsl(${Math.random() * 360}, 50%, 70%)`)
//             .attr('text-anchor', 'middle')
//             .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
//             .text(d => d.text)
//             .style('opacity', 0);

//         text.transition()
//             .duration(1000)
//             .delay((d, i) => i * 100)
//             .style('opacity', 1);
//     }, [svgSize]);

//     useEffect(() => {
//         if (words.length > 0 && !isScrolling) { // 스크롤 중일 때는 렌더링하지 않음
//             const layout = cloud()
//                 .size([svgSize.width, svgSize.height])
//                 .words(words)
//                 .padding(5)
//                 .rotate(() => (Math.random() > 0.5 ? 90 : 0))
//                 .fontSize(d => d.size)
//                 .on('end', draw); // draw 함수 호출

//             layout.start();
//         }
//     }, [words, svgSize, draw, isScrolling]); // isScrolling을 의존성 배열에 추가

//     const handleScroll = () => {
//         setIsScrolling(true); // 스크롤 상태를 true로 설정
//         clearTimeout(window.scrollTimeout); // 이전의 타임아웃을 클리어

//         window.scrollTimeout = setTimeout(() => {
//             setIsScrolling(false); // 스크롤이 끝난 후 false로 설정
//         }, 200); // 200ms 후에 스크롤 종료로 간주
//     };

//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const fixedBackgroundStyle = {
//         height: isMobile ? '70vh' : '100vh',
//         backgroundColor: 'rgba(0, 0, 0, 0.9)',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'relative',
//         overflow: 'hidden',
//     };

//     return (
//         <div style={fixedBackgroundStyle}>
//             {loading && <LoadingSpinner />} {/* 로딩 메시지 */}
//             <svg 
//                 ref={svgRef} 
//                 width={svgSize.width} 
//                 height={svgSize.height} 
//                 viewBox={`0 0 ${svgSize.width} ${svgSize.height}`} 
//             />
//         </div>
//     );
// };

// export default WordCloud;



///////////////////////////////////////////////////////////////////////
// 241020

// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import cloud from 'd3-cloud';
// import LoadingSpinner from '../components/Spinner';

// const WordCloud = ({ text }) => { // text를 props로 받음
//     const svgRef = useRef(null);
//     const [animate, setAnimate] = useState(false);
//     const [svgSize, setSvgSize] = useState({ width: 600, height: 600 });
//     const [isMobile, setIsMobile] = useState(false);
//     const [loading, setLoading] = useState(true); // 로딩 상태 추가

//     useEffect(() => {
//         setLoading(true);
//     }, []);

//     useEffect(() => {
//         const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//         if (/Mobi|android|ip(hone|od|ad)|windows phone/i.test(userAgent)) {
//             setIsMobile(true);
//         }
//     }, []);

//     useEffect(() => {
//         const handleResize = () => {
//             const width = window.innerWidth < 600 ? window.innerWidth : 600;
//             const height = window.innerHeight < 600 ? window.innerHeight : 600;
//             setSvgSize({ width, height });
//         };

//         handleResize(); // 초기 크기 설정

//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     useEffect(() => {

//         // console.log(text);

//         // 단어 빈도수 계산
//         const wordCounts = {};
//         const wordsArray = text.split(' '); // 공백으로 단어 분리

//         wordsArray.forEach(word => {
//             word = word.toLowerCase(); // 대소문자 구분 없애기
//             wordCounts[word] = (wordCounts[word] || 0) + 1; // 빈도수 증가
//         });

//         // 단어와 빈도수를 기반으로 크기 설정
//         const words = Object.entries(wordCounts).map(([word, count]) => ({
//             text: word,
//             size: isMobile ?  Math.max(8, count * 3) : Math.max(10, count * 6)
//         }));

//         const layout = cloud()
//             .size([svgSize.width, svgSize.height])
//             .words(words)
//             .padding(5)
//             .rotate(() => (Math.random() > 0.5 ? 90 : 0))
//             .fontSize(d => d.size)
//             .on('end', draw);

//         layout.start();

//         function draw(words) {
//             d3.select(svgRef.current)
//                 .selectAll('*').remove();

//             const g = d3.select(svgRef.current)
//                 .append('g')
//                 .attr('transform', `translate(${svgSize.width / 2}, ${svgSize.height / 2})`);

//             const text = g.selectAll('text')
//                 .data(words)
//                 .enter()
//                 .append('text')
//                 .style('font-size', d => `${d.size}px`)
//                 .style('font-family', 'sans-serif')
//                 .style('font-weight', 'bold')
//                 .style('fill', () => `hsl(${Math.random() * 360}, 50%, 70%)`) // 부드러운 색감
//                 .attr('text-anchor', 'middle')
//                 .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
//                 .text(d => d.text)
//                 .style('opacity', 0);

//             if (animate) {
//                 text.transition()
//                     .duration(1000)
//                     .delay((d, i) => i * 100)
//                     .style('opacity', 1);
//             }
//             setLoading(false);
//         }
//         setAnimate(true);
//     }, [animate, svgSize, text, isMobile]); 


//     /**
//     // 컴포넌트에 도달했을 때 애니메이션을 시작하게 하는 코드
//     useEffect(() => {
//         const handleScroll = () => {
//             const svgElement = svgRef.current;
//             if (svgElement) {
//                 const { top } = svgElement.getBoundingClientRect();
//                 if (top < window.innerHeight && top > 0) {
//                     setAnimate(true);
//                 }
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);
//     **/

//     const fixedBackgroundStyle = {
//         height: isMobile ? '70vh' : '100vh',
//         // backgroundAttachment: isMobile ? 'relative' : 'fixed',
//         // backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url("/images/bg-image.jpg")',
//         backgroundColor:  'rgba(0, 0, 0, 0.9)',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center center',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'relative',
//     };

//     // const loadingStyle = {
//     //     position: 'absolute',
//     //     top: '50%',
//     //     left: '50%',
//     //     transform: 'translate(-50%, -50%)',
//     //     color: 'white',
//     //     fontSize: '24px',
//     //     zIndex: 1,
//     // };

//     return (
//         <div style={fixedBackgroundStyle}>
//             {loading &&  <div><LoadingSpinner /></div>} {/* 로딩 메시지 */}
//             <svg ref={svgRef} width={svgSize.width} height={svgSize.height} />
//         </div>
//     );
// };

// export default WordCloud;





/////////////////////////////////////////////////////////////
// 컴포넌트에 도착해야 렌더링시작하는 방식

// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import cloud from 'd3-cloud';

// const WordCloud = ({ text }) => { // text를 props로 받음
//     const svgRef = useRef(null);
//     const [animate, setAnimate] = useState(false);
//     const [svgSize, setSvgSize] = useState({ width: 600, height: 600 });
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//         if (/android|ip(hone|od|ad)|windows phone/i.test(userAgent)) {
//             setIsMobile(true);
//         }
//     }, []);

//     useEffect(() => {
//         const handleResize = () => {
//             const width = window.innerWidth < 600 ? window.innerWidth : 600;
//             const height = window.innerHeight < 600 ? window.innerHeight : 600;
//             setSvgSize({ width, height });
//         };

//         handleResize(); // 초기 크기 설정

//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     useEffect(() => {

//         console.log(text);

//         // 단어 빈도수 계산
//         const wordCounts = {};
//         const wordsArray = text.split(' '); // 공백으로 단어 분리

//         wordsArray.forEach(word => {
//             word = word.toLowerCase(); // 대소문자 구분 없애기
//             wordCounts[word] = (wordCounts[word] || 0) + 1; // 빈도수 증가
//         });

//         // 단어와 빈도수를 기반으로 크기 설정
//         const words = Object.entries(wordCounts).map(([word, count]) => ({
//             text: word,
//             size: Math.max(10, count * 10) // 최소 크기 10px, 빈도수에 따라 크기 조정
//         }));

//         const layout = cloud()
//             .size([svgSize.width, svgSize.height])
//             .words(words)
//             .padding(5)
//             .rotate(() => (Math.random() > 0.5 ? 90 : 0))
//             .fontSize(d => d.size)
//             .on('end', draw);

//         layout.start();

//         function draw(words) {
//             d3.select(svgRef.current)
//                 .selectAll('*').remove();

//             const g = d3.select(svgRef.current)
//                 .append('g')
//                 .attr('transform', `translate(${svgSize.width / 2}, ${svgSize.height / 2})`);

//             const text = g.selectAll('text')
//                 .data(words)
//                 .enter()
//                 .append('text')
//                 .style('font-size', d => `${d.size}px`)
//                 .style('font-family', 'sans-serif')
//                 .style('font-weight', 'bold')
//                 .style('fill', () => `hsl(${Math.random() * 360}, 50%, 70%)`) // 부드러운 색감
//                 .attr('text-anchor', 'middle')
//                 .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
//                 .text(d => d.text)
//                 .style('opacity', 0);

//             if (animate) {
//                 text.transition()
//                     .duration(1000)
//                     .delay((d, i) => i * 100)
//                     .style('opacity', 1);
//             }
//         }
//     }, [animate, svgSize, text]); // text를 의존성 배열에 추가

//     useEffect(() => {
//         const handleScroll = () => {
//             const svgElement = svgRef.current;
//             if (svgElement) {
//                 const { top } = svgElement.getBoundingClientRect();
//                 if (top < window.innerHeight && top > 0) {
//                     setAnimate(true);
//                 }
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const fixedBackgroundStyle = {
//         height: isMobile ? '70vh' : '100vh',
//         backgroundAttachment: isMobile ? 'relative' : 'fixed',
//         backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url("/images/bg-image.jpg")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center center',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'relative',
//     };

//     return (
//         <div style={fixedBackgroundStyle}>
//             <svg ref={svgRef} width={svgSize.width} height={svgSize.height} />
//         </div>
//     );
// };

// export default WordCloud;




// // 241016
// // 전체적인 색감이 좀 올드하다. 좀 더 옅어도 된다.
// // words가 현재 맵핑된 데이타면 더 좋겠다.


// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import cloud from 'd3-cloud';

// const FixedBackground = () => {
//     const svgRef = useRef(null);
//     const [animate, setAnimate] = useState(false);
//     const [svgSize, setSvgSize] = useState({ width: 600, height: 600 });

//     const [isMobile, setIsMobile] = useState(false);
//     useEffect(() => {
//         const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//         if (/android|ip(hone|od|ad)|windows phone/i.test(userAgent)) {
//             setIsMobile(true);
//         }
//     }, []);

//     useEffect(() => {
//         // 반응형 SVG 크기 설정
//         const handleResize = () => {
//             const width = window.innerWidth < 600 ? window.innerWidth : 600;
//             const height = window.innerHeight < 600 ? window.innerHeight : 600;
//             setSvgSize({ width, height });
//         };

//         handleResize(); // 초기 크기 설정

//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     useEffect(() => {
//         const words = [
//             { text: 'Thanks', size: 50 },
//             { text: 'Gracias', size: 45 },
//             { text: 'Merci', size: 40 },
//             { text: 'Danke', size: 35 },
//             { text: 'Grazie', size: 30 },
//             { text: 'ありがとう', size: 25 },
//             { text: '谢谢', size: 20 },
//             { text: '감사합니다', size: 18 },
//             { text: 'Спасибо', size: 16 },
//             { text: 'شكرا', size: 14 },
//             { text: 'Obrigado', size: 12 },
//             { text: 'धन्यवाद', size: 10 },
//             { text: 'Teşekkürler', size: 9 },
//             { text: 'Dank je', size: 8 },
//             { text: 'Tack', size: 7 },
//             { text: 'ขอบคุณ', size: 6 },
//             { text: 'Ευχαριστώ', size: 5 },
//             { text: 'Köszönöm', size: 5 },
//             { text: 'Děkuji', size: 5 },
//             { text: 'Kiitos', size: 5 },
//             { text: 'Cảm ơn', size: 5 },
//             { text: 'Ďakujem', size: 5 },
//             { text: 'Terima kasih', size: 5 },
//             { text: 'Salamat', size: 5 },
//             { text: 'Takk', size: 5 },
//             { text: 'Хвала', size: 5 },
//             { text: 'Благодаря', size: 5 },
//             { text: 'Дякую', size: 5 },
//             { text: 'Aitäh', size: 5 },
//             { text: 'Paldies', size: 5 },
//             { text: 'Ačiū', size: 5 },
//             { text: 'Asante', size: 5 },
//             { text: 'Tak', size: 5 },
//             { text: 'Hvala', size: 5 },
//             { text: 'Dziękuję', size: 5 }, // Polish
//             { text: 'Shukraan', size: 5 }, // Arabic
//             { text: 'Obrigado', size: 5 }, // Portuguese
//             { text: 'Dhanyawaad', size: 5 }, // Hindi
//             { text: 'Tack så mycket', size: 5 }, // Swedish
//             { text: 'Merci beaucoup', size: 5 }, // French
//             { text: 'Grazie mille', size: 5 }, // Italian
//             { text: 'Arigatou gozaimasu', size: 5 }, // Japanese
//             { text: 'Mille grazie', size: 5 }, // Italian
//             { text: 'Xie xie', size: 5 }, // Chinese
//             { text: 'Takk fyrir', size: 5 }, // Icelandic
//             { text: 'Dziekuje', size: 5 }, // Polish
//             { text: 'Merci bien', size: 5 }, // French
//             { text: 'Shukran jazilan', size: 5 }, // Arabic
//             { text: 'Takk fyrir allt', size: 5 }, // Icelandic
//             { text: 'Gracias mil', size: 5 }, // Spanish
//             { text: 'Cám ơn rất nhiều', size: 5 }, // Vietnamese
//             { text: 'Kamsahamnida', size: 5 }, // Korean
//             { text: 'Gracias por todo', size: 5 }, // Spanish
//             { text: 'Muchissimas gracias', size: 5 }, // Spanish
//             { text: 'Takk fyrir að koma', size: 5 }, // Icelandic
//             { text: 'Mèsi anpil', size: 5 }, // Haitian Creole
//             { text: 'Děkuji moc', size: 5 }, // Czech
//             { text: 'Gracias por su ayuda', size: 5 }, // Spanish
//             { text: 'Shukran lak', size: 5 }, // Arabic
//             { text: 'Mahal kita', size: 5 }, // Filipino
//             { text: 'Merci pour votre aide', size: 5 }, // French
//             { text: 'Gracias por todo', size: 5 }, // Spanish
//             { text: 'Paldies par visu', size: 5 }, // Latvian
//             { text: 'Ačiū už viską', size: 5 }, // Lithuanian
//             { text: 'Tack för hjälpen', size: 5 }, // Swedish
//             { text: 'Takk fyrir aðstoðina', size: 5 }, // Icelandic
//             { text: 'Gracias por tu ayuda', size: 5 }, // Spanish
//             { text: 'Tack så mycket för hjälpen', size: 5 }, // Swedish
//             { text: 'Tack för att du kom', size: 5 }, // Swedish
//             { text: 'Dziękuję bardzo', size: 5 }, // Polish
//             { text: 'Asante sana', size: 5 }, // Swahili
//             { text: 'Merci pour tout', size: 5 }, // French
//             { text: 'Gracias por su apoyo', size: 5 }, // Spanish
//             { text: 'Shukran jazeelan', size: 5 }, // Arabic
//             { text: 'Takk fyrir stuðninginn', size: 5 }, // Icelandic
//             { text: 'Grazie per il tuo aiuto', size: 5 }, // Italian
//             { text: 'Merci pour votre soutien', size: 5 }, // French
//             { text: 'Tack för allt', size: 5 }, // Swedish
//             { text: 'Dziękuję za pomoc', size: 5 }, // Polish
//             { text: 'Kamsahamnida', size: 5 }, // Korean
//             { text: 'Shukran', size: 5 }, // Arabic
//             { text: 'Merci', size: 5 }, // French
//             { text: 'Grazie', size: 5 }, // Italian
//             { text: 'Gracias', size: 5 }, // Spanish
//             { text: 'Thank you', size: 5 }, // English
//             { text: 'Gracias', size: 5 }, // Spanish
//             { text: 'Merci', size: 5 }, // French
//             { text: 'Danke', size: 5 }, // German
//             { text: 'Köszönöm', size: 5 }, // Hungarian
//             { text: 'Spasibo', size: 5 }, // Russian
//             { text: 'Danke schön', size: 5 }, // German
//             { text: 'Multumesc', size: 5 }, // Romanian
//             { text: 'Tack så mycket', size: 5 }, // Swedish
//             { text: 'Obrigado', size: 5 }, // Portuguese
//             { text: 'Merci beaucoup', size: 5 }, // French
//             { text: 'Tak', size: 5 }, // Danish
//             { text: 'Takk', size: 5 }, // Norwegian
//             { text: 'Hvala', size: 5 }, // Serbian
//             { text: 'Cám ơn', size: 5 }, // Vietnamese
//             { text: 'Gracias', size: 5 }, // Spanish
//             { text: 'Děkuji', size: 5 }, // Czech
//             { text: 'Aitäh', size: 5 }, // Estonian
//             { text: 'Paldies', size: 5 }, // Latvian
//             { text: 'Ačiū', size: 5 } // Lithuanian
//         ];

//         const layout = cloud()
//             .size([svgSize.width, svgSize.height])
//             .words(words.map(word => ({ text: word.text, size: word.size })))
//             .padding(5)
//             .rotate(() => (Math.random() > 0.5 ? 90 : 0))
//             .fontSize(d => d.size)
//             .on('end', draw);

//         layout.start();

//         function draw(words) {
//             d3.select(svgRef.current)
//                 .selectAll('*').remove();

//             const g = d3.select(svgRef.current)
//                 .append('g')
//                 .attr('transform', `translate(${svgSize.width / 2}, ${svgSize.height / 2})`);

//             const text = g.selectAll('text')
//                 .data(words)
//                 .enter()
//                 .append('text')
//                 .style('font-size', d => `${d.size}px`)
//                 .style('font-family', 'sans-serif')
//                 .style('font-weight', 'bold')
//                 .style('fill', () => `hsl(${Math.random() * 360}, 50%, 70%)`) // 부드러운 색감
//                 .attr('text-anchor', 'middle')
//                 .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
//                 .text(d => d.text)
//                 .style('opacity', 0);

//             if (animate) {
//                 text.transition()
//                     .duration(1000)
//                     .delay((d, i) => i * 100)
//                     .style('opacity', 1);
//             }
//         }
//     }, [animate, svgSize]);

//     // 스크롤 이벤트 리스너 추가
//     useEffect(() => {
//         const handleScroll = () => {
//             const svgElement = svgRef.current;
//             if (svgElement) {
//                 const { top } = svgElement.getBoundingClientRect();
//                 if (top < window.innerHeight && top > 0) {
//                     setAnimate(true);
//                 }
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     // https://unsplash.com/photos/grayscale-photo-of-trees-and-pathway-rydQVdwcgUQ

//     const fixedBackgroundStyle = {
//         // height: '100vh',
//         height: isMobile ? '70vh' : '100vh',
//         // backgroundAttachment: 'fixed',
//         backgroundAttachment: isMobile ? 'relative' : 'fixed',
//         backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url("/images/bg-image.jpg")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center center',
        
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'relative',
//     };

//     return (
//         <div style={fixedBackgroundStyle}>
//             <svg ref={svgRef} width={svgSize.width} height={svgSize.height} />
//         </div>
//     );
// };

// export default FixedBackground;
