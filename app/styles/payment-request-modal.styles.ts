import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  payButtonContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
  },

  payButton: {
    backgroundColor: '#3F51B5',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '90%',
  },

  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

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
