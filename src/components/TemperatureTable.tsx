import { WeatherData, TemperatureUnit } from '../types';
import { formatTemperature, formatDate } from '../utils/converters';

interface TemperatureTableProps {
  data: WeatherData[];
  prediction?: { date: string; temperature: number };
  unit: TemperatureUnit;
}

export default function TemperatureTable({ data, prediction, unit }: TemperatureTableProps) {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Historical Data</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Min Temperature
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {prediction && (
              <tr className="bg-red-50 hover:bg-red-100 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-900">
                  {formatDate(prediction.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-900">
                  {formatTemperature(prediction.temperature, unit)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">
                  Predicted
                </td>
              </tr>
            )}
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(item.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatTemperature(item.temperature, unit)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Historical
                </td>
              </tr>
            )).reverse()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
