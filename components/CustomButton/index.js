import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

export const CustomButton = ({ title, onPress, type = 'primary' }) => {
  const buttonVariant =
    type === 'secondary'
      ? styles.secondary
      : type === 'destructive'
      ? styles.destructive
      : type === 'outline'
      ? styles.outline
      : styles.primary;

  const textVariant =
    type === 'secondary' || type === 'outline'
      ? styles.textSecondary
      : type === 'destructive'
      ? styles.textDestructive
      : styles.textPrimary;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, buttonVariant]}
      onPress={onPress}
    >
      <Text style={[styles.text, textVariant]}>{title}</Text>
    </TouchableOpacity>
  );
};
