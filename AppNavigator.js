import { createStackNavigator, createAppContainer } from 'react-navigation'
import PriceScreen from './screens/PriceScreen'
import CryptoScreen from './screens/CryptoScreen'
import colors from './constans/colors';

const navigationOptionsStack = {
    title: 'Cryptocurrency Prices',
    headerStyle: {backgroundColor: colors.magenta},
    headerTitleStyle: {
        fontWeight: '500',
        color: colors.lightBlue
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