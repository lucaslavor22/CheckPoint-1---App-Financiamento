
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

const CadastroScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const handleCadastrar = () => {
    if (nome.trim() === '' || cpf.trim() === '' || email.trim() === '' || telefone.trim() === '' || dataNascimento.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    navigation.navigate('SimulacaoFinanceira');
  };

  const formatarCPF = (input) => {
    let cpfAtualizado = input.replace(/\D/g, '');
    cpfAtualizado = cpfAtualizado.replace(/(\d{3})(\d)/, '$1.$2');
    cpfAtualizado = cpfAtualizado.replace(/(\d{3})(\d)/, '$1.$2');
    cpfAtualizado = cpfAtualizado.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(cpfAtualizado);
  };

  const formatarTelefone = (input) => {
    let telefoneAtualizado = input.replace(/\D/g, '');
    telefoneAtualizado = telefoneAtualizado.replace(/(\d{2})(\d)/, '($1) $2');
    telefoneAtualizado = telefoneAtualizado.replace(/(\d{5})(\d)/, '$1-$2');
    setTelefone(telefoneAtualizado);
  };

  const formatarDataNascimento = (input) => {
    let dataNascimentoAtualizada = input.replace(/\D/g, ''); 
    dataNascimentoAtualizada = dataNascimentoAtualizada.replace(/(\d{2})(\d)/, '$1/$2');
    dataNascimentoAtualizada = dataNascimentoAtualizada.replace(/(\d{2})(\d)/, '$1/$2'); 
    dataNascimentoAtualizada = dataNascimentoAtualizada.replace(/(\d{4})\d+?$/, '$1');
    setDataNascimento(dataNascimentoAtualizada);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome completo:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        returnKeyType="next"
        placeholder='Digite seu nome completo'
        onChangeText={setNome}
      />

      <Text style={styles.label}>CPF:</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        returnKeyType="done"
        placeholder='Digite seu CPF'
        onChangeText={(text) => formatarCPF(text)}
        keyboardType="numeric"
        maxLength={14}
      />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput
        style={styles.input}
        value={email}
        returnKeyType="next"
        placeholder='Digite seu e-mail'
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Telefone:</Text>
      <TextInput
        style={styles.input}
        value={telefone}
        returnKeyType="done"
        placeholder='Digite seu telefone'
        onChangeText={(text) => formatarTelefone(text)}
        keyboardType="phone-pad"
        maxLength={15}
      />

      <Text style={styles.label}>Data de Nascimento:</Text>
      <TextInput
        style={styles.input}
        value={dataNascimento}
        returnKeyType="done" 
      
        onChangeText={(text) => formatarDataNascimento(text)}
        keyboardType="numeric"
        maxLength={10}
        placeholder="DD/MM/AAAA"
      />
      <TouchableOpacity onPress={handleCadastrar} style={styles.button}> 
      <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '20%',
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    paddingBottom: 5,
    fontWeight: '400',
    marginTop: 10
    },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#4298b5',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'white',
    marginTop: 35,
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#4298b5', 
    alignItems: 'center',
    width: 150,
    marginLeft: '30%'
  },
  buttonText: {
    color: '#4298b5',
    fontSize: 16,
  }
});

export default CadastroScreen;
