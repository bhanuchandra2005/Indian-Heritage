import React, { useState, useEffect } from 'react';
import '../styles/StreetView.css';
import CircularMenu1 from "../components/CircularMenu1";
import { LoadingPage } from "./LoadingPage";

const StreetView = () => {
  const [place, setPlace] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate initial page loading
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setLoadingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setInitialLoading(false);
        }, 300);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = async () => {
    if (!place) return;

    setLoading(true);
    setLoadingProgress(0);
    
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 5;
      if (progress > 90) progress = 90;
      setLoadingProgress(progress);
    }, 200);

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${place},India&format=json`);
      const data = await response.json();

      clearInterval(progressInterval);
      setLoadingProgress(100);
      
      setTimeout(() => {
        setLoading(false);
        
        if (data.length === 0) {
          alert("Location not found in India!");
          return;
        }
  
        const lat = data[0].lat;
        const lon = data[0].lon;
  
        const url = `https://www.mapillary.com/app/?lat=${lat}&lng=${lon}&z=17`;
        window.open(url, '_blank');
      }, 500);
    } catch (err) {
      clearInterval(progressInterval);
      setLoadingProgress(100);
      
      setTimeout(() => {
        setLoading(false);
        console.error(err);
        alert("Error finding location.");
      }, 500);
    }
  };

  return (
    <div className="streetview-container">
      {(initialLoading || loading) && <LoadingPage percentage={loadingProgress} />}
      <CircularMenu1 />
      <h1>🛕 Explore India - Street View (Mapillary)</h1>
      <input
        type="text"
        placeholder="Enter Indian Place (e.g. Charminar)"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default StreetView;
