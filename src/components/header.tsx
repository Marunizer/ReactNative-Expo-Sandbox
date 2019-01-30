import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface CompProps {
    title: string
}

const Header = (props: CompProps) => {
    return (
        <View style= { styles.container }>
            <View style= { styles.content }>
                <Text style= { styles.titleText }> {props.title} </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex: 0,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#59BBEC',
        height: 100,
    },
    titleText:{
        color: '#fff',
        fontSize: 30
    },
    content : {
        flex: 0,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60
    },

});

export default Header;