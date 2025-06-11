// screens/EarningsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const investimentos = [
  { tipo: 'CDB Pós-fixado', valor: 1000, rendimento: '13.65% a.a.', status: 'Ativo' },
  { tipo: 'Fundo Imobiliário (MXRF11)', valor: 750, rendimento: '0.85% a.m.', status: 'Ativo' },
  { tipo: 'Tesouro Direto (Prefixado 2029)', valor: 500, rendimento: '11.80% a.a.', status: 'Ativo' },
  { tipo: 'Ações (PETR4)', valor: 1250, rendimento: '+4.2% (mês)', status: 'Ativo' },
];

export default function EarningsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Meus Investimentos</Text>
      {investimentos.map((item, index) => (
        <View key={index} style={styles.block}>
          <Text style={styles.label}>{item.tipo}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Valor Aplicado:</Text>
            <Text style={styles.highlight}>R$ {item.valor.toFixed(2)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Rendimento:</Text>
            <Text style={styles.highlight}>{item.rendimento}</Text>
          </View>
           <View style={styles.infoRow}>
            <Text style={styles.text}>Status:</Text>
            <Text style={styles.highlight}>{item.status}</Text>
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
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  label: { color: '#FFD700', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  text: { color: '#FFFFFF', fontSize: 16 },
  highlight: { color: '#FFD700', fontWeight: 'bold', fontSize: 16 },
});