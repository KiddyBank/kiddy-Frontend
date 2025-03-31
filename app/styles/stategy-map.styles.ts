import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3F51B5', // הבר הסגול יתפרס עד סוף המסך
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#3F51B5',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        height: Platform.OS === 'android' ? 90 : 110,
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 10 : 50,
        zIndex: 10,
    },
    backButton: {
        padding: 10,
    },
    backText: {
        fontSize: 22,
        color: 'white',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
    mapContainer: {
        alignItems: 'center',
        height: height, 
        width: width,
    },
    mapBackground: {
        width: '100%',
        height: height,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;
