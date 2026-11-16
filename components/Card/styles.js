import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 6,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#0056b3',
  },
  title: {
    fontSize: 14,
    color: '#718096',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d3748',
    marginTop: 4,
  },
});
