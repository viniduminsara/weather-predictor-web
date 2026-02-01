import { useState } from 'react';
import { Info, MapPin, Sun } from 'lucide-react';
import MapView from './components/MapView';
import LocationSearch from './components/LocationSearch';
import PredictionResults from './components/PredictionResults';
import TemperatureChart from './components/TemperatureChart';
import TemperatureTable from './components/TemperatureTable';
import InfoPage from './components/InfoPage';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import { predictTemperature } from './services/api';
import { PredictionResponse, TemperatureUnit } from './types';

type View = 'map' | 'info';

function App() {
  const [view, setView] = useState<View>('map');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [predictionData, setPredictionData] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>('F');

  const handleLocationSelect = async (lat: number, lng: number, name?: string) => {
    setSelectedLocation({ lat, lng });
    setError(null);
    setIsLoading(true);
    setPredictionData(null);

    try {
      const result = await predictTemperature(lat, lng, name);
      setPredictionData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prediction');
      setPredictionData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (selectedLocation) {
      handleLocationSelect(selectedLocation.lat, selectedLocation.lng);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Weather Predictor</h1>
                <p className="text-xs text-gray-500">ML-Powered Temperature Forecasting</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setView('map')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'map'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Predict</span>
              </button>
              <button
                onClick={() => setView('info')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'info'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Info className="w-4 h-4" />
                <span>Info</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {view === 'info' ? (
        <InfoPage />
      ) : (
        <div className="flex h-[calc(100vh-4rem)]">
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute top-4 left-4 right-4 z-[1000] flex justify-center">
              <LocationSearch onLocationSelect={handleLocationSelect} />
            </div>
            <MapView
              onLocationSelect={handleLocationSelect}
              selectedLocation={selectedLocation}
            />
          </div>

          <div className="hidden lg:block w-1/2 overflow-y-auto bg-gray-50 p-6">
            {!selectedLocation && !isLoading && !predictionData && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="bg-blue-100 rounded-full p-6 mb-6">
                  <MapPin className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Select a Location
                </h2>
                <p className="text-gray-600 max-w-md">
                  Click anywhere on the map or search for a location to get tomorrow's minimum temperature prediction.
                </p>
              </div>
            )}

            {isLoading && (
              <LoadingSpinner message="Fetching weather data and generating prediction..." />
            )}

            {error && <ErrorDisplay message={error} onRetry={handleRetry} />}

            {predictionData && (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
                    <button
                      onClick={() => setUnit('C')}
                      className={`px-3 py-1.5 rounded font-medium text-sm transition-colors ${
                        unit === 'C'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      °C
                    </button>
                    <button
                      onClick={() => setUnit('F')}
                      className={`px-3 py-1.5 rounded font-medium text-sm transition-colors ${
                        unit === 'F'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      °F
                    </button>
                  </div>
                </div>

                <PredictionResults data={predictionData} unit={unit} />

                <TemperatureChart
                  data={predictionData.historicalData}
                  prediction={predictionData.prediction}
                  unit={unit}
                />

                <TemperatureTable
                  data={predictionData.historicalData}
                  prediction={predictionData.prediction}
                  unit={unit}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
