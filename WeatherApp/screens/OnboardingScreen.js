import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts } from '../styles/themes';

const OnboardingScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/images/storm.png')} style={styles.image} />
        <Text style={styles.title}>Welcome to Weather</Text>
        <Text style={styles.title}>App</Text>
        <Text style={styles.subtitle}>Your personal weather assistant</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
    fontFamily: fonts.bold,
  },
  subtitle: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 20,
    fontFamily: fonts.regular,
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: fonts.bold,
  },
});

export default OnboardingScreen;