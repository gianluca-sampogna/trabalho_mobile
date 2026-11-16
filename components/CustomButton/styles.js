import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    minHeight: 42,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    width: '100%',
  },
  primary: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#18181b',
  },
  secondary: {
    backgroundColor: '#f4f4f5',
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  outline: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  destructive: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  textPrimary: {
    color: '#fafafa',
  },
  textSecondary: {
    color: '#18181b',
  },
  textDestructive: {
    color: '#dc2626',
  },
});
