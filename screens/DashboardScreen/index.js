import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../../components/Card';
import { api } from '../../services/api';
import { styles } from './styles';

export default function DashboardScreen({ navigation }) {
  const { i18n } = useLanguage();
  const [userCount, setUserCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    async function loadData() {
      try {
        const uCount = await api.getUsersCount();
        const tasks = await api.getTasks();
        const catStats = await api.getCategoryStats();
        setUserCount(uCount);
        setTasksCount(tasks.length);
        setCategories(catStats);
      } catch (error) {
        Alert.alert(i18n('errorTitle'), error.message);
      }
    }

    loadData();
    const unsubscribe = navigation?.addListener?.('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{i18n('dashboardTitle')}</Text>
      <View style={styles.row}>
        <Card title={i18n('totalUsers')} value={userCount} />
        <Card title={i18n('totalTasks')} value={tasksCount} />
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.subtitle}>{i18n('categoryData')}</Text>
        <View style={styles.divider} />
        {Object.entries(categories).map(([cat, count], index, arr) => (
          <View
            key={cat}
            style={[
              styles.catRow,
              index === arr.length - 1 ? styles.catRowLast : null,
            ]}
          >
            <View style={styles.catLeft}>
              <View style={styles.dot} />
              <Text style={styles.catText}>{cat}</Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.catCount}>
                {count} {i18n('itemsSuffix')}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
