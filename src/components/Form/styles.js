import { StyleSheet } from 'react-native';
import { color } from '../../config';

export default ({
    contentContainer: {
        backgroundColor: 'white',
        elevation: 4,
        borderRadius: 10,
        marginHorizontal: 5,
        marginTop : 0,
        marginBottom: 20,
        paddingBottom: 5
    },
    scroll: {
        backgroundColor: 'white',
        paddingBottom: 50
    },
    sectionHeader: {
        container: {
            backgroundColor: 'rgb(220,220,220)',
            alignItems: 'stretch',
            borderWidth: 1,
            borderTopColor: 'gray',
            borderBottomColor: 'gray',
            // marginTop: 15
        },
        text: {
            fontSize: 17,
            fontFamily: 'sans-serif-condensed',
            fontWeight: '200',
            color: 'black',
            marginLeft: 10,
            padding: 4,
        }
    }
})