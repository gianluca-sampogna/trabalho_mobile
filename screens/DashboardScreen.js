import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/Card';
import { api } from '../services/api';

export default function DashboardScreen() {
  const { t } = useLanguage();
  const [userCount, setUserCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    async function loadData() {
      const uCount = await api.getUsersCount();
      const tasks = await api.getTasks();
      const catStats = await api.getCategoryStats();
      setUserCount(uCount);
      setTasksCount(tasks.length);
      setCategories(catStats);
    }
    loadData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t('dashboardTitle')}</Text>
      <View style={styles.row}>
        <Card title={t('totalUsers')} value={userCount} />
        <Card title={t('totalTasks')} value={tasksCount} />
      </View>
      <Text style={styles.subtitle}>{t('categoryData')}</Text>
      {Object.entries(categories).map(([cat, count]) => (
        <View key={cat} style={styles.catRow}>
          <Text style={styles.catText}>{cat}</Text>
          <Text style={styles.catCount}>{count} itens</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f7fafc', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2d3748', marginBottom: 16 },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#4a5568', marginTop: 20, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  catRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginVertical: 4 },
  catText: { fontSize: 16, color: '#2d3748' },
  catCount: { fontSize: 16, fontWeight: 'bold', color: '#0056b3' }
});
