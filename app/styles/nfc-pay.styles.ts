import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // dim background
    justifyContent: 'center',
    alignItems: 'center',
  },


  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#3F51B5',
  },

  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // רקע אפור בהיר ונעים
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  payButtonSticky: {
    position: 'absolute',
    top: 20, // Adjust as needed to control the distance from the top
    left: 0,
    right: 0,
    zIndex: 1, // Ensure it stays above other elements
    padding: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  nfcAnimation: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 15,
  },
  nfcNotice: {
    fontSize: 14,
    color: "#E63946", // אדום-ורדרד מודרני
    backgroundColor: "#FFE5E9",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    marginTop: 10,
    width: "90%",
  },
  payButton: {
    backgroundColor: "#457B9D", // כחול מודרני
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 30,
    marginTop: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // לאנדרואיד
  },
  payButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  successMessage: {
    color: "#2A9D8F", // ירוק מודרני
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    backgroundColor: "#DFF5F0",
    padding: 12,
    borderRadius: 12,
    textAlign: "center",
    width: "85%",
  },

  modal: {
    backgroundColor: 'white',
    width: '85%',
    padding: 24,
    borderRadius: 12,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: 'center',
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: '#9E9E9E',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }  
  
});
