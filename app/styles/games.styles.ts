import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // רקע כמו במסך הראשי
    paddingTop: 30,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3F51B5', // צבע כותרת כמו במסך הראשי
    marginTop: 20,
    textAlign: 'center',
  },

  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12, // להתאים לפינות של הכרטיסיות במסך הראשי
    width: 200,
    margin: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },

  videoDescription: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333', // צבע טקסט ראשי
  },

  gameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F51B5', // צבע כמו במסך הראשי
    textAlign: 'center',
  },

  button: {
    width: '90%',
    padding: 12,
    backgroundColor: '#388E3C',
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  gamePlayButton: {
    width: '80%',
    padding: 10,
    backgroundColor: '#3F51B5', 
    borderRadius: 20,
    alignItems: 'center',
  },

  gameButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  stretch: {
    width: '100%',
    borderRadius: 20,
    height: 130,
    resizeMode: 'stretch',
  },

  dropdownButtonStyle: {
    width: '70%',
    height: 50,
    backgroundColor: '#E9ECEF', 
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#151E26', 
  },

  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },

  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },

  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#151E26',
  },
});
