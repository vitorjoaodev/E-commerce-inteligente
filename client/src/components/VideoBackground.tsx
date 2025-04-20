import React from 'react';

const VideoBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden">
      <div className="absolute inset-0 w-full h-full after:content-[''] after:absolute after:inset-0 after:bg-black after:bg-opacity-70">
        <video className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2" autoPlay loop muted playsInline>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-flying-over-clouds-at-sunset-1187-large.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos em HTML5.
        </video>
      </div>
    </div>
  );
};

export default VideoBackground;
