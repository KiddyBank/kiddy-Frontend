import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    intervalRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        gap: 10, 
      },
      
      radioOption: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#3F51B5',
        backgroundColor: 'white',
      },
      
      radioOptionSelected: {
        backgroundColor: '#3F51B5',
      },
      
      radioText: {
        color: '#3F51B5',
        fontWeight: 'bold',
      },
      
      radioTextSelected: {
        color: 'white',
        fontWeight: 'bold',
      },
      
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    textAlign: 'right',
  },
  
  selected: {
    fontWeight: 'bold',
    color: '#3F51B5',
  },
  modalButtons: {
    marginTop: 20,
    width: '100%',
    gap: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#3F51B5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#aaa',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  cancel: {
    marginTop: 10,
    color: '#3F51B5',
    fontWeight: 'bold',
  },
    
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 10,
  },
  
  closeIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F51B5',
  },
  
});
