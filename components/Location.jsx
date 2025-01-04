"use client";
import { useState, useEffect, useRef } from "react";
import { Geolocation } from "@capacitor/geolocation";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import Map from "./map/Map";
import List from "./list/List";
import { MapSkleton } from "./skleton/Skleton";

const Location = () => {
  const [location, setLocation] = useState(null);
  const [distanceTraveled, setDistanceTraveled] = useState(0); // Distance in meters
  const [error, setError] = useState(null);
  const mapRef = useRef(null); // Reference to the map container
  const markerRef = useRef(null); // Reference to the marker
  const mapInstance = useRef(null); // Reference to the Leaflet map instance
  const previousLocation = useRef(null); // Use a ref to store previous location

  // Function to calculate distance
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Radius of the Earth in meters
    const toRad = (value) => (value * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };    

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {  // Check if the map is already initialized
      mapInstance.current = L.map(mapRef.current).setView([0, 0], 13);
  
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      }).addTo(mapInstance.current);
  
      const marker = L.marker([0, 0]).addTo(mapInstance.current);
      markerRef.current = marker;
    }
  }, []);
  

  useEffect(() => {
    const getInitialLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = position.coords;

        if (mapInstance.current) {
          mapInstance.current.setView([latitude, longitude], 15);
        }
        if (markerRef.current) {
          markerRef.current.setLatLng([latitude, longitude]);
        }
        setLocation({ latitude, longitude });
        previousLocation.current = { latitude, longitude }; 
      } catch (err) {
        setError("Could not retrieve initial location");
      }
    };

    getInitialLocation();
  }, []);

  useEffect(() => {
    let watchId;

    const startTracking = async () => {
      try {
        watchId = await Geolocation.watchPosition({}, (position, err) => {
          if (err) {
            setError("Could not retrieve location");
            return;
          }

          const { latitude, longitude } = position.coords;

          if (previousLocation.current) {
            const distance = calculateDistance(
              previousLocation.current.latitude,
              previousLocation.current.longitude,
              latitude,
              longitude
            );
            setDistanceTraveled((prev) => prev + distance);
          }

          setLocation({ latitude, longitude });

          previousLocation.current = { latitude, longitude };

          if (markerRef.current) {
            markerRef.current.setLatLng([latitude, longitude]);
          }
          if (mapInstance.current) {
            mapInstance.current.setView([latitude, longitude], 15);
          }
        });
      } catch (err) {
        setError("Error starting location tracking");
      }
    };

    startTracking();

    // Cleanup on component unmount
    return () => {
      if (watchId) {
        Geolocation.clearWatch({ id: watchId });
      }
    };
  }, []); // No dependency on `previousLocation` here

  return (
    <div>
      {/* <MapSkleton   /> */}
      <Map mapRef={mapRef}/>
   
      {/* {location ? (
      <div className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Location</h2>
      <div className="space-y-2">
        <p className="text-lg text-gray-600">
          <span className="font-semibold text-gray-800">Latitude:</span> {location.latitude}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-semibold text-gray-800">Longitude:</span> {location.longitude}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-semibold text-gray-800">Distance Traveled:</span> {distanceTraveled.toFixed(2)} meters
        </p>
      </div>
      </div>
      ) : (
        <p>{error ? error : "Loading location..."}</p>
      )} */}
   

    </div>
  );
};

export default Location;
