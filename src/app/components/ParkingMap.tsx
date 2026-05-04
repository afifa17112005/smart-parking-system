import { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { ParkingLocation } from '../types/parking';
import { getAvailabilityStatus, getAvailabilityColor } from '../utils/parkingUtils';
import 'leaflet/dist/leaflet.css';

interface ParkingMapProps {
  locations: ParkingLocation[];
  onLocationSelect: (location: ParkingLocation) => void;
  onMapReady?: (map: L.Map) => void;
  userLocation: [number, number] | null;
  selectedLocation?: ParkingLocation | null;
  onRequestLocation: () => void;
}

export function ParkingMap({ locations, onLocationSelect, onMapReady, userLocation, selectedLocation, onRequestLocation }: ParkingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const userCircleRef = useRef<L.Circle | null>(null);
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create map instance
    const map = L.map(mapRef.current).setView([13.0827, 80.2707], 12);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapInstanceRef.current = map;

    if (onMapReady) {
      onMapReady(map);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onMapReady]);

  const [isNavigating, setIsNavigating] = useState(false);
  const [routeInstructions, setRouteInstructions] = useState<L.Routing.IInstruction[]>([]);

  // Speech Synthesis Helper
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel current speech
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle Routing and Voice
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !userLocation || !selectedLocation) {
      if (routingControlRef.current && map) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
      setIsNavigating(false);
      setRouteInstructions([]);
      return;
    }

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    const control = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(selectedLocation.latitude, selectedLocation.longitude)
      ],
      routeWhileDragging: false,
      showAlternatives: false,
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [{ color: '#3b82f6', weight: 6, opacity: 0.7 }],
        extendToWaypoints: false,
        missingRouteTolerance: 0
      }
    });

    control.on('routesfound', (e) => {
      const routes = e.routes;
      if (routes && routes.length > 0) {
        setRouteInstructions(routes[0].instructions);
      }
    });

    control.addTo(map);
    routingControlRef.current = control;

  }, [userLocation, selectedLocation]);

  // Effect to simulate reading instructions when navigation starts
  useEffect(() => {
    if (isNavigating && routeInstructions.length > 0) {
      const firstStep = routeInstructions[0];
      const distance = firstStep.distance < 1000
        ? `${Math.round(firstStep.distance)} meters`
        : `${(firstStep.distance / 1000).toFixed(1)} kilometers`;

      speak(`Starting navigation to ${selectedLocation?.name}. ${firstStep.text} for ${distance}.`);
    } else if (!isNavigating) {
      window.speechSynthesis.cancel();
    }
  }, [isNavigating, routeInstructions, selectedLocation]);

  // Update user location marker
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation) return;

    const map = mapInstanceRef.current;

    // Remove existing user marker and circle
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }
    if (userCircleRef.current) {
      userCircleRef.current.remove();
    }

    // Add user location marker
    const userIcon = L.divIcon({
      className: 'user-location-marker',
      html: `
        <div style="position: relative;">
          <div style="
            background-color: #3b82f6;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
            position: relative;
            z-index: 1000;
          "></div>
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(59, 130, 246, 0.3);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            animation: pulse 2s infinite;
          "></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const marker = L.marker(userLocation, {
      icon: userIcon,
      zIndexOffset: 1000
    })
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center; font-weight: 600; padding: 4px;">
          📍 Your Location
        </div>
      `);

    // Add circle around user location
    const circle = L.circle(userLocation, {
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.1,
      radius: 500,
      weight: 2,
    }).addTo(map);

    userMarkerRef.current = marker;
    userCircleRef.current = circle;

    // Center map on user location ONLY if not routing
    if (!selectedLocation) {
      map.setView(userLocation, 13);
    }
  }, [userLocation, selectedLocation]);

  // Add parking location markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    locations.forEach((location) => {
      const status = getAvailabilityStatus(location);
      const color = getAvailabilityColor(status);

      const icon = L.divIcon({
        className: 'custom-parking-marker',
        html: `
          <div style="
            background-color: ${color};
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
            cursor: pointer;
          ">
            ${location.availableSpots}
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([location.latitude, location.longitude], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="padding: 8px; min-width: 200px;">
            <h3 style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">${location.name}</h3>
            <p style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">${location.address}</p>
            <div style="margin-bottom: 8px;">
              <p style="font-size: 14px;">
                <strong>${location.availableSpots}</strong> of <strong>${location.totalSpots}</strong> spots available
              </p>
              <p style="font-size: 14px; color: #6b7280;">
                ₹${location.pricePerHour}/hour
              </p>
            </div>
            <button 
              id="view-details-${location.id}"
              style="
                width: 100%;
                background-color: #2563eb;
                color: white;
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                border: none;
                cursor: pointer;
                margin-top: 12px;
              "
              onmouseover="this.style.backgroundColor='#1d4ed8'"
              onmouseout="this.style.backgroundColor='#2563eb'"
            >
              View Directions
            </button>
          </div>
        `);

      marker.on('click', () => {
        onLocationSelect(location);
      });

      marker.on('popupopen', () => {
        const button = document.getElementById(`view-details-${location.id}`);
        if (button) {
          button.addEventListener('click', () => {
            if (!userLocation) {
              onRequestLocation();
            }
            onLocationSelect(location);
          });
        }
      });

      markersRef.current.push(marker);
    });
  }, [locations, onLocationSelect]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      {selectedLocation && userLocation && (
        <button
          onClick={() => setIsNavigating(!isNavigating)}
          className={`absolute bottom-6 right-6 z-[1000] px-4 py-2 rounded-full font-semibold shadow-lg transition-colors flex items-center gap-2 ${isNavigating
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
        >
          {isNavigating ? (
            <>
              <span>Stop Navigation</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
              <span>Start Voice Navigation</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}