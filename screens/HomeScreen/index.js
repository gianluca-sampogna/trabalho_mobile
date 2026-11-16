import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';
import { CustomButton } from '../../components/CustomButton';
import { TaskList } from '../../components/TaskList';
import { styles } from './styles';

export default function HomeScreen({ navigation }) {
  const { i18n } = useLanguage();
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [tasksData, categoriesData] = await Promise.all([
          api.getTasks(),
          api.getCategories(),
        ]);
        setTasks(tasksData);
        setCategories(categoriesData);
      } catch (error) {
        Alert.alert(i18n('errorTitle'), error.message);
      }
    };

    loadData();
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{i18n('homeTitle')}</Text>
      </View>

      <CustomButton
        title={`+ ${i18n('addTask')}`}
        onPress={() => navigation.navigate('TaskForm')}
      />

      <View style={styles.filterCard}>
        <Text style={styles.filterLabel}>{i18n('filterByCategory')}</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label={i18n('allCategories')} value="ALL" />
            {categories.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>
      </View>

      <TaskList
        tasks={tasks}
        selectedCategory={selectedCategory}
        emptyMessage={i18n('noTasksFound')}
        onSelectTask={(task) => navigation.navigate('TaskDetail', { task })}
      />
    </View>
  );
}
