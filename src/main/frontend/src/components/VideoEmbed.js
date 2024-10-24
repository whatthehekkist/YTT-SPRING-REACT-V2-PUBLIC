import React from 'react';

const YouTubeEmbed = ({ videoId, title }) => {

	console.log("Component.YouTubeEmbed----------------")
	console.log("videoId", videoId)
	console.log("title", title)

	return (
		<div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
			<iframe
				width="560"
				height="315"
				title={title}
				src={`https://www.youtube.com/embed/${videoId}`}
				frameBorder="0"
				// allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				// allowFullScreen
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
				}}
			/>
		</div>
	);
};

export default YouTubeEmbed;
