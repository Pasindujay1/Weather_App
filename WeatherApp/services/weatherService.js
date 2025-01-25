import axios from 'axios';
import { API_KEY, BASE_URL, GEO_URL } from '@env';

export const getWeatherByLocation = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric', 
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather by location:', error);
        throw error;
    }
};

export const getLocationName = async (lat, lon) => {
    try {
        const response = await axios.get(GEO_URL, {
            params: {
                lat,
                lon,
                limit: 1,
                appid: API_KEY,
            },
        });
        return response.data[0];
    } catch (error) {
        console.error('Error fetching location name:', error);
        throw error;
    }
};

export const getForecastByLocation = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching forecast by location:', error);
        throw error;
    }
};

export const fetchWeatherByCity = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchForecastByCity = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getWeatherForecast = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getWeatherForecastByLocation = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};