import React, { useState, useEffect } from 'react';
import { FaExpand, FaCompress, FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

const CCTV = () => {
  const [cameras, setCameras] = useState([
    { id: 1, name: 'Vihar Nagar Drainage', status: 'active', image: 'https://picsum.photos/seed/cam1/300/200' },
    { id: 2, name: 'Parking Lot A', status: 'active', image: 'https://picsum.photos/seed/cam2/300/200' },
    { id: 3, name: 'School -Tank Bund nagar', status: 'active', image: 'https://picsum.photos/seed/cam3/300/200' },
    { id: 4, name: 'Himayat Nagar Roadworks', status: 'inactive', image: 'https://picsum.photos/seed/cam4/300/200' },
    { id: 5, name: 'Banjara hills', status: 'active', image: 'https://picsum.photos/seed/cam5/300/200' },
    { id: 6, name: 'Emergency Exit', status: 'active', image: 'https://picsum.photos/seed/cam6/300/200' },
  ]);

  const [selectedCamera, setSelectedCamera] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        setSelectedCamera(null);
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-8">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-blue-300 tracking-tight">CCTV Monitoring</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map(camera => (
          <div
            key={camera.id}
            className={`bg-gray-800 rounded-xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 ${camera.status === 'inactive' ? 'opacity-50' : ''}`}
            onClick={() => camera.status === 'active' && setSelectedCamera(camera)}
          >
            <img src={camera.image} alt={camera.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-white">{camera.name}</h2>
              <p className={`text-sm ${camera.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                {camera.status === 'active' ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
        ))}
      </div>
      {selectedCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg overflow-hidden max-w-4xl w-full">
            <div className="relative">
              <img
                src={selectedCamera.image}
                alt={selectedCamera.name}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h2 className="text-2xl font-bold text-white">{selectedCamera.name}</h2>
              </div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <button className="text-white mr-4" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button className="text-white mr-4">
                  <FaStepBackward />
                </button>
                <button className="text-white">
                  <FaStepForward />
                </button>
              </div>
              <div>
                <button className="text-white" onClick={toggleFullscreen}>
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CCTV;