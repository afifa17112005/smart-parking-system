import { Navigation } from 'lucide-react';

interface LocationButtonProps {
  onClick: () => void;
}

export function LocationButton({ onClick }: LocationButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-24 right-4 bg-white rounded-lg shadow-lg p-3 z-10 hover:bg-gray-50 transition-colors"
      title="Center on my location"
    >
      <Navigation className="w-5 h-5 text-blue-600" />
    </button>
  );
}
