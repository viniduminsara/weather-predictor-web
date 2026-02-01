import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { WeatherData, TemperatureUnit } from '../types';
import { convertTemperature, formatDateShort } from '../utils/converters';

interface TemperatureChartProps {
  data: WeatherData[];
  prediction?: { date: string; temperature: number };
  unit: TemperatureUnit;
}

export default function TemperatureChart({ data, prediction, unit }: TemperatureChartProps) {
  const chartData = data.map(d => ({
    date: formatDateShort(d.date),
    temperature: Math.round(convertTemperature(d.temperature, unit) * 10) / 10,
    fullDate: d.date,
  }));

  if (prediction) {
    chartData.push({
      date: formatDateShort(prediction.date),
      temperature: Math.round(convertTemperature(prediction.temperature, unit) * 10) / 10,
      fullDate: prediction.date,
    });
  }

  const minTemp = Math.min(...chartData.map(d => d.temperature));
  const maxTemp = Math.max(...chartData.map(d => d.temperature));
  const padding = (maxTemp - minTemp) * 0.2 || 5;

  return (
    <div className="w-full h-80 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Temperature Trend</h3>
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            stroke="#9ca3af"
          />
          <YAxis
            domain={[minTemp - padding, maxTemp + padding]}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            stroke="#9ca3af"
            label={{ value: `Temperature (°${unit})`, angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value: number | undefined) =>
              value !== undefined ? [`${value.toFixed(1)}°${unit}`, 'Temperature'] : ['', '']
            }
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          {prediction && (
            <ReferenceLine
              x={formatDateShort(prediction.date)}
              stroke="#ef4444"
              strokeDasharray="5 5"
              label={{ value: 'Prediction', position: 'top', fill: '#ef4444', fontSize: 12 }}
            />
          )}
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Min Temperature"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
