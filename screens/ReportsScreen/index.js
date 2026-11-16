import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useLanguage } from '../../context/LanguageContext';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { api } from '../../services/api';
import { styles } from './styles';

export default function ReportsScreen() {
  const { i18n } = useLanguage();
  const [reports, setReports] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { title: '' },
  });

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await api.getReports();
        setReports(data);
      } catch (error) {
        Alert.alert(i18n('errorTitle'), error.message);
      }
    };
    loadReports();
  }, []);

  const onAddReport = async ({ title }) => {
    try {
      const updated = await api.addReport(title);
      setReports(updated);
      reset();
    } catch (error) {
      Alert.alert(i18n('errorTitle'), error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const updated = await api.deleteReport(id);
      setReports(updated);
    } catch (error) {
      Alert.alert(i18n('errorTitle'), error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n('reportsTitle')}</Text>
      <Text style={styles.desc}>{i18n('reportsDesc')}</Text>

      <View style={styles.composerCard}>
        <Controller
          control={control}
          name="title"
          rules={{ required: i18n('requiredField') }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              placeholder={i18n('newReportPlaceholder')}
              value={value}
              onChangeText={onChange}
              error={errors.title?.message}
            />
          )}
        />
        <CustomButton
          title={`+ ${i18n('addReportButton')}`}
          onPress={handleSubmit(onAddReport)}
        />
      </View>

      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemBadge}>#{item.id}</Text>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
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
