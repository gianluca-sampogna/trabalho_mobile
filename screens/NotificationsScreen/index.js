import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useLanguage } from '../../context/LanguageContext';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { api } from '../../services/api';
import { styles } from './styles';

export default function NotificationsScreen() {
  const { i18n } = useLanguage();
  const [notifications, setNotifications] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { text: '' },
  });

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await api.getNotifications();
        setNotifications(data);
      } catch (error) {
        Alert.alert(i18n('errorTitle'), error.message);
      }
    };
    loadNotifications();
  }, []);

  const onAddNotification = async ({ text }) => {
    try {
      const updated = await api.addNotification(text);
      setNotifications(updated);
      reset();
    } catch (error) {
      Alert.alert(i18n('errorTitle'), error.message);
    }
  };

  const handleToggleRead = async (id) => {
    try {
      const updated = await api.toggleNotificationRead(id);
      setNotifications(updated);
    } catch (error) {
      Alert.alert(i18n('errorTitle'), error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const updated = await api.deleteNotification(id);
      setNotifications(updated);
    } catch (error) {
      Alert.alert(i18n('errorTitle'), error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n('notificationsTitle')}</Text>

      <View style={styles.composerCard}>
        <Controller
          control={control}
          name="text"
          rules={{ required: i18n('requiredField') }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              placeholder={i18n('newNotificationPlaceholder')}
              value={value}
              onChangeText={onChange}
              error={errors.text?.message}
            />
          )}
        />
        <CustomButton
          title={`+ ${i18n('addNotificationButton')}`}
          onPress={handleSubmit(onAddNotification)}
        />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => handleToggleRead(item.id)}
            >
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.dot,
                    item.read ? styles.dotRead : styles.dotUnread,
                  ]}
                />
                <Text style={styles.status}>
                  {item.read ? i18n('readStatus') : i18n('unreadStatus')}
                </Text>
              </View>
              <Text style={styles.text}>{item.text}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteText}>{i18n('delete')}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
