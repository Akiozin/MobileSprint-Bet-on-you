// screens/QuestionnaireScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const perguntas = [
    { chave: 'idade', texto: 'Qual a sua idade?', opcoes: ['18 a 21', '21 a 35', '35 a 50', '50+'], },
    { chave: 'apostouAlgumaVez', texto: 'Você já apostou alguma vez?', opcoes: ['Sim', 'Não'], },
    { chave: 'frequencia', texto: 'Com qual frequência você aposta atualmente?', opcoes: ['1x no mês', '1x na semana', '3x ou mais na semana', 'diariamente'], },
    { chave: 'porcentagemRenda', texto: 'Quanto da sua renda você aposta por mês?', opcoes: ['menos de 5%', 'menos de 15%', 'menos de 50%', 'menos 75%', 'outro'], },
    { chave: 'dividas', texto: 'Você já contraiu dívidas relacionadas a apostas no último ano?', opcoes: ['Sim', 'Não'], },
    { chave: 'emprego', texto: 'Você possui atualmente qual tipo de emprego?', opcoes: ['CLT', 'PJ', 'Desempregado'], },
    { chave: 'sentimento', texto: 'Como você se sente após apostar?', opcoes: ['Bem', 'Mal', 'Indiferente'], },
    { chave: 'tentouParar', texto: 'Você já tentou parar ou reduzir o volume das apostas?', opcoes: ['Sim', 'Não'], },
    { chave: 'controle', texto: 'Você sente que tem controle sobre a sua vontade de apostar?', opcoes: ['Sim', 'Não'], },
    { chave: 'motivacao', texto: 'Qual a principal motivação para apostar?', opcoes: ['Renda extra', 'Diversão'], },
    { chave: 'fonteSegura', texto: 'Você acredita que a aposta é uma fonte segura de renda?', opcoes: ['Sim', 'Não'], },
];

const calcularGravidade = (respostas) => {
  let risco = 0;
  if (respostas.frequencia === 'diariamente') risco += 3;
  else if (respostas.frequencia === '3x ou mais na semana') risco += 2;
  else if (respostas.frequencia === '1x na semana') risco += 1;

  if (['menos de 50%', 'menos 75%', 'outro'].includes(respostas.porcentagemRenda)) risco += 2;
  if (respostas.dividas === 'Sim') risco += 3;
  if (respostas.tentouParar === 'Sim') risco += 1;
  if (respostas.controle === 'Não') risco += 2;
  if (respostas.fonteSegura === 'Sim') risco += 2;
  if (respostas.sentimento === 'Mal') risco += 1;

  if (risco >= 7) return 3; // Nível alto
  if (risco >= 4) return 2; // Nível médio
  return 1; // Nível baixo
};

export default function QuestionnaireScreen({ route, navigation }) {
  const [respostas, setRespostas] = useState({});
  const { userEmail } = route.params;

  const handleChange = (chave, valor) => {
    setRespostas({ ...respostas, [chave]: valor });
  };

  const handleSubmit = async () => {
    if (Object.keys(respostas).length < perguntas.length) {
      Alert.alert('Atenção', 'Por favor, responda todas as perguntas.');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem(userEmail);
      if (userData) {
        const user = JSON.parse(userData);
        const gravidade = calcularGravidade(respostas);

        const updatedUser = {
          ...user,
          respostasQuestionario: respostas,
          nivelGravidade: gravidade,
          questionarioCompleto: true,
        };

        await AsyncStorage.setItem(userEmail, JSON.stringify(updatedUser));
        navigation.replace('Main');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar suas respostas.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Questionário</Text>
      {perguntas.map(({ chave, texto, opcoes }) => (
        <View key={chave} style={styles.bloco}>
          <Text style={styles.label}>{texto}</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={respostas[chave]}
              onValueChange={(itemValue) => handleChange(chave, itemValue)}
              dropdownIconColor="#FFD700"
              style={{ color: '#FFF' }}>
              <Picker.Item label="Selecione..." value={null} />
              {opcoes.map((opcao) => (
                <Picker.Item key={opcao} label={opcao} value={opcao} />
              ))}
            </Picker>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
        <Text style={styles.botaoTexto}>Finalizar e ver resumo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1F1F1F', padding: 20 },
  titulo: { color: '#FFFFFF', fontSize: 28, marginBottom: 20, fontWeight: 'bold' },
  bloco: { marginBottom: 15 },
  label: { color: '#FFFFFF', marginBottom: 8, fontSize: 16 },
  pickerBox: { backgroundColor: '#121212', borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  botao: { backgroundColor: '#FFD700', padding: 15, borderRadius: 8, marginTop: 20, marginBottom: 40 },
  botaoTexto: { color: '#121212', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});