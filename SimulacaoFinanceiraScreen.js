import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SimulacaoFinanceiraModalScreen = ({ visible, onClose }) => {
  const [valorCompra, setValorCompra] = useState('');
  const [taxaJuros, setTaxaJuros] = useState('');
  const [numeroParcelas, setNumeroParcelas] = useState('');
  const [valorEntrada, setValorEntrada] = useState('');
  const [cenarioSelecionado, setCenarioSelecionado] = useState(null);
  const [resultado, setResultado] = useState(null);

  const calcularCenario = () => {
    const valorCompraNumber = parseFloat(valorCompra);
    const taxaJurosNumber = parseFloat(taxaJuros) / 100;
    const numeroParcelasNumber = parseInt(numeroParcelas);
    const valorEntradaNumber = parseFloat(valorEntrada);
    

    if (isNaN(valorCompraNumber) || isNaN(taxaJurosNumber) || isNaN(numeroParcelasNumber)) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    let totalAPagar = 0;
    let valorParcela = 0;


    switch (cenarioSelecionado) {
      case 1: 
        valorParcela = valorCompraNumber * CF(taxaJurosNumber, numeroParcelasNumber);
        totalAPagar = valorParcela * numeroParcelasNumber;
        break;
      case 2: 
        valorParcela = (valorCompraNumber - valorEntradaNumber) * CF(taxaJurosNumber, numeroParcelasNumber);
        totalAPagar = valorEntradaNumber + (valorParcela * numeroParcelasNumber);
        break;
      case 3:
        const PMT = (valorCompraNumber * CF(taxaJurosNumber, numeroParcelasNumber)) / (1 + CF(taxaJurosNumber, numeroParcelasNumber));
        valorParcela = PMT;
        totalAPagar = valorEntradaNumber + (PMT * numeroParcelasNumber);
        break;
      default:
        alert('Por favor, selecione um cenário.');
        return;
    }

    const resultadoCalculo = `Valor da parcela: ${valorParcela.toFixed(2)}\nTotal a Pagar: ${totalAPagar.toFixed(2)}`;
    setResultado(resultadoCalculo);
  };


  const CF = (i, n) => {
    return (i * (1 + i) ** n) / (((1 + i) ** n) - 1);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <Image 
        source={require('./images/logoDois.png')} style={styles.logoImage}/>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.titulo}>SELECIONE UM CENÁRIO DE FINANCIAMENTO:</Text>
        <View style={styles.containerBotoes}>
        <TouchableOpacity onPress={() => setCenarioSelecionado(1)} style={styles.btnCenarios}> 
          <Text style={styles.textBtnCenarios}>Sem entrada</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCenarioSelecionado(2)} style={styles.btnCenarios}> 
          <Text style={styles.textBtnCenarios}>Com entrada</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCenarioSelecionado(3)} style={styles.btnCenarios}> 
          <Text style={styles.textBtnCenarios}>Entrada igual às parcelas</Text>
        </TouchableOpacity>
        </View>
      <TextInput
          style={styles.input}
          placeholder="Valor da compra"
          placeholderTextColor="#999"
          keyboardType="numeric"
          returnKeyType="done"
          value={valorCompra}
          onChangeText={setValorCompra}
        />
        <TextInput
          style={styles.input}  
          placeholder="Taxa de juros (%)"
          placeholderTextColor="#999"
          keyboardType="numeric"
          returnKeyType="done"
          value={taxaJuros}
          onChangeText={setTaxaJuros}
        />
        <TextInput
          style={styles.input}          
          placeholder="Número de parcelas"
          placeholderTextColor="#999"
          keyboardType="numeric"
          returnKeyType="done"
          value={numeroParcelas}
          onChangeText={setNumeroParcelas}
        />
        {cenarioSelecionado === 2 && (
          <TextInput
            style={styles.input}
            placeholder="Valor de entrada"
            placeholderTextColor="#999"
            returnKeyType="done"
            keyboardType="numeric"
            value={valorEntrada}
            onChangeText={setValorEntrada}
          />
        )}    
        {resultado && (
          <View style={styles.resultadoContainer}>
            <Text style={styles.resultadoText}>{resultado}</Text>
          </View>
        )}
        <TouchableOpacity onPress={calcularCenario} style={styles.button}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    backgroundColor: 'white',
  },
  logoImage: {
    marginTop: 50,
    marginLeft: 120,
  },
  titulo: {
    marginBottom: 30,
    marginTop: 5,
    fontSize: 15,
    fontWeight: '500',
  },
  containerBotoes: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 20,
    marginLeft: 10
  },
  textBtnCenarios: {
    fontSize: 15,
    paddingRight: 15,
    color: '#4298b5'
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#4298b5',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 300
  },
  resultadoContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4298b5',
    alignItems: 'center',
  },
  resultadoText: {
    fontSize: 16,
    color: '#4298b5',
  },
  button: {
    backgroundColor: 'white',
    marginTop: 25,
    padding: 10,
    borderRadius: 5, 
    borderWidth: 2,
    borderColor: '#4298b5', 
    alignItems: 'center',
    width: 150,
    marginLeft: '2%'
  },
  buttonText: {
    color: '#4298b5',
    fontSize: 16,
  }
})

export default SimulacaoFinanceiraModalScreen;
