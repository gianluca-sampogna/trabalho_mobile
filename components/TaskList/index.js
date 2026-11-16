import React from 'react';
import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import { styles } from './styles';

export const TaskList = ({ tasks, selectedCategory, onSelectTask, emptyMessage }) => {
  const filteredTasks =
    !selectedCategory || selectedCategory === 'ALL'
      ? tasks
      : tasks.filter((item) => item.category === selectedCategory);

  return (
    <FlatList
      data={filteredTasks}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        </View>
      }
      renderItem={({ item }) => {
        const isCompleted = item.status === 'Concluído';
        return (
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.card}
            onPress={() => onSelectTask(item)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.taskTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.chevron}>›</Text>
            </View>
            <View style={styles.badgesRow}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{item.category}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  isCompleted ? styles.statusCompleted : styles.statusPending,
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    isCompleted
                      ? styles.statusCompletedText
                      : styles.statusPendingText,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
