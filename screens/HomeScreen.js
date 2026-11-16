import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { CustomButton } from '../components/CustomButton';

export default function HomeScreen({ navigation }) {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await api.getTasks();
      setTasks(data);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('homeTitle')}</Text>
      <CustomButton title={t('addTask')} onPress={() => navigation.navigate('TaskForm')} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TaskDetail', { task: item })}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskCat}>{item.category} - {item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7fafc' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginVertical: 6, elevation: 1 },
  taskTitle: { fontSize: 16, fontWeight: 'bold', color: '#2d3748' },
  taskCat: { fontSize: 14, color: '#718096', marginTop: 4 }
});
