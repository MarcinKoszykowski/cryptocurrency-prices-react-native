import { createStackNavigator, createAppContainer } from 'react-navigation'
import PriceScreen from './screens/PriceScreen'
import CryptoScreen from './screens/CryptoScreen'
import Colors from './constans/Colors';

const navigationOptionsStack = {
    title: 'Cryptocurrency Prices',
    headerStyle: {backgroundColor: Colors.magenta},
    headerTitleStyle: {
        fontWeight: '500',
        color: Colors.lightBlue
    },
}

const AppStackNavigator = createStackNavigator({
    Price: { screen: PriceScreen },
    Crypto: {
        screen: CryptoScreen,
        navigationOptions: {header: null}
    }
}, {
    initialRouteName: 'Price',
    defaultNavigationOptions: navigationOptionsStack
})

export default AppContainer = createAppContainer(AppStackNavigator)