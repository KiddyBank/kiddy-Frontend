import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3F51B5",
    marginBottom: 10,
  },
  nfcAnimation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 18,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  nfcError: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  successMessage: {
    color: "green",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#3F51B5",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
