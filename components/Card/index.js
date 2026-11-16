import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export const Card = ({ title, value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
