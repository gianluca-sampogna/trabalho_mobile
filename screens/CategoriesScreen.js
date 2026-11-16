import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

export default function CategoriesScreen() {
  const { t } = useLanguage();
  const categories = ['Desenvolvimento', 'Design', 'Testes', 'Gestão', 'Infraestrutura'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('categoriesTitle')}</Text>
      {categories.map((cat, idx) => (
        <View key={idx} style={styles.item}>
          <Text style={styles.text}>{cat}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7fafc' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  item: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginVertical: 4 },
  text: { fontSize: 16, color: '#2d3748', fontWeight: '500' }
});
