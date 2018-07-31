import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Home'
    }

    render () {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <Text>Home</Text>
            </View>
        );
    }
    
}

export default Home;