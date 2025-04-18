// parent-layout.styles.ts
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
    padding: 20,
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
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
  },
  kidDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
  },
  kidBalance: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3F51B5',
  },
  kidName: {
    fontWeight: 'bold',
    color: '#3F51B5',
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
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  transactionText: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginHorizontal: 10,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 4,
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
  
});
