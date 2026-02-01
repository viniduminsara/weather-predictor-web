export interface WeatherData {
  date: string;
  temperature: number;
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Prediction {
  date: string;
  temperature: number;
  confidence: number;
}

export interface ModelInfo {
  type: string;
  inputDays: number;
  metric: string;
}

export interface PredictionResponse {
  success: boolean;
  location: Location;
  historicalData: WeatherData[];
  prediction: Prediction;
  modelInfo: ModelInfo;
  error?: string;
}

export type TemperatureUnit = 'C' | 'F';
