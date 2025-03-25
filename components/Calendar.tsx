import React from 'react';

const Calendar = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mt-4">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=a4a907818fbe02b4790eca7264d32122d87145955b8bb235d39b6f00ee3b7091%40group.calendar.google.com&ctz=Europe%2FIstanbul"
          style={{ border: 0 }}
          width="100%"
          height="400"
          frameBorder="0"
          scrolling="no"
          className="rounded-md shadow-sm"
          title="Google Calendar"
        ></iframe>
      </div>
    </div>
  );
};

export default Calendar;
