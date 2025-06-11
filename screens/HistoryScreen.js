// screens/HistoryScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const historico = [
  { tipo: 'aposta', valor: -120, data: '01/06/2025' },
  { tipo: 'investimento', valor: 200, data: '05/06/2025' },
  { tipo: 'aposta', valor: -80, data: '03/06/2025' },
  { tipo: 'investimento', valor: 150, data: '07/06/2025' },
  { tipo: 'aposta', valor: -250, data: '08/06/2025' },
];

export default function HistoryScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Histórico de Transações</Text>
      {historico.map((item, index) => (
        <View key={index} style={styles.block}>
          <Icon
            name={item.tipo === 'aposta' ? 'arrow-down-circle' : 'arrow-up-circle'}
            size={30}
            color={item.tipo === 'aposta' ? '#FF4D4D' : '#00FF99'}
            style={{ marginRight: 15 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>
              {item.tipo === 'aposta' ? 'Saída em Aposta' : 'Aplicação em Investimento'}
            </Text>
            <Text style={styles.text}>
              {item.data} —{' '}
              <Text style={{ color: item.tipo === 'aposta' ? '#FF4D4D' : '#00FF99', fontWeight: 'bold' }}>
                R$ {Math.abs(item.valor).toFixed(2)}
              </Text>
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1F1F1F', padding: 16 },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  block: {
    backgroundColor: '#121212',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: { color: '#FFD700', fontSize: 16, fontWeight: 'bold' },
  text: { color: '#FFFFFF', marginTop: 5, fontSize: 14 },
});