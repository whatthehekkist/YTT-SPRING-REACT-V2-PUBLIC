import React from 'react';

// alt for VideoEmbed.js
const ImageEmbed = ({ videoId, title }) => {
	console.log("Components.ImageEmbed----------------");
	console.log("videoId", videoId);
	console.log("title", title);

	return (
		<div style={{
			position: 'relative',
			paddingBottom: '56.25%',
			// paddingBottom: '43.25%', 
			height: 0,
			maxWidth: '80%',
			overflow: 'hidden',
			margin: '0 auto'
		}}>
			<a href={`https://youtu.be/${videoId}`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
				<img
					src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
					alt={title}
					title={title}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}
				/>
			</a>
		</div>
	);
};

export default ImageEmbed;
