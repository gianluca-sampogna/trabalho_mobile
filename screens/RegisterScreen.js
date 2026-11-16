import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';

export default function RegisterScreen({ navigation }) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos!');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
    Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('registerTitle')}</Text>
      <CustomInput label={t('name')} value={name} onChangeText={setName} />
      <CustomInput label={t('email')} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <CustomInput label={t('password')} value={password} onChangeText={setPassword} secureTextEntry />
      <CustomInput label={t('confirmPassword')} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      <CustomButton title={t('registerButton')} onPress={handleRegister} />
      <CustomButton title={t('cancel')} onPress={() => navigation.goBack()} type="secondary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f7fafc' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1a202c', marginBottom: 20, textAlign: 'center' }
});
