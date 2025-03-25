import React from 'react';

export default function CalendarPage() {
  return (
    <div className="min-h-screen pt-20 bg-[#F4F2EE] px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=a4a907818fbe02b4790eca7264d32122d87145955b8bb235d39b6f00ee3b7091%40group.calendar.google.com&ctz=Europe%2FIstanbul"
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-md"
            frameBorder="0"
            scrolling="no"
            title="Google Calendar"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
