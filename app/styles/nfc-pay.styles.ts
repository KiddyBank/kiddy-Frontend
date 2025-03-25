import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // רקע אפור בהיר ונעים
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
});
