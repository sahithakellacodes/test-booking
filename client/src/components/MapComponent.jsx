import { useEffect, useRef, useCallback } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const MapComponent = ({ lat, lng }) => {
  const mapRef = useRef(null); // To store the map instance
  const markerRef = useRef(null); // To store the marker instance

  const center = {
    lat: lat + 0.005 || 37.7749,
    lng: lng + 0.005 || -122.4194,
  };

  const ApiKey = "AIzaSyBE98E5P6VzE2t3LrRnp724MUoAnt3NKy8";

  const onLoad = useCallback((map) => {
    mapRef.current = map;

    // Initialize the AdvancedMarkerElement
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: center,
      map: map, // Attach to the map
    });

    markerRef.current = marker;
  }, [center]);

  useEffect(() => {
    // Update marker position dynamically if `lat` or `lng` changes
    if (markerRef.current) {
      markerRef.current.position = center;
    }
  }, [center]);

  return (
    <LoadScript googleMapsApiKey={ApiKey} libraries={["marker"]}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
      />
    </LoadScript>
  );
};

export default MapComponent;
