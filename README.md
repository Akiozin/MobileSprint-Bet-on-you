# Sprint Mobile development

![Logo](./assets/logo-variant2.png)

## 🎯 Sobre o Projeto

**Bet on you** é um aplicativo mobile desenvolvido em React Native com o objetivo de auxiliar usuários no controle de gastos com apostas. O app oferece ferramentas para que o usuário entenda seu perfil de apostador, visualize o impacto financeiro de suas ações e seja incentivado a direcionar seus recursos para investimentos seguros.

A ideia central é transformar um ciclo de perdas em uma jornada de crescimento financeiro e autoconsciência.

---

## ✨ Funcionalidades Principais

-   **Autenticação de Usuário:** Sistema completo de Cadastro e Login para proteger os dados do usuário.
-   **Validação de Senha:** Confirmação de senha no cadastro para evitar erros.
-   **Questionário de Perfil:** Um questionário detalhado para avaliar o nível de risco do perfil de apostador (Nível 1, 2 ou 3).
-   **Dashboard Personalizado:** Uma tela de **Resumo** que se adapta ao perfil do usuário, destacando os pontos mais importantes para ele.
-   **Contador Interativo:** Um contador de "dias sem apostar" que o usuário pode zerar em caso de recaída, promovendo honestidade e engajamento.
-   **Visualização de Dados:** Gráfico de pizza que compara, de forma visual, o valor investido pelo usuário contra um valor simulado de perdas em apostas.
-   **Registro de Investimentos:** Telas para adicionar e visualizar investimentos (CDB, Fundos Imobiliários, etc.), incentivando o usuário a poupar.
-   **Histórico de Transações:** Um registro de todas as saídas (apostas) e entradas (investimentos) para fácil consulta.
-   **Design e Fonte Personalizados:** Interface com tema escuro e uso da fonte "Montserrat" para uma experiência de usuário mais agradável e profissional.

---

## 🚀 Tecnologias Utilizadas

-   **React Native:** Framework principal para o desenvolvimento do aplicativo.
-   **React Navigation:** Para gerenciamento de todas as rotas e navegação do app (Stack e Top Tabs).
-   **AsyncStorage:** Para armazenamento local e persistente dos dados do usuário (cadastros, respostas, investimentos, etc.).
-   **JavaScript**
-   **Hermes Engine**

---

## 📦 Pacotes e Dependências

Para rodar este projeto, você precisará instalar as seguintes dependências:

```bash
# Navegação
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/material-top-tabs react-native-screens react-native-safe-area-context react-native-tab-view

# Componentes e Utilitários
npm install @react-native-async-storage/async-storage
npm install @react-native-picker/picker
npm install react-native-paper
npm install react-native-vector-icons
npm install react-native-chart-kit
npm install react-native-svg
```

---

## ⚙️ Instalação e Configuração

Siga os passos abaixo para configurar o ambiente de desenvolvimento e rodar o projeto.

**1. Clone o repositório:**
```bash
git clone https://github.com/Akiozin/MobileSprint.git
cd SemBet
```

**2. Instale todas as dependências:**
```bash
npm install
```

**3. Configure os Ícones Vetoriais (Android):**
   - Abra o arquivo `android/app/build.gradle`.
   - Adicione a seguinte linha no final do arquivo:
     ```gradle
     apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
     ```

**4. Rode o aplicativo:**
   - Certifique-se de que um emulador está aberto ou um dispositivo físico está conectado.
   - Rode um dos comandos abaixo:

   ```bash
   # Para Android
   npx react-native run-android

   # Para iOS
   npx react-native run-ios
   ```
