import React from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { styles } from './styles';

export default function ProfileScreen({ navigation }) {
  const { i18n } = useLanguage();
  const { user, updateProfile, logout } = useAuth();

  const displayName = user?.name || 'Gianluca UVV';
  const initials = displayName
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: displayName,
      email: user?.email || 'aluno@uvv.br',
    },
  });

  const onSaveProfile = async (data) => {
    try {
      await updateProfile(data);
      Alert.alert(i18n('successTitle'), i18n('profileUpdatedSuccess'));
    } catch (error) {
      Alert.alert(i18n('errorTitle'), error.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{i18n('profileTitle')}</Text>

      <View style={styles.card}>
        <View style={styles.avatarHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.avatarInfo}>
            <Text style={styles.avatarName}>{displayName}</Text>
            <View style={styles.courseBadge}>
              <Text style={styles.courseBadgeText}>
                {i18n('courseLabel')}: {i18n('courseValue')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <Controller
          control={control}
          name="name"
          rules={{ required: i18n('requiredField') }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label={i18n('name')}
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
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              error={errors.email?.message}
            />
          )}
        />
      </View>

      <CustomButton
        title={i18n('updateProfileButton')}
        onPress={handleSubmit(onSaveProfile)}
      />
      <CustomButton
        title={i18n('logout')}
        onPress={handleLogout}
        type="destructive"
      />
    </ScrollView>
  );
}
