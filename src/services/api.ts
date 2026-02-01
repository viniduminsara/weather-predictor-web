import { PredictionResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export async function predictTemperature(
  latitude: number,
  longitude: number,
  locationName?: string
): Promise<PredictionResponse> {
  const apiUrl = `${API_URL}/predict`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      latitude,
      longitude,
      locationName,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch prediction');
  }

  return await response.json();
}
