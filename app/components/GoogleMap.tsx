'use client';

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useCallback, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 37.4419,
  lng: -122.1430 // Palo Alto, CA
};

export default function GoogleMapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
      <p className="text-nordic/40 animate-pulse">Loading Map...</p>
    </div>
  );
}
