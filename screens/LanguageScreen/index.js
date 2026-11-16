import React from 'react';
import { View, Text } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { CustomButton } from '../../components/CustomButton';
import { styles } from './styles';

export default function LanguageScreen({ navigation }) {
  const { i18n, setLocale, locale } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{i18n('languageTitle')}</Text>
        <View style={styles.badge}>
          <Text style={styles.current}>
            {i18n('currentLanguage')}: {locale.toUpperCase()}
          </Text>
        </View>

        <CustomButton
          title="Português (PT)"
          onPress={() => setLocale('pt')}
          type={locale === 'pt' ? 'primary' : 'outline'}
        />
        <CustomButton
          title="English (EN)"
          onPress={() => setLocale('en')}
          type={locale === 'en' ? 'primary' : 'outline'}
        />
        <CustomButton
          title="Español (ES)"
          onPress={() => setLocale('es')}
          type={locale === 'es' ? 'primary' : 'outline'}
        />

        <View style={styles.divider} />

        <CustomButton
          title={i18n('cancel')}
          onPress={() => navigation.goBack()}
          type="secondary"
        />
      </View>
    </View>
  );
}
