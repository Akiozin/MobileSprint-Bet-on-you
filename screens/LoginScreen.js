import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem(email);
      if (userData) {
        const user = JSON.parse(userData);
        if (user.senha === senha) {
          await AsyncStorage.setItem('currentUserEmail', email);

          if (user.questionarioCompleto) {
            navigation.replace('Main');
          } else {
            navigation.replace('Questionario', { userEmail: email });
          }
        } else {
          Alert.alert('Erro', 'Senha incorreta!');
        }
      } else {
        Alert.alert('Erro', 'Usuário não encontrado!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/logo-variant2.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#ccc" onChangeText={setEmail} value={email} keyboardType="email-address" autoCapitalize="none"/>
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#ccc" secureTextEntry onChangeText={setSenha} value={senha}/>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#1F1F1F', justifyContent: 'center', padding: 20 },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: { color: '#FFFFFF', fontSize: 32, marginBottom: 25, textAlign: 'center', fontFamily: 'Montserrat-Bold' },
    input: { backgroundColor: '#121212', color: '#FFFFFF', padding: 15, borderRadius: 8, marginBottom: 15, fontSize: 16, fontFamily: 'Montserrat-Regular' },
    button: { backgroundColor: '#FFD700', padding: 15, borderRadius: 8, marginTop: 10 },
    buttonText: { color: '#121212', textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 16 },
    link: { color: '#FFD700', marginTop: 20, textAlign: 'center', fontSize: 16, fontFamily: 'Montserrat-Regular' },
});