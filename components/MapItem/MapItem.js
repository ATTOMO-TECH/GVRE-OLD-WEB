import React from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

function MapItem({ lat, lng }) {

    const coordinates = { lat: lat, lng: lng }

    const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_KEY

    return (
        <>
            {
                lat && lng != undefined
                &&
                <LoadScript
                    googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                >
                    <GoogleMap
                        mapContainerStyle={{ height: '400px', width: '100%' }}
                        center={coordinates}
                        zoom={15}
                    >
                        <MarkerF position={coordinates} />
                    </GoogleMap>
                </LoadScript >
            }

        </>
    )
}

export default React.memo(MapItem)