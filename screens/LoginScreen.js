import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';

export default function LoginScreen({ navigation }) {
  const { t } = useLanguage();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    login(email, password);
    navigation.replace('MainApp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('loginTitle')}</Text>
      <CustomInput label={t('email')} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <CustomInput label={t('password')} value={password} onChangeText={setPassword} secureTextEntry />
      <CustomButton title={t('loginButton')} onPress={handleLogin} />
      <CustomButton title={t('goToRegister')} onPress={() => navigation.navigate('Register')} type="secondary" />
      <CustomButton title="Configurar Idioma" onPress={() => navigation.navigate('LanguageConfig')} type="secondary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f7fafc' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1a202c', marginBottom: 24, textAlign: 'center' }
});
