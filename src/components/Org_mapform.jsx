import { useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  DirectionsRenderer,
} from "@react-google-maps/api";


// const getCurrentLocation = () => {
//   return new Promise((resolve, reject) => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const currentLocation = { lat: latitude, lng: longitude };
//           resolve(currentLocation);
//         },
//         (error) => {
//           reject(error);
//         }
//       );
//     } else {
//       reject(new Error("Geolocation is not supported by this browser."));
//     }
//   });
// };

const Org_mapform = ({ style, onAddressChange }) => {
  const mapRef = useRef(null);
  const [source, setSource] = useState(null);
  const searchBoxRef = useRef(null);
  const [directionsResult, setDirectionsResult] = useState(null);
  const [handleDrag, setHandleDrag] = useState(true);
  const [lat,setLat] = useState(null);
  const [lng,setLng] = useState(null);

  const handleButtonClick = async () => {
    if (source) {
      onAddressChange(
        source,
        lat,
        lng
      );
      setHandleDrag(false);
    }
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const lt = latLng.lat();
    const lg = latLng.lng();

    if (!source) {
      setLat(lt);
      setLng(lg);
    }
  };

  const handleMarkerDragEnd = (event) => {
    const { latLng } = event;
    const lt = latLng.lat();
    const lg = latLng.lng();

    setLat(lt);
    setLng(lg);

  };

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.state.searchBox.getPlaces();

    if (places && places.length > 0) {
      const { formatted_address } = places[0];
     // const source = !fromLocation ? formatted_address : from;
      const location = places[0].geometry.location;
      const lat = location ? location.lat() : null;
      const lng = location ? location.lng() : null;

      setSource(source)
      setLat(lat);
      setLng(lng);


      onAddressChange(
        source,
        lat,
        lng
      );
    }
  };

  const handleReset = () => {
    setSource(null);
    setLat(null);
    setLng(null);
    setHandleDrag(true);
    onAddressChange(null, null, null,true);
  };

  // useEffect(() => {
  //   const fetchCurrentLocation = async () => {
  //     try {
  //       const currentLocation = await getCurrentLocation();
  //       setCurrentLocation(currentLocation);
  //     } catch (error) {
  //       console.error("Error fetching current location:", error);
  //     }
  //   };

  //   fetchCurrentLocation();
  // }, []);

  return (
    <div style={style}>
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={{ height: "100%", width: "100%" }}
        zoom={15}
        center={{ lat: 13.3379, lng: 77.1173 }}
        onClick={handleMapClick}
      >
        {/* {currentLocation && (
          <Marker
            position={currentLocation}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
              scaledSize: new window.google.maps.Size(32, 32),
            }}
          />
        )} */}

        {source && (
          <Marker
            position={{ lat: lat, lng: lng }}
            draggable={handleDrag}
            onDragEnd={(event) => handleMarkerDragEnd(event)}
            animation={window.google.maps.Animation.DROP}
            label={{ text: "SOURCE", color: "black" }}
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
              fontSize: "18px",
              outline: "none",
              textOverflow: "ellipses",
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
              backgroundColor: "#ADD8E6",
            }}
          />
        </StandaloneSearchBox>


        {source && (
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
              fontSize: `18px`,
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

        <button
          onClick={handleReset}
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `140px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `1px 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `18px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            right: "4%",
            marginLeft: "-120px",
            backgroundColor: "#ADD8E6",
            color: "red",
          }}
        >
          Reset
        </button>
      </GoogleMap>
    </div>
  );
};

export default Org_mapform;
