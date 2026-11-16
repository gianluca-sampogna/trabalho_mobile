import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    marginVertical: 6,
    width: '48.5%',
    borderWidth: 1,
    borderColor: '#e4e4e7',
    shadowColor: '#09090b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: '#71717a',
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    color: '#09090b',
    marginTop: 8,
    letterSpacing: -0.5,
  },
});
