import { TemperatureUnit } from '../types';

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

export function convertTemperature(temp: number, unit: TemperatureUnit): number {
  return unit === 'F' ? celsiusToFahrenheit(temp) : temp;
}

export function formatTemperature(temp: number, unit: TemperatureUnit): string {
  const converted = convertTemperature(temp, unit);
  return `${converted.toFixed(1)}°${unit}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}
