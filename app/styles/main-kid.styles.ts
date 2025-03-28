import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  
  innerContainer: {
    flex: 1,
    paddingBottom: 20,
  },

  header: {
    backgroundColor: '#3F51B5',
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    height: 130, // גובה קבוע
  },

  tasksScrollView: {
    flexDirection: 'row',
    paddingVertical: 5,
  },

  taskItem: {
    width: 140,
    height: 100,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    elevation: 3,
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

  /* בקשות NFC */
  nfcContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    flex: 1,
    padding: 20,
    marginVertical: 10,
    height: 300, // גובה קבוע
  },

  nfcScrollView: {
    flexGrow: 1, // מאפשר להתארך מעבר לגובה הקבוע
  },
  
  nfcScrollViewContainer: {
    flex: 1,
    maxHeight: 250, // גובה שמאפשר מקום לגלול
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
    width: '100%', // מחפה על כל הרוחב
    backgroundColor: '#F5F5F5', // צבע רקע זהה לשאר העיצוב
    paddingVertical: 15, // מוסיף ריווח מלמעלה ולמטה
    alignItems: 'center', // מוודא שהתוכן באמצע
  },
  
  payButtonContainer: {
    width: '90%', // משאיר שוליים קטנים בצדדים
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
  
  
  /* פופאפ תשלום */
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 320,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },


   scrollContent: {
    flexGrow: 1,  
    justifyContent: 'flex-start', 
    paddingBottom: 20,
  },

  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    textAlign: 'right',
  },
  
});

export default styles;
  