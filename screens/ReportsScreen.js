import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

export default function ReportsScreen() {
  const { t } = useLanguage();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('reportsTitle')}</Text>
      <Text style={styles.desc}>Relatório consolidado de produtividade e entregas do semestre letivo de 2026.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7fafc' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  desc: { fontSize: 16, color: '#4a5568', lineHeight: 22 }
});
