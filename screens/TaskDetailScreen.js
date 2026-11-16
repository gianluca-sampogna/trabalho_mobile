import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { CustomButton } from '../components/CustomButton';
import { api } from '../services/api';

export default function TaskDetailScreen({ route, navigation }) {
  const { t } = useLanguage();
  const { task } = route.params;

  const handleDelete = async () => {
    await api.deleteTask(task.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('taskDetail')}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>ID: {task.id}</Text>
        <Text style={styles.label}>Título: {task.title}</Text>
        <Text style={styles.label}>Categoria: {task.category}</Text>
        <Text style={styles.label}>Status: {task.status}</Text>
      </View>
      <CustomButton title={t('delete')} onPress={handleDelete} type="secondary" />
      <CustomButton title={t('cancel')} onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7fafc' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 8, marginBottom: 20 },
  label: { fontSize: 16, marginVertical: 6, color: '#2d3748' }
});
