import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../services/authService';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts } from '../styles/themes';
import { Ionicons } from '@expo/vector-icons';

const SignInScreen = ({ navigation, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      const data = await login(email, password); 
      console.log(data);
      const { token, username } = data;
      await Promise.all([
        AsyncStorage.setItem('token', token),
        AsyncStorage.setItem('username', username)
      ]);
      setIsAuthenticated(true); 
    } catch (err) {
      setError('Invalid credentials'); 
    }
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <Image source={require('../assets/images/winter.png')} style={styles.image} />
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color={colors.gray} />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 20,
    fontFamily: fonts.bold,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    fontFamily: fonts.regular,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: colors.white,
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    fontFamily: fonts.regular,
  },
  toggleButton: {
    position: 'absolute',
    right: 10,
    padding: 10,
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: fonts.bold,
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  error: {
    color: colors.danger,
    marginBottom: 10,
    fontFamily: fonts.regular,
  },
});

export default SignInScreen;