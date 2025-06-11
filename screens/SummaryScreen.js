// screens/SummaryScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ProgressBar } from 'react-native-paper';

export default function SummaryScreen({ navigation }) {
  const valorPerdido = 800; // valor simulado
  const investimentoSimulado = valorPerdido * 1.05;
  const porcentagemRenda = 32; // exemplo de % da renda gasta
  const diasSemApostar = 17;
  const metaDias = 30;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resumo</Text>

      {/* Bloco de perda */}
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Perda em Apostas</Text>
        <Text style={styles.text}>
          Você já perdeu <Text style={styles.highlight}>R${valorPerdido.toFixed(2)}</Text> em apostas.
        </Text>
        <Text style={styles.text}>
          Se tivesse investido, teria <Text style={styles.highlight}>R${investimentoSimulado.toFixed(2)}</Text>.
        </Text>
        <Text style={styles.text}>
          Isso representa <Text style={styles.highlight}>{porcentagemRenda}%</Text> da sua renda mensal.
        </Text>
      </View>

      {/* Bloco de ajuda */}
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Precisa de Apoio?</Text>
        <Text style={styles.text}>
          Precisa de apoio para lidar com o vício em apostas?{'\n'}
          Toque abaixo e fale com nossa equipe especializada.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Ajuda", "Em breve, um especialista entrará em contato.")}>
          <Text style={styles.buttonText}>Ajuda</Text>
        </TouchableOpacity>
      </View>

      {/* Bloco de investimento */}
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Invista Agora</Text>
        <Text style={styles.text}>Transforme perdas em ganhos. Dê o primeiro passo.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Rendimento')}>
          <Text style={styles.buttonText}>Começar a Investir</Text>
        </TouchableOpacity>
      </View>

      {/* Bloco de dias sem apostar */}
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Dias sem Apostar</Text>
        <ProgressBar
          progress={diasSemApostar / metaDias}
          color="#FFD700"
          style={{ height: 10, borderRadius: 5, backgroundColor: '#333', marginVertical: 10 }}
        />
        <Text style={styles.text}>
          {diasSemApostar} de {metaDias} dias completos
        </Text>
        <Text style={[styles.text, { marginTop: 10 }]}>
          Ganhe até <Text style={styles.highlight}>R$15 de cashback</Text> em investimento após a meta concluída.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1F1F1F', padding: 16 },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  block: { backgroundColor: '#121212', padding: 20, borderRadius: 12, marginBottom: 20 },
  blockTitle: { color: '#FFD700', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  text: { color: '#FFFFFF', marginBottom: 5, fontSize: 16, lineHeight: 22 },
  highlight: { color: '#FFD700', fontWeight: 'bold' },
  button: { backgroundColor: '#FFD700', padding: 12, borderRadius: 8, marginTop: 10 },
  buttonText: { textAlign: 'center', color: '#121212', fontWeight: 'bold', fontSize: 15 },
});