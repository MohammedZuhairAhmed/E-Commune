import { useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  DirectionsRenderer,
} from "@react-google-maps/api";
import axios from "../api/axios";

const MapForm = () => {
  const mapRef = useRef(null);
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const searchBoxRef = useRef(null);
  const [directionsResult, setDirectionsResult] = useState(null);

  const handleButtonClick = async () => {
    if (fromLocation && toLocation) {
      const directionsService = new window.google.maps.DirectionsService();
      const origin = { lat: fromLocation.lat, lng: fromLocation.lng };
      const destination = { lat: toLocation.lat, lng: toLocation.lng };
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: "WALKING",
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResult(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    if (!fromLocation) {
      setFromLocation({ lat, lng });
    } else if (!toLocation) {
      setToLocation({ lat, lng });
    }
  };

  const handleMarkerDragEnd = (event, markerType) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    if (markerType === "from") {
      setFromLocation({ lat, lng });
    } else if (markerType === "to") {
      setToLocation({ lat, lng });
    }
  };

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.state.searchBox.getPlaces();

    if (places && places.length > 0) {
      const { location } = places[0].geometry;
      const lat = location.lat();
      const lng = location.lng();
      const newLocation = { lat, lng };

      if (!fromLocation) {
        setFromLocation(newLocation);
      } else if (fromLocation && !toLocation) {
        setToLocation(newLocation);
      }
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1" }}>
        {/* Add additional content on the left side */}
      </div>
      <div style={{ flex: "1", height: "100vh", width: "50%", float: "right" }}>
        <GoogleMap
          ref={mapRef}
          mapContainerStyle={{ height: "100%", width: "100%" }}
          zoom={15}
          center={toLocation || fromLocation || { lat: 13.3379, lng: 77.1173 }}
          onClick={handleMapClick}
        >
          {fromLocation && (
            <Marker
              position={{ lat: fromLocation.lat, lng: fromLocation.lng }}
              draggable
              onDragEnd={(event) => handleMarkerDragEnd(event, "from")}
              animation={window.google.maps.Animation.DROP}
              label={{ text: "SOURCE", color: "black" }}
            />
          )}
          {toLocation && (
            <Marker
              position={{ lat: toLocation.lat, lng: toLocation.lng }}
              draggable
              onDragEnd={(event) => handleMarkerDragEnd(event, "to")}
              animation={window.google.maps.Animation.DROP}
              label={{ text: "DESTINATION", color: "black" }}
            />
          )}

          <StandaloneSearchBox
            ref={searchBoxRef}
            onPlacesChanged={handlePlacesChanged}
          >
            <input
              type="text"
              placeholder="Search for a place"
              style={{
                boxSizing: "border-box",
                border: "1px solid transparent",
                width: "240px",
                height: "32px",
                padding: "0 12px",
                borderRadius: "3px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                fontSize: "14px",
                outline: "none",
                textOverflow: "ellipses",
                position: "absolute",
                left: "50%",
                marginLeft: "-120px",
                backgroundColor: "#ADD8E6",
              }}
            />
          </StandaloneSearchBox>

          {directionsResult && (
            <DirectionsRenderer
              directions={directionsResult}
              options={{ suppressMarkers: true }}
            />
          )}

          {fromLocation && toLocation && (
            <button
              onClick={handleButtonClick}
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `140px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `1px 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "78%",
                marginLeft: "-120px",
                backgroundColor: "#ADD8E6",
              }}
            >
              Done
            </button>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapForm;
