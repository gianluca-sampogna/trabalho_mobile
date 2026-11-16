import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useLanguage } from '../../context/LanguageContext';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { api } from '../../services/api';
import { styles } from './styles';

export default function CategoriesScreen() {
  const { i18n } = useLanguage();
  const [categories, setCategories] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '' },
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (error) {
        Alert.alert(i18n('errorTitle'), error.message);
      }
    };
    loadCategories();
  }, []);

  const onAddCategory = async ({ name }) => {
    try {
      const updated = await api.addCategory(name);
      setCategories(updated);
      reset();
    } catch (error) {
      Alert.alert(i18n('errorTitle'), error.message);
    }
  };

  const handleDelete = async (catName) => {
    try {
      const updated = await api.deleteCategory(catName);
      setCategories(updated);
    } catch (error) {
      Alert.alert(i18n('errorTitle'), error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n('categoriesTitle')}</Text>

      <View style={styles.composerCard}>
        <Controller
          control={control}
          name="name"
          rules={{ required: i18n('requiredField') }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              placeholder={i18n('newCategoryPlaceholder')}
              value={value}
              onChangeText={onChange}
              error={errors.name?.message}
            />
          )}
        />
        <CustomButton
          title={`+ ${i18n('addCategoryButton')}`}
          onPress={handleSubmit(onAddCategory)}
        />
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <View style={styles.tagDot} />
              <Text style={styles.text}>{item}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item)}
            >
              <Text style={styles.deleteText}>{i18n('delete')}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
