import { useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "../api/axios";
import { useParams, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

const MapView = () => {
  const mapRef = useRef(null);
  const [directionsResult, setDirectionsResult] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [fromLat, setFromLat] = useState(null);
  const [fromLong, setFromLong] = useState(null);
  const [toLat, setToLat] = useState(null);
  const [toLong, setToLong] = useState(null);
  const [pickupPoints, setPickupPoints] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();
    const origin = { lat: fromLat, lng: fromLong };
    const destination = { lat: toLat, lng: toLong };
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
          console.log(JSON.stringify(pickupPoints));
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [loaded]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/vehicle");
        const vehicles = response.data;
        const vehicle = vehicles.find((v) => v._id === id);

        setFromLat(vehicle.fromLat);
        setFromLong(vehicle.fromLong);
        setToLat(vehicle.toLat);
        setToLong(vehicle.toLong);
        const cleanedPickupPoints = vehicle.pickupPoints.map(
          // eslint-disable-next-line no-unused-vars
          ({ _id, ...rest }) => rest
        );
        setPickupPoints(cleanedPickupPoints);
        setLoaded(true);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={{ height: "100%", width: "100%" }}
        zoom={15}
      >
        {loaded &&
          pickupPoints.map((pickupPoint, index) => (
            <Marker
              key={index}
              position={pickupPoint.location}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: new window.google.maps.Size(32, 32),
              }}
              draggable={false}
              animation={window.google.maps.Animation.DROP}
              label={{ text: `P${index + 1}`, color: "black" }}
            />
          ))}

        {loaded && lat && lng && (
          <Marker
            position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
            icon={{
              url: "https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png",
              scaledSize: new window.google.maps.Size(32, 32),
            }}
            onMouseOver={() => setShowInfoWindow(true)}
            onMouseOut={() => setShowInfoWindow(false)}
          >
            {showInfoWindow && (
              <InfoWindow onCloseClick={() => setShowInfoWindow(false)}>
                <Typography
                  variant="body1"
                  sx={{ right: 0, bottom: 0, textAlign: "middle" }}
                >
                  Your Pick-up Point
                </Typography>
              </InfoWindow>
            )}
          </Marker>
        )}

        {loaded && fromLat && fromLong && (
          <Marker
            position={{ lat: fromLat, lng: fromLong }}
            draggable={false}
            animation={window.google.maps.Animation.DROP}
            label={{ text: "SOURCE", color: "black" }}
          />
        )}

        {loaded && toLat && toLong && (
          <Marker
            position={{ lat: toLat, lng: toLong }}
            draggable={false}
            animation={window.google.maps.Animation.DROP}
            label={{ text: "DESTINATION", color: "black" }}
          />
        )}

        {loaded && directionsResult && (
          <DirectionsRenderer
            directions={directionsResult}
            options={{ suppressMarkers: true }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapView;
