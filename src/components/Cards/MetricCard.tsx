'use client';
export const MetricCard = ({ title, value, icon, loading }) => {
  return (
    <div className={`bg-white rounded-lg p-6 shadow-md`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <div className="p-2 bg-blue-100 rounded-full">{icon}</div>
      </div>
      {loading ? (
        <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
      ) : (
        <p className="text-3xl font-bold">{value.toLocaleString()}</p>
      )}
    </div>
  );
};