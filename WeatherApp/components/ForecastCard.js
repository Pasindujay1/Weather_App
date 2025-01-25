import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ForecastCard = ({ data }) => {
  const weather = data.weather[0];
  const dt = new Date(data.dt * 1000);

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{dt.toLocaleDateString()}</Text>
      <Text style={styles.time}>{dt.toLocaleTimeString().replace(/:\d+ /, ' ')}</Text>
      <Image
        style={styles.icon}
        source={{
          uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
        }}
      />
      <Text style={styles.temp}>{Math.round(data.main.temp)}°C</Text>
      <Text style={styles.description}>{weather.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  icon: {
    width: 80,
    height: 80,
    marginVertical: 10,
  },
  temp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default ForecastCard;