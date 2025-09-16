import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LayoutDashboard, History, TrendingUp } from 'lucide-react-native';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import QuestionnaireScreen from './screens/QuestionnaireScreen';
import SummaryScreen from './screens/SummaryScreen';
import HistoryScreen from './screens/HistoryScreen';
import EarningsScreen from './screens/EarningsScreen';
import InvestScreen from './screens/InvestScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <CustomHeader />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFD700',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarStyle: {
            backgroundColor: '#121212',
            borderTopWidth: 0,
            elevation: 0,
            height: 80,
            paddingTop: 10,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let IconComponent;
            const iconSize = focused ? 30 : 26;

            if (route.name === 'Resumo') {
              IconComponent = LayoutDashboard;
            } else if (route.name === 'Histórico') {
              IconComponent = History;
            } else if (route.name === 'Rendimento') {
              IconComponent = TrendingUp;
            }

            return <IconComponent color={color} size={iconSize} />;
          },
        })}
      >
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