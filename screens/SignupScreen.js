import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSignup = async () => {
    if (!email || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro de Validação', 'As senhas não coincidem. Por favor, tente novamente.');
      return;
    }

    try {
      const existingUser = await AsyncStorage.getItem(email);
      if (existingUser) {
        Alert.alert('Erro', 'Este e-mail já está em uso.');
        return;
      }

      const user = {
        email,
        senha,
        questionarioCompleto: false,
        investimentos: [],
        lastBetDate: new Date().toISOString(),
      };

      await AsyncStorage.setItem(email, JSON.stringify(user));
      await AsyncStorage.setItem('currentUserEmail', email);

      navigation.replace('Questionario', { userEmail: email });
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar criar a conta.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#ccc"
        secureTextEntry
        onChangeText={setSenha}
        value={senha}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#ccc"
        secureTextEntry
        onChangeText={setConfirmarSenha}
        value={confirmarSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Já tenho uma conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#1F1F1F', justifyContent: 'center', padding: 20 },
  title: { color: '#FFFFFF', fontSize: 32, marginBottom: 25, textAlign: 'center', fontFamily: 'Montserrat-Bold' },
  input: { backgroundColor: '#121212', color: '#FFFFFF', padding: 15, borderRadius: 8, marginBottom: 15, fontSize: 16, fontFamily: 'Montserrat-Regular' },
  button: { backgroundColor: '#FFD700', padding: 15, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#121212', textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 16 },
  link: { color: '#FFD700', marginTop: 20, textAlign: 'center', fontSize: 16, fontFamily: 'Montserrat-Regular' },
});