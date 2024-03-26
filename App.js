import React from 'react';
import { View, Text, TouchableOpacity, Image, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroScreen from './CadastroScreen';
import SimulacaoFinanceiraScreen from './SimulacaoFinanceiraScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home" 
          component={HomeScreen} 
          options={{
            title: 'Finance Active',
          }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={({ navigation }) => ({
            title: 'Cadastro',
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate('Home')}
                title="Voltar"
              />
            ),
          })}
        />
        <Stack.Screen 
          name="SimulacaoFinanceira" 
          component={SimulacaoFinanceiraScreen} 
          options={({ navigation }) => ({
            presentation: 'modal',
            title: 'Simulação Financeira',
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate('Cadastro')}
                title="Voltar"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const HomeScreen = ({ navigation }) => {
  const handleCadastro = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('./images/logo.png')} style={styles.logoImage}/>
      
      <TouchableOpacity onPress={handleCadastro} style={styles.button}>
      <Text style={styles.buttonText}>Calcule seu financiamento!</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    backgroundColor: 'white',
    flex: 1
  },
  logoImage: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
    marginTop: 120
  },
  button: {
    backgroundColor: 'white',
    marginTop: 35,
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#4298b5', 
    alignItems: 'center',
  },
  buttonText: {
    color: '#4298b5',
    fontSize: 16,
  }
});


export default App;
