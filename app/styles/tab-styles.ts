import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  payButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  payText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
