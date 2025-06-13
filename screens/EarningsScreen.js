// screens/EarningsScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function EarningsScreen({ navigation }) {
  const [investimentos, setInvestimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadInvestments = useCallback(async () => {
    setLoading(true);
    try {
      const email = await AsyncStorage.getItem('currentUserEmail');
      if (email) {
        const userData = await AsyncStorage.getItem(email);
        if (userData) {
          const user = JSON.parse(userData);
          setInvestimentos(user.investimentos || []);
        }
      }
    } catch (e) {
      console.error("Failed to load investments.", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadInvestments();
    }, [loadInvestments])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadInvestments();
  };

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFD700"/>}
      >
        <Text style={styles.title}>Meus Investimentos</Text>

        {investimentos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Você ainda não possui investimentos.</Text>
            <Text style={styles.emptySubText}>Clique no botão abaixo para começar.</Text>
          </View>
        ) : (
          investimentos.map((item, index) => (
            <View key={index} style={styles.block}>
              <Text style={styles.label}>{item.tipo}</Text>
              <View style={styles.infoRow}>
                <Text style={styles.text}>Valor Aplicado:</Text>
                <Text style={styles.highlight}>R$ {parseFloat(item.valor).toFixed(2)}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Investir')}>
        <Text style={styles.addButtonText}>Adicionar Investimento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1F1F1F' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F1F1F' },
  title: { color: '#FFFFFF', fontSize: 28, fontFamily: 'Montserrat-Bold', marginBottom: 20, paddingHorizontal: 16, paddingTop: 16 },
  block: { backgroundColor: '#121212', padding: 20, borderRadius: 12, marginBottom: 15, marginHorizontal: 16 },
  label: { color: '#FFD700', fontSize: 18, fontFamily: 'Montserrat-Bold', marginBottom: 15,  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  text: { color: '#FFFFFF', fontSize: 16, fontFamily: 'Montserrat-Regular' },
  highlight: { color: '#00FF99', fontFamily: 'Montserrat-Bold', fontSize: 16 },
  addButton: { backgroundColor: '#FFD700', padding: 15, borderRadius: 8, margin: 16 },
  addButtonText: { textAlign: 'center', color: '#121212', fontFamily: 'Montserrat-Bold', fontSize: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Montserrat-Bold' },
  emptySubText: { color: '#ccc', fontSize: 16, marginTop: 8, fontFamily: 'Montserrat-Regular' }
});