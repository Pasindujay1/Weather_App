import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { getWeatherForecast, getWeatherForecastByLocation } from '../services/weatherService';
import ForecastCard from '../components/ForecastCard';

const ForecastScreen = () => {
  const [city, setCity] = useState('');
  const [citiesForecast, setCitiesForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialForecast = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const data = await getWeatherForecastByLocation(
          location.coords.latitude,
          location.coords.longitude
        );
        setCitiesForecast([{ city: data.city.name, forecast: data.list }]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialForecast();
  }, []);

  const handleSearch = async () => {
    if (!city) return;

    setLoading(true);
    try {
      const data = await getWeatherForecast(city);
      setCitiesForecast(prevState => [...prevState, { city: data.city.name, forecast: data.list }]);
      setError('');
    } catch (err) {
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
      setCity('');
    }
  };

  const renderForecast = (cityForecast) => {
    const groupedForecast = cityForecast.forecast.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    return Object.keys(groupedForecast).map((date) => (
      <View key={date} style={styles.dateContainer}>
        <Text style={styles.dateText}>{date}</Text>
        <FlatList
          horizontal
          data={groupedForecast[date]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ForecastCard data={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    ));
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter city name"
              placeholderTextColor="#aaa"
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
          {citiesForecast.map((cityForecast, index) => (
            <View key={index}>
              <Text style={styles.cityName}>{cityForecast.city}</Text>
              {renderForecast(cityForecast)}
            </View>
          ))}
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
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  separator: {
    width: 10,
  },
});

export default ForecastScreen;