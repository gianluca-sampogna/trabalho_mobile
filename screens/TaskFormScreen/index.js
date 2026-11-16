import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import { useLanguage } from '../../context/LanguageContext';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { api } from '../../services/api';
import { styles } from './styles';

const DEFAULT_CATEGORIES = [
  'Desenvolvimento',
  'Design',
  'Testes',
  'Gestão',
  'Infraestrutura',
];

export default function TaskFormScreen({ route, navigation }) {
  const { i18n } = useLanguage();
  const { task: editingTask } = route?.params || {};
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: editingTask ? editingTask.title : '',
      category: editingTask ? editingTask.category : DEFAULT_CATEGORIES[0],
      status: editingTask ? editingTask.status : 'Pendente',
    },
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await api.getCategories();
        if (data && data.length > 0) {
          setCategories(data);
          if (!editingTask) {
            setValue('category', data[0]);
          }
        }
      } catch (error) {
        Alert.alert(i18n('errorTitle'), error.message);
      }
    };
    loadCategories();
  }, [editingTask, setValue]);

  const onSubmit = async ({ title, category, status }) => {
    try {
      if (editingTask) {
        await api.updateTask(editingTask.id, {
          title: title.trim(),
          category,
          status,
        });
        navigation.navigate('MainApp');
      } else {
        await api.addTask({
          title: title.trim(),
          category,
          status,
        });
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert(i18n('errorTitle'), error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {editingTask ? i18n('editTask') : i18n('addTask')}
        </Text>

        <Controller
          control={control}
          name="title"
          rules={{ required: i18n('requiredField') }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label={i18n('taskTitleLabel')}
              placeholder={i18n('taskTitleLabel')}
              value={value}
              onChangeText={onChange}
              error={errors.title?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="category"
          rules={{ required: i18n('requiredField') }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>{i18n('taskCategoryLabel')}</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={styles.picker}
                >
                  {categories.map((cat) => (
                    <Picker.Item key={cat} label={cat} value={cat} />
                  ))}
                </Picker>
              </View>
              {errors.category?.message ? (
                <Text style={styles.errorText}>{errors.category.message}</Text>
              ) : null}
            </View>
          )}
        />

        <Controller
          control={control}
          name="status"
          rules={{ required: i18n('requiredField') }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>{i18n('taskStatusLabel')}</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={styles.picker}
                >
                  <Picker.Item label={i18n('statusPending')} value="Pendente" />
                  <Picker.Item label={i18n('statusCompleted')} value="Concluído" />
                </Picker>
              </View>
              {errors.status?.message ? (
                <Text style={styles.errorText}>{errors.status.message}</Text>
              ) : null}
            </View>
          )}
        />

        <View style={styles.actions}>
          <CustomButton title={i18n('save')} onPress={handleSubmit(onSubmit)} />
          <CustomButton
            title={i18n('cancel')}
            onPress={() => navigation.goBack()}
            type="outline"
          />
        </View>
      </View>
    </ScrollView>
  );
}
