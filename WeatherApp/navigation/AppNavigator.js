import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import ReminderScreen from '../screens/ReminderScreen';
import SearchScreen from '../screens/SearchScreen';
import ForecastScreen from '../screens/ForecastScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { colors, fonts } from '../styles/themes';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStackNavigator = ({ setIsAuthenticated }) => (
  <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="SignIn">
      {props => <SignInScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
    </Stack.Screen>
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token); 
    };
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Drawer.Navigator
          initialRouteName="HomeScreen"
          drawerContent={(props) => (
            <CustomDrawerContent {...props} setIsAuthenticated={setIsAuthenticated} />
          )}
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: fonts.bold,
            },
          }}
        >
          <Drawer.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
          <Drawer.Screen
            name="Search"
            component={SearchScreen}
            options={{ title: 'Search Weather' }}
          />
          <Drawer.Screen
            name="Forecast"
            component={ForecastScreen}
            options={{ title: 'Weather Forecast' }}
          />
          <Drawer.Screen
            name="Reminder"
            component={ReminderScreen}
            options={{ title: 'Reminders' }}
          />
        </Drawer.Navigator>
      ) : (
        <AuthStackNavigator setIsAuthenticated={setIsAuthenticated} />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;