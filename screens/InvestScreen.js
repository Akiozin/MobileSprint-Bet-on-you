import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const investmentOptions = [
  'CDB Pós-fixado',
  'Fundo Imobiliário (FII)',
  'Tesouro Direto',
  'Ações Nacionais',
  'Ações Internacionais',
  'Criptomoedas',
];

export default function InvestScreen({ navigation }) {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState(investmentOptions[0]);

  const handleInvest = async () => {
    const valorNumerico = parseFloat(valor);
    if (!valor || isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido.');
      return;
    }

    try {
      const email = await AsyncStorage.getItem('currentUserEmail');
      if (email) {
        const userData = await AsyncStorage.getItem(email);
        const user = JSON.parse(userData);

        const novoInvestimento = {
          tipo,
          valor: valorNumerico.toFixed(2),
        };

        const investimentosAtuais = user.investimentos || [];
        const investimentosAtualizados = [...investimentosAtuais, novoInvestimento];

        const usuarioAtualizado = { ...user, investimentos: investimentosAtualizados };
        await AsyncStorage.setItem(email, JSON.stringify(usuarioAtualizado));

        Alert.alert('Sucesso!', 'Seu investimento foi registrado.');
        navigation.goBack();
      }
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar o investimento.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Realizar Investimento</Text>
        <Text style={styles.subtitle}>Escolha o tipo e o valor que deseja investir.</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Tipo de Investimento</Text>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={tipo}
            onValueChange={(itemValue) => setTipo(itemValue)}
            dropdownIconColor="#FFD700"
            style={{ color: '#FFF' }}>
            {investmentOptions.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 50.00"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          onChangeText={setValor}
          value={valor}
        />

        <TouchableOpacity style={styles.button} onPress={handleInvest}>
          <Text style={styles.buttonText}>Investir Agora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1F1F1F' },
  header: { padding: 20 },
  title: { color: '#FFFFFF', fontSize: 28, fontFamily: 'Montserrat-Bold' },
  subtitle: { color: '#ccc', fontSize: 16, marginTop: 8, fontFamily: 'Montserrat-Regular' },
  form: { padding: 20 },
  label: { color: '#FFFFFF', marginBottom: 8, fontSize: 16, fontFamily: 'Montserrat-Regular' },
  input: { backgroundColor: '#121212', color: '#FFFFFF', padding: 15, borderRadius: 8, marginBottom: 20, fontSize: 16, fontFamily: 'Montserrat-Regular' },
  pickerBox: { backgroundColor: '#121212', borderRadius: 8, marginBottom: 20 },
  button: { backgroundColor: '#FFD700', padding: 15, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#121212', textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 16 },
});