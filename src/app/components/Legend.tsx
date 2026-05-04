export function Legend() {
  return (
    <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-10">
      <h3 className="font-semibold text-sm mb-3">Availability Status</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-green-500" />
          <span className="text-sm">Available (&gt;50%)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-yellow-500" />
          <span className="text-sm">Limited (20-50%)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <span className="text-sm">Full (&lt;20%)</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t text-xs text-gray-500">
        Number shows available spots
      </div>
    </div>
  );
}
