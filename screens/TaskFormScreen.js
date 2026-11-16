import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { api } from '../services/api';

export default function TaskFormScreen({ navigation }) {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = async () => {
    if (!title || !category) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    await api.addTask({ title, category, status: 'Pendente' });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('addTask')}</Text>
      <CustomInput label="Título da Tarefa" value={title} onChangeText={setTitle} />
      <CustomInput label="Categoria" value={category} onChangeText={setCategory} />
      <CustomButton title={t('save')} onPress={handleSave} />
      <CustomButton title={t('cancel')} onPress={() => navigation.goBack()} type="secondary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7fafc', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }
});
