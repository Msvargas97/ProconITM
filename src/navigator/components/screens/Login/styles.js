import { StyleSheet } from "react-native";

export default StyleSheet.create({
    scroll: {
        backgroundColor: 'white',
    },

    container: {
        flex: 1,
        margin: 5,
        paddingHorizontal: 20,
    },
    contentContainer: {
        padding: 8,
    },
    logo: {
        width: 300,
        height: 150,
        resizeMode: 'contain'
    },
    footer: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
    hyperLink: {
        color: 'steelblue',
        fontWeight: 'bold',
    }
})