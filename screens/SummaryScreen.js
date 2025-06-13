import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ProgressBar } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const severityDetails = {
  1: { title: 'Nível 1: Baixo Risco', description: 'Seus hábitos atuais indicam um baixo risco relacionado a apostas. Continue no controle e foque em investimentos seguros.', color: '#00FF99' },
  2: { title: 'Nível 2: Risco Moderado', description: 'Atenção! Seus hábitos apresentam um risco moderado. É um bom momento para reavaliar a frequência e os valores das suas apostas.', color: '#FFD700' },
  3: { title: 'Nível 3: Alto Risco', description: 'Cuidado! Seu perfil indica um alto risco. É fortemente recomendado que você utilize o bloco de ajuda abaixo e considere diminuir ou parar suas atividades de aposta.', color: '#FF4D4D' },
};

export default function SummaryScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [daysWithoutBetting, setDaysWithoutBetting] = useState(0);
  const [totalInvestido, setTotalInvestido] = useState(0);
  const [loading, setLoading] = useState(true);


  const valorPerdidoSimulado = 800;

  const loadUserData = useCallback(async () => {
    setLoading(true);
    const email = await AsyncStorage.getItem('currentUserEmail');
    if (email) {
      const userData = await AsyncStorage.getItem(email);
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      let differenceInDays = 0;
      if (parsedUser.lastBetDate && !isNaN(new Date(parsedUser.lastBetDate))) {
        const today = new Date();
        const lastBet = new Date(parsedUser.lastBetDate);
        const differenceInTime = today.getTime() - lastBet.getTime();
        differenceInDays = Math.max(0, Math.floor(differenceInTime / (1000 * 3600 * 24)));
      }
      setDaysWithoutBetting(differenceInDays);

      const investments = Array.isArray(parsedUser.investimentos) ? parsedUser.investimentos : [];
      const total = investments.reduce((sum, item) => {
          const value = parseFloat(item.valor);
          return sum + (isNaN(value) ? 0 : value);
      }, 0);
      setTotalInvestido(total);
    }
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [loadUserData])
  );

  const handleRelapse = () => {
    Alert.alert(
      "Confirmar Recaída",
      "Isso irá reiniciar sua contagem de dias para zero. Tem certeza?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: async () => {
            const email = await AsyncStorage.getItem('currentUserEmail');
            const updatedUser = { ...user, lastBetDate: new Date().toISOString() };
            await AsyncStorage.setItem(email, JSON.stringify(updatedUser));
            loadUserData();
            Alert.alert("Força!", "Recomeçar faz parte do processo. Se precisar, procure o bloco de ajuda.");
        }}
      ]
    );
  };

  if (loading || !user) {
    return <ActivityIndicator size="large" color="#FFD700" style={{ flex: 1, backgroundColor: '#1F1F1F' }} />;
  }

  const currentSeverity = severityDetails[user.nivelGravidade];

  const chartData = [
    { name: 'Perdido', population: valorPerdidoSimulado, color: '#FF4D4D', legendFontColor: '#FFF', legendFontSize: 12 },
    { name: 'Investido', population: totalInvestido > 0 ? totalInvestido : 0.1, color: '#00FF99', legendFontColor: '#FFF', legendFontSize: 12 }
  ];

  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  const HelpBlock = () => (
    <View style={styles.block}>
        <Text style={styles.blockTitle}>Precisa de Apoio?</Text>
        <Text style={styles.text}>Toque abaixo e fale com nossa equipe especializada para lidar com o vício em apostas.</Text>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Ajuda", "Em breve, um especialista entrará em contato.")}>
          <Text style={styles.buttonText}>Pedir Ajuda</Text>
        </TouchableOpacity>
    </View>
  );

  const InvestBlock = () => (
     <View style={styles.block}>
        <Text style={styles.blockTitle}>Invista Agora</Text>
        <Text style={styles.text}>Transforme perdas em ganhos. Dê o primeiro passo.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Investir')}>
          <Text style={styles.buttonText}>Começar a Investir</Text>
        </TouchableOpacity>
      </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resumo</Text>
        {currentSeverity && (
          <View style={[styles.severityBlock, {borderColor: currentSeverity.color}]}>
            <Text style={[styles.severityTitle, {color: currentSeverity.color}]}>{currentSeverity.title}</Text>
            <Text style={styles.severityDescription}>{currentSeverity.description}</Text>
          </View>
        )}
      </View>

      {user.nivelGravidade === 3 && <HelpBlock />}

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Balanço Geral: Apostas vs. Investimentos</Text>
        <PieChart
          data={chartData}
          width={screenWidth - 40}
          height={200}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"0"}
          center={[10, 0]}
          absolute
        />
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Dias Sem Apostar</Text>
        <Text style={styles.streakDays}>{daysWithoutBetting}</Text>
        <ProgressBar progress={isNaN(daysWithoutBetting / 30) ? 0 : daysWithoutBetting / 30} color="#FFD700" style={{ height: 10, borderRadius: 5, backgroundColor: '#333', marginVertical: 10 }} />
        <Text style={styles.text}>Meta: 30 dias</Text>

        <Text style={styles.rewardIncentiveText}>
            Complete a meta e ganhe <Text style={styles.highlight}>R$ 10</Text> para investir!
        </Text>

        <TouchableOpacity style={styles.relapseButton} onPress={handleRelapse}>
            <Text style={styles.relapseButtonText}>Tive uma recaída</Text>
        </TouchableOpacity>
      </View>

      {user.nivelGravidade < 3 && <HelpBlock />}
      <InvestBlock />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1F1F1F' },
  header: { paddingHorizontal: 16, paddingTop: 16 },
  title: { color: '#FFFFFF', fontSize: 28, fontFamily: 'Montserrat-Bold', marginBottom: 15 },
  severityBlock: { backgroundColor: '#121212', borderRadius: 12, padding: 15, marginBottom: 20, borderWidth: 1 },
  severityTitle: { fontSize: 18, fontFamily: 'Montserrat-Bold', marginBottom: 5 },
  severityDescription: { color: '#ccc', fontSize: 14, lineHeight: 20, fontFamily: 'Montserrat-Regular' },
  block: { backgroundColor: '#121212', padding: 20, borderRadius: 12, marginBottom: 20, marginHorizontal: 16, alignItems: 'center' },
  blockTitle: { color: '#FFD700', fontSize: 18, fontFamily: 'Montserrat-Bold', marginBottom: 12 },
  text: { color: '#FFFFFF', marginBottom: 5, fontSize: 16, lineHeight: 22, textAlign: 'center', fontFamily: 'Montserrat-Regular' },
  highlight: { color: '#FFD700', fontFamily: 'Montserrat-Bold' },
  button: { backgroundColor: '#FFD700', padding: 12, borderRadius: 8, marginTop: 10, alignSelf: 'stretch' },
  buttonText: { textAlign: 'center', color: '#121212', fontFamily: 'Montserrat-Bold', fontSize: 15 },
  streakDays: { color: '#FFD700', fontSize: 48, fontFamily: 'Montserrat-Bold', textAlign: 'center', marginVertical: 10 },
  relapseButton: { backgroundColor: '#FF4D4D', padding: 10, borderRadius: 8, marginTop: 15, alignSelf: 'stretch' },
  relapseButtonText: { textAlign: 'center', color: '#FFFFFF', fontFamily: 'Montserrat-Bold' },
  rewardIncentiveText: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
});