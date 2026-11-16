import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useLanguage } from '../../context/LanguageContext';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { api } from '../../services/api';
import { styles } from './styles';

export default function AboutScreen() {
  const { i18n } = useLanguage();
  const [feedbacks, setFeedbacks] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { text: '' },
  });

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const data = await api.getFeedbacks();
        setFeedbacks(data);
      } catch (error) {
        Alert.alert(i18n('errorTitle'), error.message);
      }
    };
    loadFeedbacks();
  }, []);

  const onAddFeedback = async ({ text }) => {
    try {
      const updated = await api.addFeedback(text);
      setFeedbacks(updated);
      reset();
    } catch (error) {
      Alert.alert(i18n('errorTitle'), error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const updated = await api.deleteFeedback(id);
      setFeedbacks(updated);
    } catch (error) {
      Alert.alert(i18n('errorTitle'), error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Text style={styles.title}>{i18n('aboutTitle')}</Text>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>v1.0.0</Text>
          </View>
        </View>
        <Text style={styles.desc}>{i18n('aboutDesc')}</Text>
        <View style={styles.tagsRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{i18n('aboutUniversity')}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Expo SDK 54</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>shadcn/ui</Text>
          </View>
        </View>
      </View>

      <View style={styles.composerCard}>
        <Controller
          control={control}
          name="text"
          rules={{ required: i18n('requiredField') }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              placeholder={i18n('feedbackPlaceholder')}
              value={value}
              onChangeText={onChange}
              error={errors.text?.message}
            />
          )}
        />
        <CustomButton
          title={`+ ${i18n('addFeedbackButton')}`}
          onPress={handleSubmit(onAddFeedback)}
        />
      </View>

      <FlatList
        data={feedbacks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.text}</Text>
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
