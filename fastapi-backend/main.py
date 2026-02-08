from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import requests
import numpy as np
from datetime import date, timedelta
import joblib

app = FastAPI(title="Weather Temperature Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Load Model
# -----------------------------
model_data = joblib.load('rf_weather_model.pkl')
model = model_data["model"]

# -----------------------------
# Pydantic Models
# -----------------------------
class PredictionRequest(BaseModel):
    latitude: float
    longitude: float
    locationName: Optional[str] = None

class WeatherData(BaseModel):
    date: str
    temperature: float # Min Temp in Celsius

class PredictionResponse(BaseModel):
    success: bool
    location: dict
    historicalData: List[WeatherData]
    prediction: dict
    error: Optional[str] = None

# -----------------------------
# Helper Functions
# -----------------------------
def fetch_weather_and_features(lat: float, lon: float):
    # API defaults to Celsius and mm
    url = (
        "https://api.open-meteo.com/v1/forecast?"
        f"latitude={lat}&longitude={lon}"
        "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum"
        "&hourly=snow_depth"
        "&past_days=14"
        "&forecast_days=0"
        "&timezone=auto"
    )

    r = requests.get(url, timeout=10)
    if r.status_code != 200:
        raise HTTPException(status_code=502, detail="Weather API failed")

    data = r.json()
    daily = data.get("daily", {})
    hourly = data.get("hourly", {})

    all_features = []
    display_history = []

    for i in range(14):
        # 1. Raw values for Model (Metric: °C, mm)
        tmin_c = daily["temperature_2m_min"][i]
        tmax_c = daily["temperature_2m_max"][i]
        precip_mm = daily["precipitation_sum"][i]
        snow_mm = daily["snowfall_sum"][i]
        
        # Calculate avg snow depth for the day (hourly is in cm)
        day_start, day_end = i * 24, (i + 1) * 24
        s_depth_avg = sum(hourly["snow_depth"][day_start:day_end]) / 24
        
        month = date.fromisoformat(daily["time"][i]).month

        # Feature Order: min, max, precip, snow, depth, month
        all_features.extend([tmin_c, tmax_c, precip_mm, snow_mm, s_depth_avg, month])

        # 2. Display values for Frontend
        display_history.append(
            WeatherData(date=daily["time"][i], temperature=round(tmin_c, 1))
        )

    return all_features, display_history

# -----------------------------
# API Endpoint
# -----------------------------
@app.post("/predict", response_model=PredictionResponse)
def predict_temperature(req: PredictionRequest):
    if not (-90 <= req.latitude <= 90 and -180 <= req.longitude <= 180):
        raise HTTPException(status_code=400, detail="Invalid coordinates")

    feature_vector, historical_display = fetch_weather_and_features(req.latitude, req.longitude)

    # Model Prediction (Result is in Celsius)
    input_data = np.array([feature_vector]) 
    prediction_c = model.predict(input_data)[0]

    # Confidence calculation based on Celsius variance
    recent_temps = np.array([d.temperature for d in historical_display[-7:]])
    # A standard deviation of 10 in C is very high, so we use 15 for scaling
    confidence = max(0.7, min(0.95, 1 - (recent_temps.std() / 15)))

    return {
        "success": True,
        "location": {
            "name": req.locationName or f"{req.latitude}, {req.longitude}",
            "latitude": req.latitude,
            "longitude": req.longitude,
        },
        "historicalData": historical_display,
        "prediction": {
            "date": (date.today() + timedelta(days=1)).isoformat(),
            "temperature": round(float(prediction_c), 1), # Pure Celsius
            "confidence": round(confidence, 2),
        }
    }