import { Info } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

const newsItems = [
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

const News = () => {
  return (
    <div className="hidden md:block w-[22%] bg-white h-fit rounded-lg border border-gray-300 fixed right-8 top-20 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <h2 className="text-md font-medium">News</h2>
        <Info size={18} />
      </div>

      {/* News Items Section */}
      <div className="p-3 space-y-3">
        {newsItems.map((news, index) => (
          <a
            key={index}
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gray-50 p-2 rounded-md hover:bg-gray-100"
          >
            <Image
              src={news.thumbnail}
              alt={news.title}
              width={48}
              height={48}
              className="rounded-md mr-3"
            />
            <div>
              <h1 className="text-sm font-medium text-blue-600">{news.title}</h1>
              <p className="text-xs text-gray-600">Read more</p>
            </div>
          </a>
        ))}
      </div>

      {/* Ekstra bir bölüm eklemek isterseniz buraya ekleyebilirsiniz */}
    </div>
  );
};

export default News;
