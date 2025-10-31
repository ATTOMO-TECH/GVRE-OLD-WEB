// components/MapItemLeaflet.js

import React from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // <-- ¡MUY IMPORTANTE! Importa el CSS

function MapItemLeaflet({ lat, lng }) {
  const coordinates = { lat: lat, lng: lng };
  const errorMargin = 150; // 120 metros

  // --- LÓGICA DEL CÍRCULO CORREGIDA ---
  // Genera una posición aleatoria DENTRO del círculo, pero no en el centro.
  const getRandomPositionWithinCircle = () => {
    const angle = Math.random() * Math.PI * 2; // Ángulo aleatorio

    // --- LA CORRECCIÓN ---
    // Un radio mínimo (ej. 10m) para evitar el centro exacto.
    const minRadius = 10;
    // Un radio aleatorio entre el mínimo (10m) y el máximo (120m)
    const radius = Math.random() * (errorMargin - minRadius) + minRadius;
    // --- FIN DE LA CORRECCIÓN ---

    const displacementLat = (radius * Math.cos(angle)) / 111320;
    const displacementLng =
      (radius * Math.sin(angle)) / (111320 * Math.cos((lat * Math.PI) / 180));

    return {
      lat: coordinates.lat + displacementLat,
      lng: coordinates.lng + displacementLng,
    };
  };

  // Esta lógica sigue igual
  const displacedCoordinates = getRandomPositionWithinCircle();

  // Opciones de estilo para el <Circle> de Leaflet
  // (Equivalente a tu CSS en línea)
  const circleOptions = {
    fillColor: "#2b363d",
    color: "#2b363d",
    weight: 1,
    fillOpacity: 0.2,
  };

  // Leaflet usa un array [lat, lng] en lugar de un objeto {lat, lng}
  const centerPosition = [coordinates.lat, coordinates.lng];
  const displacedPosition = [
    displacedCoordinates.lat,
    displacedCoordinates.lng,
  ];

  // Si no hay lat o lng, no renderizamos nada
  if (!lat || lng === undefined) {
    return null;
  }

  return (
    <MapContainer
      center={centerPosition}
      zoom={17}
      style={{ height: "600px", width: "100%" }}
      scrollWheelZoom={false} // Opcional, pero mejora la experiencia de usuario
    >
      {/* Esta es la capa de "azulejos" (imágenes) del mapa de OpenStreetMap */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />

      {/* Este es el reemplazo de tu OverlayViewF.
        Dibuja un círculo geográfico real (con radio en metros) 
        centrado en la posición aleatoria.
      */}
      <Circle
        center={displacedPosition}
        pathOptions={circleOptions}
        radius={errorMargin} // El radio del círculo es de 120m
      />
    </MapContainer>
  );
}

// Ya no es necesario React.memo si lo cargamos dinámicamente (ver paso 2)
export default MapItemLeaflet;
