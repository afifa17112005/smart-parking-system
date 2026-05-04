import { ParkingLocation } from "../types/parking";

export const parkingLocations: ParkingLocation[] = [
  {
    id: "1",
    name: "Phoenix Marketcity Parking",
    address: "Velachery Main Rd, Chennai",
    latitude: 12.9915,
    longitude: 80.2173,
    totalSpots: 500,
    availableSpots: 120,
    pricePerHour: 40,
    features: ["Covered", "EV Charging", "Valet", "Security"]
  },
  {
    id: "2",
    name: "Express Avenue Mall",
    address: "Mount Road, Royapettah, Chennai",
    latitude: 13.0587,
    longitude: 80.2641,
    totalSpots: 450,
    availableSpots: 45,
    pricePerHour: 50,
    features: ["Covered", "Car Wash", "Family Spaces"]
  },
  {
    id: "3",
    name: "Marina Beach Parking",
    address: "Marina Beach Service Rd, Chennai",
    latitude: 13.0500,
    longitude: 80.2824,
    totalSpots: 200,
    availableSpots: 15,
    pricePerHour: 20,
    features: ["Outdoor", "24/7 Access"]
  },
  {
    id: "4",
    name: "Central Railway Station",
    address: "Periyamet, Chennai",
    latitude: 13.0827,
    longitude: 80.2707,
    totalSpots: 300,
    availableSpots: 89,
    pricePerHour: 30,
    features: ["Covered", "24/7 Access", "Security"]
  },
  {
    id: "5",
    name: "T. Nagar Smart Parking",
    address: "Thyagaraya Road, T. Nagar, Chennai",
    latitude: 13.0418,
    longitude: 80.2341,
    totalSpots: 100,
    availableSpots: 22,
    pricePerHour: 60,
    features: ["Covered", "Automated", "CCTV"]
  },
  {
    id: "6",
    name: "Coimbatore Gandhipuram Bus Stand",
    address: "Gandhipuram, Coimbatore",
    latitude: 11.0168,
    longitude: 76.9558,
    totalSpots: 150,
    availableSpots: 78,
    pricePerHour: 25,
    features: ["Outdoor", "24/7 Access"]
  },
  {
    id: "7",
    name: "Madurai Meenakshi Amman Parking",
    address: "Madurai Main, Madurai",
    latitude: 9.9195,
    longitude: 78.1193,
    totalSpots: 200,
    availableSpots: 45,
    pricePerHour: 30,
    features: ["Outdoor", "Security"]
  }
];