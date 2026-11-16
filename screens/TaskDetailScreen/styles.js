import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fafafa',
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#09090b',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#f4f4f5',
    marginVertical: 14,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f5',
  },
  metaRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 2,
  },
  metaKey: {
    fontSize: 13,
    fontWeight: '500',
    color: '#71717a',
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#09090b',
  },
  categoryPill: {
    backgroundColor: '#f4f4f5',
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#27272a',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  statusCompleted: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  statusPending: {
    backgroundColor: '#fffbeb',
    borderColor: '#fde68a',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusCompletedText: {
    color: '#15803d',
  },
  statusPendingText: {
    color: '#b45309',
  },
});
