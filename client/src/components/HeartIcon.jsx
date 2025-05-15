import React from 'react'

const HeartIcon = () => {
  return (
    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-green-500 hover:bg-green-100 transition duration-300 ease-in-out">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21c-.4 0-1.1-.3-1.6-.8C8.4 18.7 5 15.4 5 11.7 5 9.1 7.1 7 9.7 7c1.2 0 2.3.5 3.1 1.3C13.9 7.5 15 7 16.3 7c2.6 0 4.7 2.1 4.7 4.7 0 3.7-3.4 7-5.4 8.5-.5.5-1.2.8-1.6.8z"
        />
      </svg>
    </div>
  );
};


export default HeartIcon