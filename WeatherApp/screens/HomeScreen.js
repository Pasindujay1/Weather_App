import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getWeatherByLocation,
  getLocationName,
  getForecastByLocation,
} from "../services/weatherService";
import WeatherCard from "../components/WeatherCard";

// Import the icons
import locationIcon from '../assets/images/location.png';
import windIcon from '../assets/images/wind.png';
import humidityIcon from '../assets/images/humidity.png';
import tempIcon from '../assets/images/temp.png';
import visibilityIcon from '../assets/images/telescope.png';

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (err) {
        console.error('Failed to fetch username:', err);
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      try {
        const weather = await getWeatherByLocation(location.coords.latitude, location.coords.longitude);
        const forecast = await getForecastByLocation(location.coords.latitude, location.coords.longitude);
        setWeatherData(weather);
        setForecastData(forecast);
      } catch (err) {
        setError('Unable to fetch weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const today = new Date().toDateString();

  const filteredTodayForecast = forecastData?.list.filter(item => {
    const itemDate = new Date(item.dt * 1000).toDateString();
    return itemDate === today;
  });

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <Text style={styles.welcome}>Welcome, {username}</Text>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {weatherData && (
            <LinearGradient colors={['#6dd5ed', '#2193b0']} style={styles.card}>
              <View style={styles.cardHeader}>
                <Image source={locationIcon} style={styles.locationIcon} />
                <Text style={styles.locationName}>{weatherData.name}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.current}>
                <Image
                  style={styles.largeIcon}
                  source={{
                    uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`,
                  }}
                />
              </View>
              <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
              <Text style={styles.description}>
                {weatherData.weather[0].description}
              </Text>
              <View style={styles.divider} />
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Image source={tempIcon} style={styles.detailIcon} />
                  <Text style={styles.detail}>Feels Like: {weatherData.main.feels_like}°C</Text>
                </View>
                <View style={styles.detailRow}>
                  <Image source={humidityIcon} style={styles.detailIcon} />
                  <Text style={styles.detail}>Humidity: {weatherData.main.humidity}%</Text>
                </View>
                <View style={styles.detailRow}>
                  <Image source={windIcon} style={styles.detailIcon} />
                  <Text style={styles.detail}>Wind Speed: {weatherData.wind.speed} m/s</Text>
                </View>
                <View style={styles.detailRow}>
                  <Image source={visibilityIcon} style={styles.detailIcon} />
                  <Text style={styles.detail}>Visibility: {weatherData.visibility / 1000} km</Text>
                </View>
              </View>
            </LinearGradient>
          )}
          {forecastData && (
            <View>
              <Text style={styles.subtitle}>Today's Forecast</Text>
              <FlatList
                horizontal
                data={filteredTodayForecast}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  const weather = item.weather[0];
                  var dt = new Date(item.dt * 1000);
                  return (
                    <View style={styles.hour}>
                      <Text style={styles.hourText}>
                        {dt.toLocaleTimeString().replace(/:\d+ /, ' ')}
                      </Text>
                      <Text style={styles.hourText}>
                        {Math.round(item.main.temp)}°C
                      </Text>
                      <Image
                        style={styles.smallIcon}
                        source={{
                          uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                        }}
                      />
                      <Text style={styles.hourText}>
                        {weather.description}
                      </Text>
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 16,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
  locationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  current: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeIcon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  temperature: {
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 10,
    fontFamily: 'OpenSans',
  },
  description: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  detail: {
    fontSize: 16,
    color: '#fff',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
    marginLeft: 7,
    marginTop: 40,
    color: '#fff',
  },
  separator: {
    width: 10,
  },
  hour: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  hourText: {
    fontWeight: 'bold',
    color: 'white',
  },
  smallIcon: {
    width: 50,
    height: 50,
  },
});

export default HomeScreen;