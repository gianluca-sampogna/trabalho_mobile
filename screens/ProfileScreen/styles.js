import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#09090b',
    letterSpacing: -0.4,
    marginBottom: 14,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    marginBottom: 16,
    shadowColor: '#09090b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  avatarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#fafafa',
    fontSize: 18,
    fontWeight: '700',
  },
  avatarInfo: {
    flex: 1,
  },
  avatarName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#09090b',
    marginBottom: 6,
  },
  courseBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f4f4f5',
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  courseBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3f3f46',
  },
  divider: {
    height: 1,
    backgroundColor: '#f4f4f5',
    marginVertical: 16,
  },
});
