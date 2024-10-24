import React from 'react';

const ProgressBar = ({ progress }) => {
  const getProgressColor = () => {
    if (progress >= 75) return 'bg-green-500'; // Green for high progress
    if (progress >= 50) return 'bg-yellow-400'; // Yellow for medium progress
    return 'bg-red-500'; // Red for low progress
  };

  return (
    <div className="w-full bg-gray-300 rounded-full h-6 mt-4">
      <div
        className={`h-6 rounded-full ${getProgressColor()}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
