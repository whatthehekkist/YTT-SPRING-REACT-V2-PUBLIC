import React from 'react';

const VideoBackGround = () => {
	return (
		<video preload="metadata" autoPlay loop muted>
			<source src="/videos/kovaleva.mp4" type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	);
};

export default VideoBackGround;



