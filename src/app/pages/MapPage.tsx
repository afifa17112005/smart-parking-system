import { useState, useCallback, useEffect } from 'react';
import { ParkingMap } from '../components/ParkingMap';
import { ParkingDetails } from '../components/ParkingDetails';
import { Header } from '../components/Header';
import { Legend } from '../components/Legend';
import { LocationButton } from '../components/LocationButton';
import { ParkingList } from '../components/ParkingList';
import { parkingLocations } from '../data/parkingData';
import { ParkingLocation } from '../types/parking';
import type L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapPage() {
    const [selectedLocation, setSelectedLocation] = useState<ParkingLocation | null>(null);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [map, setMap] = useState<L.Map | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredLocations = parkingLocations.filter((location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleMapReady = useCallback((mapInstance: L.Map) => {
        setMap(mapInstance);
    }, []);

    const handleGetLocation = useCallback(() => {
        setLocationError(null);

        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords: [number, number] = [
                    position.coords.latitude,
                    position.coords.longitude,
                ];
                setUserLocation(coords);
                if (map) {
                    map.setView(coords, 13);
                }
                setLocationError(null);
            },
            (error) => {
                console.error('Geolocation error:', error);
                let errorMessage = 'Unable to get your location. ';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += 'Please enable location permissions in your browser.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage += 'Location request timed out.';
                        break;
                    default:
                        errorMessage += 'An unknown error occurred.';
                }

                setLocationError(errorMessage);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }, [map]);

    // Get user location on mount
    useEffect(() => {
        handleGetLocation();
    }, [handleGetLocation]);

    return (
        <div className="size-full relative">
            <Header onSearch={setSearchQuery} />

            <div className="absolute inset-0 top-[88px]">
                <ParkingMap
                    locations={filteredLocations}
                    onLocationSelect={setSelectedLocation}
                    onMapReady={handleMapReady}
                    userLocation={userLocation}
                    selectedLocation={selectedLocation}
                    onRequestLocation={handleGetLocation}
                />
            </div>

            <div className="absolute left-4 top-24 z-[400] hidden md:block">
                <ParkingList
                    locations={filteredLocations}
                    onSelect={(location) => {
                        setSelectedLocation(location);
                        if (map) {
                            map.setView([location.latitude, location.longitude], 16);
                        }
                    }}
                    selectedId={selectedLocation?.id}
                />
            </div>

            <Legend />

            <LocationButton onClick={handleGetLocation} />

            {/* Location Error Banner */}
            {
                locationError && (
                    <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg p-4 max-w-md z-10">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-yellow-800">{locationError}</p>
                            </div>
                            <button
                                onClick={() => setLocationError(null)}
                                className="flex-shrink-0 text-yellow-600 hover:text-yellow-800"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )
            }

            <ParkingDetails
                location={selectedLocation}
                onClose={() => setSelectedLocation(null)}
                userLocation={userLocation}
                onGetDirections={handleGetLocation}
            />
        </div >
    );
}
