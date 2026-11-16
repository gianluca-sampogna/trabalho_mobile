import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 22,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    shadowColor: '#09090b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#09090b',
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  fieldContainer: {
    marginVertical: 6,
    width: '100%',
  },
  label: {
    fontSize: 13,
    color: '#09090b',
    marginBottom: 6,
    fontWeight: '500',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  picker: {
    height: 56,
    width: '100%',
    color: '#09090b',
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
    fontWeight: '500',
  },
  actions: {
    marginTop: 12,
  },
});
