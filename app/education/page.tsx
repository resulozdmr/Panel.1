'use client';

import React, { useState } from 'react';

type Video = {
  title: string;
  link: string;
  thumbnail: string;
};

const EducationPage = () => {
  // Sample video data
  const videos: Video[] = [
    {
      title: "How to Build a Startup",
      link: "https://www.youtube.com/watch?v=rjk0NvFpM8s",
      thumbnail: "https://img.youtube.com/vi/rjk0NvFpM8s/hqdefault.jpg",
    },
    {
      title: "The Future of Transportation",
      link: "https://www.youtube.com/watch?v=Bb3tqaPHWbY",
      thumbnail: "https://img.youtube.com/vi/Bb3tqaPHWbY/hqdefault.jpg",
    },
    {
      title: "AI in Healthcare",
      link: "https://www.youtube.com/watch?v=nsGziOqtBwE",
      thumbnail: "https://img.youtube.com/vi/nsGziOqtBwE/hqdefault.jpg",
    },
    {
      title: "Exploring Space Innovations",
      link: "https://www.youtube.com/watch?v=IBRKAF7keng",
      thumbnail: "https://img.youtube.com/vi/IBRKAF7keng/hqdefault.jpg",
    },
  ];

  // Set the first video as the default selected video
  const [selectedVideo, setSelectedVideo] = useState<Video>(videos[0]);

  // Update selected video when a video is clicked
  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  // List recommended videos (videos other than the selected one)
  const recommendedVideos = videos.filter(
    (video) => video.link !== selectedVideo.link
  );

  // Helper function: Converts a YouTube watch link to an embed link.
  const getEmbedUrl = (link: string) => {
    try {
      const url = new URL(link);
      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : link;
    } catch (error) {
      return link;
    }
  };

  return (
    <div className="pt-40">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold">Education</h1>
      </header>

      {/* Main Content Container */}
      {/* On mobile (default) it's a column layout; on md and larger it's a row */}
      <div className="flex flex-col md:flex-row md:h-screen">
        {/* Left Section: Video List - Visible only on md and larger screens */}
        <div className="hidden md:block md:w-1/5 p-4 border-r border-gray-300 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Videos</h2>
          <ul>
            {videos.map((video, index) => (
              <li
                key={index}
                className="mb-4 p-2 cursor-pointer hover:bg-gray-200 rounded flex items-center"
                onClick={() => handleVideoClick(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-16 h-9 object-cover mr-2"
                />
                <span>{video.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Center Section: Selected Video */}
        <div className="w-full md:w-3/5 p-4">
          <div className="mb-4 aspect-video">
            <iframe
              className="w-full h-full"
              src={getEmbedUrl(selectedVideo.link)}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
            {/* Additional video description or details can be added here */}
          </div>
        </div>

        {/* Right Section: Recommended Videos */}
        {/* On mobile, this section appears as a full-width block below the video */}
        <div className="w-full md:w-1/5 p-4 border-t md:border-t-0 md:border-l border-gray-300 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Recommended Videos</h2>
          <ul>
            {recommendedVideos.map((video, index) => (
              <li
                key={index}
                className="mb-4 p-2 cursor-pointer hover:bg-gray-200 rounded flex items-center"
                onClick={() => handleVideoClick(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-16 h-9 object-cover mr-2"
                />
                <span>{video.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
