import React, { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapComponent = ({ location }) => {
  const { lat, lng } = location;
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const center = {
    lat: lat || 37.7749,
    lng: lng - 0.02 || -122.4194,
  };

  const ApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY || "";

  return (
    <div>
      <LoadScript googleMapsApiKey={ApiKey}>
        <GoogleMap
          mapContainerStyle={{ ...containerStyle, borderRadius: "0.375rem", height: "288px" }}
          center={center}
          zoom={11}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false, 
          }}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
