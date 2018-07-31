import React, { Component } from 'react';
import Home from './HomeComponent';
import FlashQuiz from './FlashQuizComponent';
import { View, Platform, StatusBar } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

const HomeNavigator = createStackNavigator({
    Home: { screen: Home ,
    navigationOptions: ({ navigation }) => ({
        headerLeft: <Icon name="menu" size={24} 
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } 
        iconStyle={{ marginLeft: 10 }}
        />
      }) }
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#D21F2E'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const FlashQuizNavigator = createStackNavigator({
    FlashQuiz: { screen: FlashQuiz ,
    navigationOptions: ({ navigation }) => ({
        headerLeft: <Icon name="menu" size={24} 
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } 
        iconStyle={{ marginLeft: 10 }}
        />
      }) }
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#D21F2E'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const MainNavigator = createDrawerNavigator({
    Home:
        { screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    FlashQuiz:
        { screen: FlashQuizNavigator,
        navigationOptions: {
            title: 'Flashcard Quiz',
            drawerLabel: 'Flashcard Quiz',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='bolt'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    }
}, {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9',
});

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render () {
        return (
            <View style={{ flex:1, paddingTop: Platform.ios ? 0 : 0 }}>
                <MainNavigator />
            </View>
        );
    }

}

export default Main;