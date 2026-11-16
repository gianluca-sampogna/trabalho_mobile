import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { CustomButton } from '../components/CustomButton';

export default function ProfileScreen({ navigation }) {
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('profileTitle')}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nome: {user?.name || 'Daniel Alves'}</Text>
        <Text style={styles.label}>E-mail: {user?.email || 'daniel@uvv.br'}</Text>
        <Text style={styles.label}>Curso: Ciência da Computação - UVV</Text>
      </View>
      <CustomButton title={t('logout')} onPress={handleLogout} type="secondary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7fafc' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 8, marginBottom: 20 },
  label: { fontSize: 16, marginVertical: 6, color: '#2d3748' }
});
