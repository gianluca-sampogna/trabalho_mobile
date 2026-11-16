import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

export const CustomButton = ({ title, onPress, type = 'primary' }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, type === 'secondary' ? styles.secondary : styles.primary]} 
      onPress={onPress}
    >
      <Text style={[styles.text, type === 'secondary' ? styles.textSecondary : styles.textPrimary]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
