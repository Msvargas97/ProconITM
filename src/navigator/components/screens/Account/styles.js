import {StyleSheet} from 'react-native';
import {color} from '../../../../config';

export const avatar = {
    container: {
        backgroundColor: color.primary,
    },
    content: {
        fontSize: 26,
        fontWeight: 'bold',
    }
};

export default StyleSheet.create({
    scroll: {
        backgroundColor: 'white',
    },
    container1: {
        margin: 5,
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    textStyle: {
        marginTop: 60,
        borderColor: 'gray',
        borderWidth: 3,
        height: 50,
        textAlignVertical: 'center',
        marginHorizontal: 20,
    },
    contentAvatar: {
        position: 'absolute',
        alignItems: 'center',
        alignSelf: 'center',
        top: 50,
    },
    titleStyle:{
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color :'rgb(64,64,64)',
        marginVertical: 7,
    },
    valueStyle :{
        fontSize: 13,
        fontWeight: '200',
        fontFamily: 'sans-serif',
    },
    MainContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',

    },
    cardViewStyle: {
        width: 250,
        height : 200
    },

    cardView_InsideText: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        marginTop: 50

    }
});

/*                 <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', alignSelf: 'flex-end', margin: 10 }}>
                            <View style={{ backgroundColor: 'white', borderRadius: 10, flexDirection: 'column', height: 100, width: 100 }}></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', alignSelf: 'flex-end', margin: 10 }}>
                            <View style={{ backgroundColor: 'white', borderRadius: 10, flexDirection: 'column', height: 100, width: 100 }}></View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', alignSelf: 'flex-start', margin: 10 }}>
                            <View style={{ backgroundColor: 'white', borderRadius: 10, flexDirection: 'column', height: 100, width: 100 }}></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', alignSelf: 'flex-start', margin: 10 }}>
                            <View style={{ backgroundColor: 'white', borderRadius: 10, flexDirection: 'column', height: 100, width: 100 }}></View>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'absolute' }}>
                        <View style={{
                            backgroundColor: 'blue',
                            borderRadius: 10, height: 100, width: 100, borderRadius: 100 / 2
                        }}></View>
                    </View>
                </View> */