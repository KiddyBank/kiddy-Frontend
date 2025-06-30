import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  

  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'left',
  },

  header: {
    backgroundColor: '#3F51B5',
    alignItems: 'center',
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: '100%',
    marginBottom: 10,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  balanceText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },

  balanceLabel: {
    fontSize: 16,
    color: 'white',
  },

  errorText: {
    color: 'red',
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },

  /* תנועות אחרונות */
  transactionsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
  },

  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },

  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },

  transactionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* משימות - גלילה לרוחב */
  tasksContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
  },

  tasksScrollView: {
    flexDirection: 'row',
    paddingVertical: 5,
  },

  taskItem: {
    width: 160,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },


  taskText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  taskReward: {
    fontSize: 14,
    color: 'green',
    marginVertical: 5,
  },

  taskButton: {
    backgroundColor: '#388E3C',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  taskButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },

  /* בקשות */
  nfcContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    flex: 1,
    padding: 20,
    marginVertical: 10,
    height: 300, 
  },

  nfcScrollView: {
    flexGrow: 1, 
  },
  
  nfcScrollViewContainer: {
    flex: 1,
    maxHeight: 250, 
    overflow: 'hidden',
  },

  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },

  transactionText: {
    fontSize: 16,
    color: '#333',
  },

  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  approved: {
    backgroundColor: '#4CAF50',
  },

  pending: {
    backgroundColor: '#FFC107',
  },

  toggleButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  scrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  

  /* Empty states */
  emptySection: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },

  /* כפתור בקשת תשלום */
  payButtonBackground: {
    width: '100%', 
    backgroundColor: '#F5F5F5', 
    paddingVertical: 15, 
    alignItems: 'center', 
  },
  
  payButtonContainer: {
    width: '90%', 
  },
  
  payButton: {
    backgroundColor: '#3F51B5',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },
  
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  savingsSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
  },

  savingsCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  savingsTextContainer: {
    flex: 1,
  },

  savingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3F51B5',
    textAlign: 'right',
  },

  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },

  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  noGoalButton: {
  backgroundColor: '#FFC107',
  paddingVertical: 12,
  borderRadius: 20,
  alignItems: 'center',
},

noGoalButtonText: {
  color: '#333',
  fontWeight: 'bold',
  fontSize: 16,
},

progressBarContainer: {
  height: 10,
  backgroundColor: '#E0E0E0',
  borderRadius: 5,
  overflow: 'hidden',
  marginTop: 8,
},

progressBarFill: {
  height: '100%',
  backgroundColor: '#4CAF50',
  borderRadius: 5,
},

progressPercent: {
  marginTop: 4,
  fontSize: 12,
  color: '#333',
  textAlign: 'right',
},

savingsEncouragement: {
  fontSize: 16,
  color: '#1B4D3E',
  textAlign: 'center',
  marginBottom: 12,
  fontWeight: '500',
},

encourageButton: {
  backgroundColor: '#00C897',
  paddingVertical: 10,
  paddingHorizontal: 24,
  borderRadius: 20,
},

encourageButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},

encouragementContainer: {
  backgroundColor: '#E5F9F2',
  borderRadius: 16,
  padding: 16,
  marginVertical: 20,
  alignItems: 'center',
  justifyContent: 'center',
},

  
});

export default styles;
  