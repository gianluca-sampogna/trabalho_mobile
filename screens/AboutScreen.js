import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

export default function AboutScreen() {
  const { t } = useLanguage();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('aboutTitle')}</Text>
      <Text style={styles.desc}>Aplicativo desenvolvido em React Native com Expo para a avaliação do 2º Bimestre de 2026.</Text>
      <Text style={styles.desc}>Universidade Vila Velha - UVV</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7fafc' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  desc: { fontSize: 16, color: '#4a5568', lineHeight: 22, marginVertical: 4 }
});
