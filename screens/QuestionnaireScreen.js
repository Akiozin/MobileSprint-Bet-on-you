import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const perguntas = [
    { chave: 'idade', texto: 'Qual a sua idade?', opcoes: ['18 a 21', '21 a 35', '35 a 50', '50+'], type: 'picker' },
    { chave: 'apostouAlgumaVez', texto: 'Você já apostou alguma vez?', opcoes: ['Sim', 'Não'], type: 'picker' },
    { chave: 'diasSemApostar', texto: 'Há quantos dias você está sem apostar? (Digite 0 se apostou hoje)', type: 'input' },
    { chave: 'frequencia', texto: 'Com qual frequência você aposta atualmente?', opcoes: ['1x no mês', '1x na semana', '3x ou mais na semana', 'diariamente'], type: 'picker' },
    { chave: 'porcentagemRenda', texto: 'Quanto da sua renda você aposta por mês?', opcoes: ['menos de 5%', 'menos de 15%', 'menos de 50%', 'menos 75%', 'outro'], type: 'picker' },
    { chave: 'dividas', texto: 'Você já contraiu dívidas relacionadas a apostas no último ano?', opcoes: ['Sim', 'Não'], type: 'picker' },
    { chave: 'emprego', texto: 'Você possui atualmente qual tipo de emprego?', opcoes: ['CLT', 'PJ', 'Desempregado'], type: 'picker' },
    { chave: 'sentimento', texto: 'Como você se sente após apostar?', opcoes: ['Bem', 'Mal', 'Indiferente'], type: 'picker' },
    { chave: 'tentouParar', texto: 'Você já tentou parar ou reduzir o volume das apostas?', opcoes: ['Sim', 'Não'], type: 'picker' },
    { chave: 'controle', texto: 'Você sente que tem controle sobre a sua vontade de apostar?', opcoes: ['Sim', 'Não'], type: 'picker' },
    { chave: 'motivacao', texto: 'Qual a principal motivação para apostar?', opcoes: ['Renda extra', 'Diversão'], type: 'picker' },
    { chave: 'fonteSegura', texto: 'Você acredita que a aposta é uma fonte segura de renda?', opcoes: ['Sim', 'Não'], type: 'picker' },
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

const getSeverityDetails = (level) => {
    switch (level) {
        case 1: return { title: 'Nível 1: Baixo Risco' };
        case 2: return { title: 'Nível 2: Risco Moderado' };
        case 3: return { title: 'Nível 3: Alto Risco' };
        default: return { title: 'Nível Indefinido' };
    }
};


export default function QuestionnaireScreen({ route, navigation }) {
  const [respostas, setRespostas] = useState({ diasSemApostar: '0' }); // Inicia com 0
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

        const diasSemApostarValor = parseInt(respostas.diasSemApostar, 10);
        if (isNaN(diasSemApostarValor) || diasSemApostarValor < 0) {
            Alert.alert('Erro', 'Por favor, insira um número válido para os dias sem apostar.');
            return;
        }

        const dataInicioContador = new Date();
        dataInicioContador.setDate(dataInicioContador.getDate() - diasSemApostarValor);

        const updatedUser = {
          ...user,
          respostasQuestionario: respostas,
          nivelGravidade: gravidade,
          questionarioCompleto: true,
          lastBetDate: dataInicioContador.toISOString(),
        };

        await AsyncStorage.setItem(userEmail, JSON.stringify(updatedUser));

        const severityInfo = getSeverityDetails(gravidade);
        Alert.alert(
            'Questionário Concluído',
            `Seu perfil foi avaliado como ${severityInfo.title}. Veja mais detalhes e recomendações na tela de Resumo.`,
            [{ text: 'OK', onPress: () => navigation.replace('Main') }]
        );
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar suas respostas.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Questionário</Text>
      {perguntas.map(({ chave, texto, opcoes, type }) => (
        <View key={chave} style={styles.bloco}>
          <Text style={styles.label}>{texto}</Text>
          {type === 'input' ? (
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={(valor) => handleChange(chave, valor)}
              value={respostas[chave]}
            />
          ) : (
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
          )}
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
  titulo: { color: '#FFFFFF', fontSize: 28, marginBottom: 20, fontFamily: 'Montserrat-Bold' },
  bloco: { marginBottom: 15 },
  label: { color: '#FFFFFF', marginBottom: 8, fontSize: 16, fontFamily: 'Montserrat-Regular' },
  pickerBox: { backgroundColor: '#121212', borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  input: {
    backgroundColor: '#121212',
    color: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  botao: { backgroundColor: '#FFD700', padding: 15, borderRadius: 8, marginTop: 20, marginBottom: 40 },
  botaoTexto: { color: '#121212', textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 16 },
});