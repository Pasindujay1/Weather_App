import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherCard = ({ data }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Current Weather</Text>
            <Text style={styles.detail}>Temperature: {data.main.temp}°C</Text>
            <Text style={styles.detail}>Humidity: {data.main.humidity}%</Text>
            <Text style={styles.detail}>Wind Speed: {data.wind.speed} m/s</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detail: {
        fontSize: 16,
    },
});

export default WeatherCard;