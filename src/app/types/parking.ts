export interface ParkingLocation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  totalSpots: number;
  availableSpots: number;
  pricePerHour: number;
  features: string[];
}

export type AvailabilityStatus = 'available' | 'limited' | 'full';
