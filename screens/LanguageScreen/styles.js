import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fafafa',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    shadowColor: '#09090b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#09090b',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: '#f4f4f5',
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 18,
  },
  current: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3f3f46',
  },
  divider: {
    height: 1,
    backgroundColor: '#f4f4f5',
    marginVertical: 12,
  },
});
