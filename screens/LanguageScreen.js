import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { CustomButton } from '../components/CustomButton';

export default function LanguageScreen({ navigation }) {
  const { t, setLocale, locale } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('languageTitle')}</Text>
      <Text style={styles.current}>Atual / Current: {locale.toUpperCase()}</Text>
      <CustomButton title="Português (PT)" onPress={() => setLocale('pt')} type={locale === 'pt' ? 'primary' : 'secondary'} />
      <CustomButton title="English (EN)" onPress={() => setLocale('en')} type={locale === 'en' ? 'primary' : 'secondary'} />
      <CustomButton title="Español (ES)" onPress={() => setLocale('es')} type={locale === 'es' ? 'primary' : 'secondary'} />
      <CustomButton title={t('cancel')} onPress={() => navigation.goBack()} type="secondary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f7fafc' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  current: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#718096' }
});
