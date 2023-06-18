import { useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  DirectionsRenderer,
} from "@react-google-maps/api";
import axios from "../api/axios";

const MapForm = ({ style, onAddressChange }) => {
  const mapRef = useRef(null);
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const searchBoxRef = useRef(null);
  const [directionsResult, setDirectionsResult] = useState(null);
  const [handleDrag, setHandleDrag] = useState(true);
  const [pickupPoints, setPickupPoints] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchPickup() {
      try {
        const response = await axios.get("/organization");
        const orgs = response.data;

        // Extract latitudes and longitudes
        const pickup = [];
        orgs.forEach((org) => {
          const employeesWithProgram = org.employee_ids.filter(
            (employee) => employee.opted_for_program === true
          );
          employeesWithProgram.forEach((employee) => {
            const { lat, lng } = employee;
            const object = {
              location: new window.google.maps.LatLng(lat, lng),
              stopover: true,
            };
            pickup.push(object);
          });
        });

        setPickupPoints(pickup);
        setLoaded(true);
        console.log(pickupPoints);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPickup();
  }, []);

  const handleButtonClick = async () => {
    if (fromLocation && toLocation) {
      const geocoder = new window.google.maps.Geocoder();

      // Geocode the from location
      geocoder.geocode({ location: fromLocation }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const fromAddress = results[0].formatted_address;

          // Geocode the to location
          geocoder.geocode({ location: toLocation }, (results, status) => {
            if (status === "OK" && results && results.length > 0) {
              const toAddress = results[0].formatted_address;

              const directionsService =
                new window.google.maps.DirectionsService();
              const origin = { lat: fromLocation.lat, lng: fromLocation.lng };
              const destination = { lat: toLocation.lat, lng: toLocation.lng };
              directionsService.route(
                {
                  origin: origin,
                  destination: destination,
                  waypoints: pickupPoints,
                  optimizeWaypoints: true,
                  travelMode: "DRIVING",
                },
                (result, status) => {
                  if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirectionsResult(result);
                    onAddressChange(
                      fromAddress,
                      toAddress,
                      fromLocation.lat,
                      fromLocation.lng,
                      toLocation.lat,
                      toLocation.lng
                    );
                  } else {
                    console.error(`error fetching directions ${result}`);
                  }
                }
              );
            } else {
              console.error(`error geocoding to location ${status}`);
            }
          });
        } else {
          console.error(`error geocoding from location ${status}`);
        }
      });

      setHandleDrag(false);
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

  const handlePlacesChanged = (from, to) => {
    const places = searchBoxRef.current.state.searchBox.getPlaces();

    if (places && places.length > 0) {
      const { formatted_address } = places[0];
      const fromAddress = !fromLocation ? formatted_address : from;
      const toAddress = fromLocation && !toLocation ? formatted_address : to;
      const location = places[0].geometry.location;
      const lat = location ? location.lat() : null;
      const lng = location ? location.lng() : null;

      const newLocation = { lat, lng };

      if (!fromLocation) {
        setFromLocation(newLocation);
      } else if (fromLocation && !toLocation) {
        setToLocation(newLocation);
      }

      onAddressChange(
        fromAddress,
        toAddress,
        fromLocation.lat,
        fromLocation.lng,
        toLocation.lat,
        toLocation.lng
      );
    }
  };

  const handleReset = () => {
    setFromLocation(null);
    setToLocation(null);
    setDirectionsResult(null);
    setHandleDrag(true);
    onAddressChange(null, null, null, null, null, null, true);
  };

  return (
    <div style={style}>
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={{ height: "100%", width: "100%" }}
        zoom={15}
        center={toLocation || fromLocation || { lat: 13.3379, lng: 77.1173 }}
        onClick={handleMapClick}
      >
        {loaded &&
          pickupPoints.map((pickupPoint, index) => (
            <Marker
              key={index}
              position={{
                lat: pickupPoint.location.lat(),
                lng: pickupPoint.location.lng(),
              }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: new window.google.maps.Size(32, 32),
              }}
              draggable={handleDrag}
              onDragEnd={(event) => handleMarkerDragEnd(event, "pickup")}
              animation={window.google.maps.Animation.DROP}
              label={{ text: `P${index + 1}`, color: "black" }}
            />
          ))}

        {fromLocation && (
          <Marker
            position={{ lat: fromLocation.lat, lng: fromLocation.lng }}
            draggable={handleDrag}
            onDragEnd={(event) => handleMarkerDragEnd(event, "from")}
            animation={window.google.maps.Animation.DROP}
            label={{ text: "SOURCE", color: "black" }}
          />
        )}
        {toLocation && (
          <Marker
            position={{ lat: toLocation.lat, lng: toLocation.lng }}
            draggable={handleDrag}
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

export default MapForm;

// import { useRef, useState, useEffect } from "react";
// import {
//   GoogleMap,
//   Marker,
//   StandaloneSearchBox,
//   DirectionsRenderer,
// } from "@react-google-maps/api";

// // Example usage
// const pickupPoints = [
//   { lat: 13.332625, lng: 77.125979 },
//   { lat: 13.329661, lng: 77.116881 },
//   { lat: 13.331665, lng: 77.113694 },
// ];

// // Define the waypoints array
// const waypoints = pickupPoints.map((pickupPoint) => ({
//   location: new window.google.maps.LatLng(pickupPoint.lat, pickupPoint.lng),
//   stopover: true,
// }));

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

// const MapForm = ({ style, onAddressChange }) => {
//   const mapRef = useRef(null);
//   const [fromLocation, setFromLocation] = useState(null);
//   const [toLocation, setToLocation] = useState(null);
//   const searchBoxRef = useRef(null);
//   const [directionsResult, setDirectionsResult] = useState(null);
//   const [handleDrag, setHandleDrag] = useState(true);
//   // const [currentLocation, setCurrentLocation] = useState(null);

//   const handleButtonClick = async () => {
//     if (fromLocation && toLocation) {
//       const geocoder = new window.google.maps.Geocoder();

//       // Geocode the from location
//       geocoder.geocode({ location: fromLocation }, (results, status) => {
//         if (status === "OK" && results && results.length > 0) {
//           const fromAddress = results[0].formatted_address;

//           // Geocode the to location
//           geocoder.geocode({ location: toLocation }, (results, status) => {
//             if (status === "OK" && results && results.length > 0) {
//               const toAddress = results[0].formatted_address;

//               const directionsService =
//                 new window.google.maps.DirectionsService();
//               const origin = { lat: fromLocation.lat, lng: fromLocation.lng };
//               const destination = { lat: toLocation.lat, lng: toLocation.lng };
//               directionsService.route(
//                 {
//                   origin: origin,
//                   destination: destination,
//                   waypoints: waypoints,
//                   optimizeWaypoints: true,
//                   travelMode: "DRIVING",
//                 },
//                 (result, status) => {
//                   if (status === window.google.maps.DirectionsStatus.OK) {
//                     setDirectionsResult(result);
//                     onAddressChange(
//                       fromAddress,
//                       toAddress,
//                       fromLocation.lat,
//                       fromLocation.lng,
//                       toLocation.lat,
//                       toLocation.lng
//                     );
//                   } else {
//                     console.error(`error fetching directions ${result}`);
//                   }
//                 }
//               );
//             } else {
//               console.error(`error geocoding to location ${status}`);
//             }
//           });
//         } else {
//           console.error(`error geocoding from location ${status}`);
//         }
//       });

//       setHandleDrag(false);
//     }
//   };

//   const handleMapClick = (event) => {
//     const { latLng } = event;
//     const lat = latLng.lat();
//     const lng = latLng.lng();

//     if (!fromLocation) {
//       setFromLocation({ lat, lng });
//     } else if (!toLocation) {
//       setToLocation({ lat, lng });
//     }
//   };

//   const handleMarkerDragEnd = (event, markerType) => {
//     const { latLng } = event;
//     const lat = latLng.lat();
//     const lng = latLng.lng();

//     if (markerType === "from") {
//       setFromLocation({ lat, lng });
//     } else if (markerType === "to") {
//       setToLocation({ lat, lng });
//     }
//   };

//   const handlePlacesChanged = (from, to) => {
//     const places = searchBoxRef.current.state.searchBox.getPlaces();

//     if (places && places.length > 0) {
//       const { formatted_address } = places[0];
//       const fromAddress = !fromLocation ? formatted_address : from;
//       const toAddress = fromLocation && !toLocation ? formatted_address : to;
//       const location = places[0].geometry.location;
//       const lat = location ? location.lat() : null;
//       const lng = location ? location.lng() : null;

//       const newLocation = { lat, lng };

//       if (!fromLocation) {
//         setFromLocation(newLocation);
//       } else if (fromLocation && !toLocation) {
//         setToLocation(newLocation);
//       }

//       onAddressChange(
//         fromAddress,
//         toAddress,
//         fromLocation.lat,
//         fromLocation.lng,
//         toLocation.lat,
//         toLocation.lng
//       );
//     }
//   };

//   const handleReset = () => {
//     setFromLocation(null);
//     setToLocation(null);
//     setDirectionsResult(null);
//     setHandleDrag(true);
//     onAddressChange(null, null, null, null, null, null, true);
//   };

//   // useEffect(() => {
//   //   const fetchCurrentLocation = async () => {
//   //     try {
//   //       const currentLocation = await getCurrentLocation();
//   //       setCurrentLocation(currentLocation);
//   //     } catch (error) {
//   //       console.error("Error fetching current location:", error);
//   //     }
//   //   };

//   //   fetchCurrentLocation();
//   // }, []);

//   return (
//     <div style={style}>
//       <GoogleMap
//         ref={mapRef}
//         mapContainerStyle={{ height: "100%", width: "100%" }}
//         zoom={15}
//         center={toLocation || fromLocation || { lat: 13.3379, lng: 77.1173 }}
//         onClick={handleMapClick}
//       >
//         {/* {currentLocation && (
//           <Marker
//             position={currentLocation}
//             icon={{
//               url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
//               scaledSize: new window.google.maps.Size(32, 32),
//             }}
//           />
//         )} */}
//         {pickupPoints.map((pickupPoint, index) => (
//           <Marker
//             key={index}
//             position={pickupPoint}
//             icon={{
//               url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//               scaledSize: new window.google.maps.Size(32, 32),
//             }}
//             draggable={handleDrag}
//             onDragEnd={(event) => handleMarkerDragEnd(event, "pickup")}
//             animation={window.google.maps.Animation.DROP}
//             label={{ text: `P${index + 1}`, color: "black" }}
//           />
//         ))}

//         {fromLocation && (
//           <Marker
//             position={{ lat: fromLocation.lat, lng: fromLocation.lng }}
//             draggable={handleDrag}
//             onDragEnd={(event) => handleMarkerDragEnd(event, "from")}
//             animation={window.google.maps.Animation.DROP}
//             label={{ text: "SOURCE", color: "black" }}
//           />
//         )}
//         {toLocation && (
//           <Marker
//             position={{ lat: toLocation.lat, lng: toLocation.lng }}
//             draggable={handleDrag}
//             onDragEnd={(event) => handleMarkerDragEnd(event, "to")}
//             animation={window.google.maps.Animation.DROP}
//             label={{ text: "DESTINATION", color: "black" }}
//           />
//         )}

//         <StandaloneSearchBox
//           ref={searchBoxRef}
//           onPlacesChanged={handlePlacesChanged}
//         >
//           <input
//             type="text"
//             placeholder="Search for a place"
//             style={{
//               boxSizing: "border-box",
//               border: "1px solid transparent",
//               width: "240px",
//               height: "32px",
//               padding: "0 12px",
//               borderRadius: "3px",
//               boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
//               fontSize: "18px",
//               outline: "none",
//               textOverflow: "ellipses",
//               position: "absolute",
//               left: "50%",
//               marginLeft: "-120px",
//               backgroundColor: "#ADD8E6",
//             }}
//           />
//         </StandaloneSearchBox>

//         {directionsResult && (
//           <DirectionsRenderer
//             directions={directionsResult}
//             options={{ suppressMarkers: true }}
//           />
//         )}

//         {fromLocation && toLocation && (
//           <button
//             onClick={handleButtonClick}
//             style={{
//               boxSizing: `border-box`,
//               border: `1px solid transparent`,
//               width: `140px`,
//               height: `32px`,
//               padding: `0 12px`,
//               borderRadius: `3px`,
//               boxShadow: `1px 2px 6px rgba(0, 0, 0, 0.3)`,
//               fontSize: `18px`,
//               outline: `none`,
//               textOverflow: `ellipses`,
//               position: "absolute",
//               left: "78%",
//               marginLeft: "-120px",
//               backgroundColor: "#ADD8E6",
//             }}
//           >
//             Done
//           </button>
//         )}

//         <button
//           onClick={handleReset}
//           style={{
//             boxSizing: `border-box`,
//             border: `1px solid transparent`,
//             width: `140px`,
//             height: `32px`,
//             padding: `0 12px`,
//             borderRadius: `3px`,
//             boxShadow: `1px 2px 6px rgba(0, 0, 0, 0.3)`,
//             fontSize: `18px`,
//             outline: `none`,
//             textOverflow: `ellipses`,
//             position: "absolute",
//             right: "4%",
//             marginLeft: "-120px",
//             backgroundColor: "#ADD8E6",
//             color: "red",
//           }}
//         >
//           Reset
//         </button>
//       </GoogleMap>
//     </div>
//   );
// };

// export default MapForm;
