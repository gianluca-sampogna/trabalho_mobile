import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { styles } from './styles';

export const CustomInput = ({ label, value, onChangeText, secureTextEntry, keyboardType, placeholder }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#a0aec0"
      />
    </View>
  );
};
