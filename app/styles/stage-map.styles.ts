import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6A1B9A', // הבר הסגול יתפרס עד סוף המסך
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // מרווח לאנדרואיד
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#6A1B9A',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        height: Platform.OS === 'android' ? 90 : 110, // גובה מתאים
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50, // מרווח לשעון
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
        height: height, // גובה קבוע - לא מאפשר גלילה
        width: width,
    },
    mapBackground: {
        width: '100%',
        height: height, // גובה קבוע לכל המסך - לא ניתן לגלול
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;
