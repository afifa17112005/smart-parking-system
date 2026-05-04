import { X, MapPin, DollarSign, Car, Clock, CheckCircle } from 'lucide-react';
import { ParkingLocation } from '../types/parking';
import { getAvailabilityStatus, getAvailabilityLabel, getAvailabilityColor } from '../utils/parkingUtils';

interface ParkingDetailsProps {
  location: ParkingLocation | null;
  onClose: () => void;
  userLocation: [number, number] | null;
  onGetDirections: () => void;
}

export function ParkingDetails({ location, onClose, userLocation, onGetDirections }: ParkingDetailsProps) {
  if (!location) return null;

  const status = getAvailabilityStatus(location);
  const statusLabel = getAvailabilityLabel(status);
  const statusColor = getAvailabilityColor(status);
  const availabilityPercentage = Math.round((location.availableSpots / location.totalSpots) * 100);

  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl w-96 max-h-[calc(100vh-2rem)] overflow-auto z-[1000]">
      <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
        <h2 className="font-semibold text-lg">{location.name}</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Status Badge */}
        <div className="flex items-center gap-3">
          <div
            className="px-4 py-2 rounded-full text-white font-semibold"
            style={{ backgroundColor: statusColor }}
          >
            {statusLabel}
          </div>
          <span className="text-2xl font-bold">
            {location.availableSpots} <span className="text-base text-gray-500">spots</span>
          </span>
        </div>

        {/* Availability Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Availability</span>
            <span className="font-semibold">{availabilityPercentage}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${availabilityPercentage}%`,
                backgroundColor: statusColor,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{location.availableSpots} available</span>
            <span>{location.totalSpots} total</span>
          </div>
        </div>

        {/* Location Info */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Address</p>
              <p className="text-sm text-gray-600">{location.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Price</p>
              <p className="text-sm text-gray-600">₹{location.pricePerHour}/hour</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Car className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Capacity</p>
              <p className="text-sm text-gray-600">{location.totalSpots} parking spots</p>
            </div>
          </div>
        </div>

        {/* Features */}
        {location.features.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Features & Amenities</p>
            <div className="flex flex-wrap gap-2">
              {location.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={onGetDirections}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
        >
          {userLocation ? 'Get Directions' : 'Enable Location for Directions'}
        </button>
      </div>
    </div>
  );
}