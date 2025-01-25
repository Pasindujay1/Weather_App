import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchWeatherByCity, fetchForecastByCity } from '../services/weatherService';
import ForecastCard from '../components/ForecastCard';

// Import the icons
import locationIcon from '../assets/images/location.png';
import windIcon from '../assets/images/wind.png';
import humidityIcon from '../assets/images/humidity.png';
import tempIcon from '../assets/images/temp.png';
import visibilityIcon from '../assets/images/telescope.png';

const SearchScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) return;

    setLoading(true);
    try {
      const weather = await fetchWeatherByCity(city);
      const forecast = await fetchForecastByCity(city);
      setWeatherData(weather);
      setForecastData(forecast);
      setError('');
    } catch (err) {
      setError('City not found. Please try again.');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
      setCity('');
    }
  };

  const today = new Date().toDateString();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toDateString();

  const filteredTodayForecast = forecastData?.list.filter(item => {
    const itemDate = new Date(item.dt * 1000).toDateString();
    return itemDate === today;
  });

  const filteredTomorrowForecast = forecastData?.list.filter(item => {
    const itemDate = new Date(item.dt * 1000).toDateString();
    return itemDate === tomorrowDate;
  });

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter city name"
              value={city}
              onChangeText={setCity}
            />
            <Button title="Search" onPress={handleSearch} />
          </View>
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
                renderItem={({ item }) => <ForecastCard data={item} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
              <Text style={styles.subtitle}>Tomorrow's Forecast</Text>
              <FlatList
                horizontal
                data={filteredTomorrowForecast}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <ForecastCard data={item} />}
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
  inputContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
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
});

export default SearchScreen;