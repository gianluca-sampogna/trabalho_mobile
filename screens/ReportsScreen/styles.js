import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#09090b',
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
    color: '#71717a',
    lineHeight: 18,
    marginBottom: 14,
  },
  composerCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    marginVertical: 4,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#71717a',
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#09090b',
  },
  deleteButton: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  deleteText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '600',
  },
});
