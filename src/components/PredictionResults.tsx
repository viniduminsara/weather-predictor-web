import { MapPin, Calendar, Thermometer, TrendingUp } from 'lucide-react';
import { PredictionResponse, TemperatureUnit } from '../types';
import { formatTemperature, formatDate } from '../utils/converters';

interface PredictionResultsProps {
  data: PredictionResponse;
  unit: TemperatureUnit;
}

export default function PredictionResults({ data, unit }: PredictionResultsProps) {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Weather Prediction</h2>
            <div className="flex items-center space-x-2 text-blue-100">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{data.location.name}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-blue-100 mb-1">Coordinates</div>
            <div className="text-sm font-mono">
              {data.location.latitude.toFixed(4)}°, {data.location.longitude.toFixed(4)}°
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Tomorrow: {formatDate(data.prediction.date)}</span>
          </div>
          <div className="text-5xl font-bold my-3">
            {formatTemperature(data.prediction.temperature, unit)}
          </div>
          <div className="text-sm text-blue-100">
            Predicted Minimum Temperature
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Confidence: {(data.prediction.confidence * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
