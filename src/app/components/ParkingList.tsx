import { ParkingLocation } from '../types/parking';
import { MapPin, DollarSign, Car } from 'lucide-react';
import { getAvailabilityStatus, getAvailabilityColor, getAvailabilityLabel } from '../utils/parkingUtils';

interface ParkingListProps {
  locations: ParkingLocation[];
  onSelect: (location: ParkingLocation) => void;
  selectedId?: string;
}

export function ParkingList({ locations, onSelect, selectedId }: ParkingListProps) {
  if (locations.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 bg-white rounded-lg shadow-md mx-4 mt-4">
        <p>No parking locations found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden flex flex-col max-h-[calc(100vh-8rem)] w-full md:w-80 pointer-events-auto">
      <div className="p-4 border-b bg-white/50">
        <h2 className="font-bold text-gray-800">Nearby Parking ({locations.length})</h2>
      </div>
      <div className="overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {locations.map((location) => {
          const status = getAvailabilityStatus(location);
          const statusColor = getAvailabilityColor(status);
          const isSelected = selectedId === location.id;

          return (
            <button
              key={location.id}
              onClick={() => onSelect(location)}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{location.name}</h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full text-white whitespace-nowrap ml-2"
                  style={{ backgroundColor: statusColor }}
                >
                  {getAvailabilityLabel(status)}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center text-xs text-gray-600">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                  <span className="truncate">{location.address}</span>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                   <div className="flex items-center text-xs font-medium text-gray-700">
                    <DollarSign className="w-3.5 h-3.5 mr-1 text-green-600" />
                    ₹{location.pricePerHour}/hr
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Car className="w-3.5 h-3.5 mr-1" />
                    {location.availableSpots} spots
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
