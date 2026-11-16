import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { CustomButton } from '../../components/CustomButton';
import { api } from '../../services/api';
import { styles } from './styles';

export default function TaskDetailScreen({ route, navigation }) {
  const { i18n } = useLanguage();
  const { task: initialTask } = route?.params || {};
  const [task, setTask] = useState(initialTask);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{i18n('taskDetail')}</Text>
        <CustomButton title={i18n('cancel')} onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const handleToggleStatus = async () => {
    try {
      const nextStatus = task.status === 'Concluído' ? 'Pendente' : 'Concluído';
      const updated = await api.updateTask(task.id, {
        title: task.title,
        category: task.category,
        status: nextStatus,
      });
      setTask(updated || { ...task, status: nextStatus });
    } catch (error) {
      Alert.alert(i18n('errorTitle'), error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteTask(task.id);
      navigation.goBack();
    } catch (error) {
      Alert.alert(i18n('errorTitle'), error.message);
    }
  };

  const isCompleted = task.status === 'Concluído';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{task.title}</Text>
          <View
            style={[
              styles.statusBadge,
              isCompleted ? styles.statusCompleted : styles.statusPending,
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                isCompleted ? styles.statusCompletedText : styles.statusPendingText,
              ]}
            >
              {task.status}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.metaRow}>
          <Text style={styles.metaKey}>{i18n('idLabel')}</Text>
          <Text style={styles.metaValue}>#{task.id}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaKey}>{i18n('taskCategoryLabel')}</Text>
          <View style={styles.categoryPill}>
            <Text style={styles.categoryPillText}>{task.category}</Text>
          </View>
        </View>
        <View style={[styles.metaRow, styles.metaRowLast]}>
          <Text style={styles.metaKey}>{i18n('taskStatusLabel')}</Text>
          <Text style={styles.metaValue}>{task.status}</Text>
        </View>
      </View>

      <CustomButton
        title={isCompleted ? i18n('markPending') : i18n('markCompleted')}
        onPress={handleToggleStatus}
      />
      <CustomButton
        title={i18n('editTask')}
        onPress={() => navigation.navigate('TaskForm', { task })}
        type="outline"
      />
      <CustomButton
        title={i18n('delete')}
        onPress={handleDelete}
        type="destructive"
      />
      <CustomButton
        title={i18n('cancel')}
        onPress={() => navigation.goBack()}
        type="secondary"
      />
    </View>
  );
}
