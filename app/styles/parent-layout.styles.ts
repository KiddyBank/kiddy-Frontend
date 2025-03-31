import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      headerContainer: {
        width: '100%',
        backgroundColor: '#3F51B5',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 20,
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      },
      kidsContainer: {
        width: '100%',
      },
      kid: {
        display: 'flex',
        flexDirection: 'row-reverse',
        flex: 1,
        gap: 30,
        margin: 20,
      },
      kidDetails: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      kidBalance: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#3F51B5',
      },
      kidName: {
        fontWeight: 'bold',
        color: '#3F51B5',
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 50,
      },
      nfcContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3F51B5',
      },
      transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
      },
      transactionText: {
        fontSize: 16,
      },
      transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3F51B5',
      },
      toggleButton: {
        padding: 10,
        borderRadius: 5,
      },
      pending: {
        backgroundColor: 'orange',
      },
      toggleButtonText: {
        color: 'white',
      },

});
