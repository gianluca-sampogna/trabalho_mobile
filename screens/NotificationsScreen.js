import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

export default function NotificationsScreen() {
  const { t } = useLanguage();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('notificationsTitle')}</Text>
      <View style={styles.item}><Text style={styles.text}>Nova versão do Expo SDK 51 disponível.</Text></View>
      <View style={styles.item}><Text style={styles.text}>Prazo do Trabalho de React Native se aproximando.</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7fafc' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  item: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginVertical: 6 },
  text: { fontSize: 15, color: '#2d3748' }
});
