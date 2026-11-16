import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { styles } from './styles';

export default function RegisterScreen({ navigation }) {
  const { i18n } = useLanguage();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async ({ name, email, password }) => {
    try {
      setLoading(true);
      await register({ name, email, password });
      Alert.alert(i18n('successTitle'), i18n('registerSuccessMsg'), [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(i18n('errorTitle'), error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{i18n('registerTitle')}</Text>
          <Text style={styles.subtitle}>Firebase Authentication</Text>
        </View>

        <Controller
          control={control}
          name="name"
          rules={{ required: i18n('requiredField') }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label={i18n('name')}
              placeholder="Ex: Gianluca Sampogna"
              value={value}
              onChangeText={onChange}
              error={errors.name?.message}
            />
          )}
        />

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
              placeholder="nome@uvv.br"
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
            minLength: {
              value: 6,
              message: i18n('minPasswordLength'),
            },
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

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: i18n('requiredField'),
            validate: (value) => value === passwordValue || i18n('passwordsDoNotMatch'),
          }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label={i18n('confirmPassword')}
              placeholder="••••••••"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <View style={styles.actions}>
          {loading ? (
            <ActivityIndicator size="small" color="#18181b" style={styles.loader} />
          ) : (
            <CustomButton title={i18n('registerButton')} onPress={handleSubmit(onSubmit)} />
          )}

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
