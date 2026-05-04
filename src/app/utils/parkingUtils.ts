import { ParkingLocation, AvailabilityStatus } from "../types/parking";

export function getAvailabilityStatus(location: ParkingLocation): AvailabilityStatus {
  const percentage = (location.availableSpots / location.totalSpots) * 100;
  
  if (percentage > 50) return 'available';
  if (percentage > 20) return 'limited';
  return 'full';
}

export function getAvailabilityColor(status: AvailabilityStatus): string {
  switch (status) {
    case 'available':
      return '#22c55e'; // green
    case 'limited':
      return '#eab308'; // yellow
    case 'full':
      return '#ef4444'; // red
  }
}

export function getAvailabilityLabel(status: AvailabilityStatus): string {
  switch (status) {
    case 'available':
      return 'Available';
    case 'limited':
      return 'Limited';
    case 'full':
      return 'Full';
  }
}
