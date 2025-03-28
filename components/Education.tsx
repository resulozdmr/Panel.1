import { Info } from "lucide-react";
import React from "react";
import Image from "next/image";

const videoLinks = [
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

export default function Education() {
  return (
    <div className="ml-4 mt-4 hidden lg:block">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-md font-medium">Education</h2>
        <Info size={18} />
      </div>

      {/* Videos Section */}
      <div className="space-y-4">
        {videoLinks.map((video, index) => (
          <a
            key={index}
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gray-50 hover:bg-gray-100 rounded-md shadow-sm transition p-2 gap-3"
          >
            <div className="relative w-[80px] h-[60px] flex-shrink-0 rounded overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <p className="text-sm text-blue-600 font-medium hover:underline">
              {video.title}
            </p>
          </a>
        ))}
      </div>

      {/* Google Calendar Section */}
      <div className="mt-6">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=a4a907818fbe02b4790eca7264d32122d87145955b8bb235d39b6f00ee3b7091%40group.calendar.google.com&ctz=Europe%2FIstanbul"
          style={{ border: 0 }}
          width="100%"
          height="400"
          frameBorder="0"
          scrolling="no"
          className="rounded-md shadow-sm"
        ></iframe>
      </div>
    </div>
  );
}
