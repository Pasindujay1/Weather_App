import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, fonts } from '../styles/themes';

const CustomDrawerContent = (props) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      console.log("Username",AsyncStorage.getItem('username'));
      const storedUsername = await AsyncStorage.getItem('username');
      setUsername(storedUsername || 'Guest');
    };
    fetchUsername();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');
    props.setIsAuthenticated(false);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/user1.png')} style={styles.profileImage} />
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Thank you for using our app!</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    padding: 20,
    backgroundColor: '#4c669f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: fonts.bold,
  },
  drawerItems: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: fonts.bold,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    fontFamily: fonts.regular,
  },
});

export default CustomDrawerContent;