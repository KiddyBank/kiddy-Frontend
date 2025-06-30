// add-to-savings-form-modal.styles.ts

import { StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    padding: 24,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    minHeight: screenHeight * 0.55,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 12,
    alignItems: 'center',
    width: '100%',
  },
  cancelButtonText: {
    color: '#888',
    fontSize: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },

 confetti: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    pointerEvents: 'none',
  },
  successMessageContainer: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  successMessageText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4BB543',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },

  errorText: {
  color: '#E53935',
  fontSize: 14,
  textAlign: 'center',
},

disabledButton: {
  backgroundColor: '#ccc',
},


});
