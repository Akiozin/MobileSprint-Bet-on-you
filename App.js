import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import QuestionnaireScreen from './screens/QuestionnaireScreen';
import SummaryScreen from './screens/SummaryScreen';
import HistoryScreen from './screens/HistoryScreen';
import EarningsScreen from './screens/EarningsScreen';
import InvestScreen from './screens/InvestScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const CustomHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('./assets/logo-variant2.png')}
        style={styles.headerLogo}
      />
    </View>
  );
};

function MainTabs() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FFD700',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarStyle: { backgroundColor: '#121212' },
          tabBarIndicatorStyle: { backgroundColor: '#FFD700' },
          tabBarLabelStyle: {
            fontFamily: 'Montserrat-Bold',
            textTransform: 'capitalize',
            fontSize: 14,
          },
        }}>
        <Tab.Screen name="Resumo" component={SummaryScreen} />
        <Tab.Screen name="Histórico" component={HistoryScreen} />
        <Tab.Screen name="Rendimento" component={EarningsScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#1F1F1F' }
            }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={SignupScreen} />
          <Stack.Screen name="Questionario" component={QuestionnaireScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Investir" component={InvestScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1F1F1F'
    },
    headerContainer: {
      backgroundColor: '#1F1F1F',
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerLogo: {
      width: 80,
      height: 40,
      resizeMode: 'contain',
    },
});