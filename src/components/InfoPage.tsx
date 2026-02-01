import { Database, Cloud, GitBranch, BarChart3, Globe, Cpu } from 'lucide-react';

export default function InfoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4">Weather Prediction System</h1>
        <p className="text-blue-100 text-lg">
          An advanced machine learning application for predicting tomorrow's minimum temperature
          using deep learning models trained on Kaggle competition datasets.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center space-x-3 mb-6">
          <GitBranch className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Kaggle Competition Context</h2>
        </div>
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-700 leading-relaxed">
            This application is based on time-series weather prediction competitions commonly hosted on Kaggle.
            The goal is to predict future minimum temperatures using historical weather data. These competitions
            typically provide datasets with daily weather observations including temperature, humidity, pressure,
            and other meteorological variables.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Our implementation focuses on the core challenge: using the past 14 days of minimum temperature data
            to predict tomorrow's minimum temperature. This approach demonstrates how competition-trained models
            can be deployed in real-world applications.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Select a Location</h3>
              <p className="text-gray-600 text-sm">
                Use the interactive map to click on any location worldwide or search for a specific place.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Data Retrieval</h3>
              <p className="text-gray-600 text-sm">
                The system automatically fetches the past 14 days of minimum temperature data from Open-Meteo API.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Preprocessing</h3>
              <p className="text-gray-600 text-sm">
                Data is normalized using the same preprocessing pipeline as the training phase.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Prediction</h3>
              <p className="text-gray-600 text-sm">
                The LSTM model processes the sequence and generates tomorrow's minimum temperature prediction.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
              5
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Visualization</h3>
              <p className="text-gray-600 text-sm">
                Results are displayed with interactive charts, tables, and detailed metrics.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
        <p className="text-sm text-gray-600 text-center">
          This is a demonstration application showcasing how machine learning models trained on Kaggle
          competitions can be integrated into production web applications for real-world use cases.
        </p>
      </div>
    </div>
  );
}
