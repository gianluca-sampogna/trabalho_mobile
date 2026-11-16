import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { styles } from './styles';

export default function LoginScreen({ navigation }) {
  const { i18n } = useLanguage();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await login(email, password);
      navigation.replace('MainApp');
    } catch (error) {
      Alert.alert(i18n('errorTitle'), error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>UVV</Text>
          </View>
          <Text style={styles.title}>{i18n('loginTitle')}</Text>
          <Text style={styles.subtitle}>Firebase Cloud Auth • REST API</Text>
        </View>

        <Controller
          control={control}
          name="email"
          rules={{
            required: i18n('requiredField'),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: i18n('invalidEmail'),
            },
          }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label={i18n('email')}
              placeholder="aluno@uvv.br"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: i18n('requiredField'),
          }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label={i18n('password')}
              placeholder="••••••••"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              error={errors.password?.message}
            />
          )}
        />

        <View style={styles.primaryAction}>
          {loading ? (
            <ActivityIndicator size="small" color="#18181b" style={styles.loader} />
          ) : (
            <CustomButton title={i18n('loginButton')} onPress={handleSubmit(onSubmit)} />
          )}
        </View>

        <View style={styles.divider} />

        <CustomButton
          title={i18n('goToRegister')}
          onPress={() => navigation.navigate('Register')}
          type="outline"
        />
        <CustomButton
          title={i18n('languageTitle')}
          onPress={() => navigation.navigate('LanguageConfig')}
          type="secondary"
        />
      </View>
    </View>
  );
}
