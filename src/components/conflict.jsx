import React from 'react';

const ConflictPage = () => {
  return (
    <div className="w-full h-screen">
    <iframe
      src="https://e2rna7cdzpmddlkmdxoc3w.streamlit.app/"
      className="w-full h-full"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Streamlit App"
    ></iframe>
  </div>
  );
};

export default ConflictPage;
