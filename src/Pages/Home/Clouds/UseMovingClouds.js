import { useState, useEffect } from 'react';

const useMovingClouds = () => {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    // Function to add a cloud with random properties
    const addCloud = () => {
      const newCloud = {
        type: Math.ceil(Math.random() * 7), // Assuming you have 7 types of clouds
        speed: Math.random() * 20 + 10, // Speed between 10 and 30 seconds
        zIndex: Math.ceil(Math.random() * 3) + 1, // Z-index between 2 and 4
        initialLeft: `${Math.random() * 100 - 50}%`, // Start position off-screen to the left
      };
      setClouds((prevClouds) => [...prevClouds, newCloud]);
    };

    // Interval to periodically add new clouds
    const interval = setInterval(addCloud, 4000); // Add a new cloud every 4 seconds

    // Cleanup function to clear the interval when the component using this hook unmounts
    return () => clearInterval(interval);
  }, []);

  return clouds;
};

export default useMovingClouds;
