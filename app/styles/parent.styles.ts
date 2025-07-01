import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#3F51B5',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 30,
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
  kidsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  kid: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
    gap: 20,
    position: 'relative', 
  },
  kidDetails: {
    justifyContent: 'center',
    flexShrink: 1,
  },
  kidBalance: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F51B5',
  },
  kidName: {
    fontWeight: 'bold',
    color: '#3F51B5',
    fontSize: 20,
    textAlign: 'right',          
    writingDirection: 'rtl',      
    alignSelf: 'flex-end',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  nfcContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: 10,
    textAlign: 'right',          
    writingDirection: 'rtl',      
    alignSelf: 'flex-end',
  },
  transactionRow: {
    flexDirection: 'row-reverse', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    gap: 10,
  },
  transactionText: {
    fontSize: 16,
    textAlign: 'right',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3F51B5',
    textAlign: 'right',
    marginHorizontal: 10,
  },

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },

  descriptionText: {
  fontSize: 17,
  color: '#555',
  textAlign: 'right',
  writingDirection: 'rtl',
},

  toggleButton: {
  paddingVertical: 6,
  paddingHorizontal: 6,    
  borderRadius: 10,          
  minWidth: 40,
  alignItems: 'center',
  shadowColor: '#000',
},
  approveButton: {
    backgroundColor: 'green',
  },
  rejectButton: {
    backgroundColor: 'red',
  },
  toggleButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  successMessageBox: {
    backgroundColor: '#DFF2BF',
    borderColor: '#4F8A10',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  successMessageText: {
    color: '#4F8A10',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  allowanceText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#3F51B5',
    marginTop: 5,
  },

  setAllowance: {
    fontSize: 14,
    color: '#3F51B5',
    textDecorationLine: 'underline',
    marginTop: 5,
  },

  allowanceBadge: {
    position: 'absolute',
    left: 0, 
    top: '50%',
    transform: [{ translateY: -12 }],
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  allowanceBadgeText: {
    color: '#3F51B5',
    fontSize: 12,
    textAlign: 'center',
  },
  allowanceInfo: {
    alignItems: 'center',
  },
  
  allowanceAmount: {
    fontSize: 13,
    color: '#3F51B5',
  },
  
  taskRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },

taskDetailsContainer: {
  flex: 1,
  alignItems: 'flex-end',
},

taskName: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#3F51B5',
  textAlign: 'right',
  writingDirection: 'rtl',
},

toggleButtonsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 10, 
  marginTop: 8,
},

assignedChildrenText: {
  fontSize: 14,
  color: '#555',
  textAlign: 'right',
  marginTop: 4,
},


addTaskButton: {
  marginTop: 20,
  backgroundColor: '#3F51B5',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 10,
  alignItems: 'center',
  alignSelf: 'center', 
  minWidth: 140,
},

addTaskButtonText: {
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 16,
},

trashIcon: {
  fontSize: 20, 
  textAlign: 'center',
  paddingHorizontal: 6,
},

});
