// import React from "react";
// import {
//   GoogleMap,
//   LoadScript,
//   MarkerF,
//   OverlayView,
//   OverlayViewF,
// } from "@react-google-maps/api";

// function MapItem({ lat, lng }) {
//   const coordinates = { lat: lat, lng: lng };
//   const errorMargin = 120;

//   const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_KEY;

//   const displacement = 0.0019;

//   const displacedCoordinates = {
//     lat: coordinates.lat + displacement,
//     lng: coordinates.lng + displacement,
//   };

//   const getPixelPositionOffset = (width, height) => ({
//     x: -(width / 2),
//     y: -(height / 2),
//   });

//   return (
//     <>
//       {lat && lng != undefined && (
//         <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
//           <GoogleMap
//             mapContainerStyle={{ height: "400px", width: "100%" }}
//             center={coordinates}
//             zoom={15}
//           >
//             <OverlayViewF
//               position={displacedCoordinates}
//               mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//               getPixelPositionOffset={getPixelPositionOffset}
//             >
//               <div
//                 style={{
//                   width: `${2 * errorMargin}px`,
//                   height: `${2 * errorMargin}px`,
//                   borderRadius: "50%",
//                   backgroundColor: "rgba(0, 0, 255, 0.2)",
//                   border: "1px solid blue",
//                   position: "absolute",
//                   transform: "translate(-50%, -50%)",
//                   pointerEvents: "none",
//                 }}
//               />
//             </OverlayViewF>
//             {/* <MarkerF position={displacedCoordinates} /> */}
//           </GoogleMap>
//         </LoadScript>
//       )}
//     </>
//   );
// }

// export default React.memo(MapItem);

import React from "react";
import {
  GoogleMap,
  LoadScript,
  OverlayViewF,
  OverlayView,
} from "@react-google-maps/api";

function MapItem({ lat, lng }) {
  const coordinates = { lat: lat, lng: lng };
  const errorMargin = 120; // Esto podría ajustarse según tu lógica para metros a coordenadas

  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_KEY;

  // Función para generar una posición aleatoria dentro del círculo, pero nunca en el centro
  const getRandomPositionWithinCircle = () => {
    const angle = Math.random() * Math.PI * 2; // Ángulo aleatorio
    const minRadius = errorMargin * 2; // Definir un mínimo para evitar el centro
    const radius = Math.random() * (errorMargin - minRadius) + minRadius; // Radio aleatorio, nunca en el centro
    const displacementLat = (radius * Math.cos(angle)) / 111320; // Convertir metros a grados aprox. para latitud
    const displacementLng =
      (radius * Math.sin(angle)) / (111320 * Math.cos((lat * Math.PI) / 180)); // Convertir metros a grados aprox. para longitud, ajustando por la latitud

    return {
      lat: coordinates.lat + displacementLat,
      lng: coordinates.lng + displacementLng,
    };
  };

  const displacedCoordinates = getRandomPositionWithinCircle();

  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  return (
    <>
      {lat && lng !== undefined && (
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
