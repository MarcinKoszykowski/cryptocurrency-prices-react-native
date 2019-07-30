import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import PriceUSDScreen from './screens/PriceUSDScreen';
import PriceEURScreen from './screens/PriceEURScreen';
import PriceGBPScreen from './screens/PriceGBPScreen';
import CryptoDetailsUSD from './screens/CryptoDetailsUSD';
import CryptoDetailsEUR from './screens/CryptoDetailsEUR';
import CryptoDetailsGBP from './screens/CryptoDetailsGBP';
import Colors from './constans/Colors';

const navigationOptionsStack = {
    title: 'Cryptocurrency Prices',
    headerStyle: {backgroundColor: Colors.magenta},
    headerTitleStyle: {
        fontWeight: '500',
        color: Colors.lightBlue
    },
}

const navigationOptionsTab = (value) => {
    return {
        tabBarOptions: {
            tabStyle: {paddingVertical: 2},
            labelStyle: {paddingBottom: 1},
            activeTintColor: Colors.magenta,
            inactiveTintColor: Colors.darkBlue,
            style: {backgroundColor: Colors.lightCyan},
        },
        tabBarLabel: value.toUpperCase(),
        tabBarIcon: ({tintColor}) => (
            <Icon name={value} size={22} color={tintColor} />
        )
    }
}

const AppBottomTabNavigatorMain = createBottomTabNavigator({
    PriceUSDScreen: {
        screen: PriceUSDScreen,
        navigationOptions: navigationOptionsTab('usd')
    },
    PriceEURScreen: {
        screen: PriceEURScreen,
        navigationOptions: navigationOptionsTab('eur')
    },
    PriceGBPScreen: {
        screen: PriceGBPScreen,
        navigationOptions: navigationOptionsTab('gbp')
    }
})

const AppStackNavigator = createStackNavigator({
    TabMainNavigation: AppBottomTabNavigatorMain,

    CryptoDetailsUSD: {
        screen: CryptoDetailsUSD,
        navigationOptions: {header: null}
    },
    CryptoDetailsEUR: {
        screen: CryptoDetailsEUR,
        navigationOptions: {header: null}
    },
    CryptoDetailsGBP: {
        screen: CryptoDetailsGBP,
        navigationOptions: {header: null}
    },
}, {
    defaultNavigationOptions: navigationOptionsStack
})

export default AppContainer = createAppContainer(AppStackNavigator)