import React from "react";
import {
  GoogleMap,
  LoadScript,
  OverlayView,
  OverlayViewF,
} from "@react-google-maps/api";

function MapItem({ lat, lng, errorMargin }) {
  const coordinates = { lat: lat, lng: lng };

  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_KEY;

  const displacement = 0.002;

  const displacedCoordinates = {
    lat: coordinates.lat + displacement,
    lng: coordinates.lng + displacement,
  };

  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  return (
    <>
      {lat && lng != undefined && (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={coordinates}
            zoom={15}
          >
            <OverlayViewF
              position={displacedCoordinates}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={getPixelPositionOffset}
            >
              <div
                style={{
                  width: `${2 * errorMargin}px`,
                  height: `${2 * errorMargin}px`,
                  borderRadius: "50%",
                  backgroundColor: "rgba(0, 0, 255, 0.2)",
                  border: "1px solid blue",
                  position: "absolute",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                }}
              />
            </OverlayViewF>
          </GoogleMap>
        </LoadScript>
      )}
    </>
  );
}

export default React.memo(MapItem);
