import React, { useState, useEffect } from 'react';
import { RefreshControl, ToastAndroid } from 'react-native';
import styled from 'styled-components/native';
import Item from '../components/Item';
import Colors from '../constans/Colors';
import Url from '../constans/Url';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import CashIcon from '../components/CashIcon';

const View = styled.View`
flex: 1;
background-color: ${Colors.darkBlue};
`
const ScrollView = styled.ScrollView`flex-grow: 1;`
const BottomBar = styled.View`
justify-content: flex-end;
background-color: ${Colors.lightCyan};
flex-direction: row;
`

function PriceScreen ({navigation}) {
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [error, setError] = useState(false)
    const [USD, setUSD] = useState([])
    const [EUR, setEUR] = useState([])
    const [GBP, setGBP] = useState([])
    const [cash, setCash] = useState('USD')

    const onRefresh = () => {
        setRefreshing(true)
        getData()
    }

    const handleButtonOnPress = (crypto) => {
        navigation.navigate('CryptoDetails', {
            cash: cash,
            name: crypto.CoinInfo.Name,
            fullName: crypto.CoinInfo.FullName,
            icon: 'https://www.cryptocompare.com' + crypto.CoinInfo.ImageUrl
        })
    }

    const handleIconOnPress = (value) => {
        cash !== value ? setCash(value) : null
    }

    const getData = () => {
        fetch(Url.fullCapUSD, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(responseJSON => {
            setUSD(responseJSON.Data)
            fetch(Url.fullCapEUR, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(responseJSON => {
                setEUR(responseJSON.Data)
                fetch(Url.fullCapGBP, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(responseJSON => {
                    setGBP(responseJSON.Data)

                    setLoading(false)
                    setRefreshing(false)
                    setError(false)
                })
            })
            .catch(() => {
                ToastAndroid.show('Server connection error!', ToastAndroid.LONG)
                setLoading(false)
                setError(true)
            })
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const data = cash === 'USD' ? USD : cash === 'GBP' ? GBP : EUR

    return(
        <View>
            {loading && <LoadingView />}
            {error && <ErrorView />}
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
            {data.map(crypto => (
                <Item
                    pressFn={() => handleButtonOnPress(crypto)}
                    key={crypto.CoinInfo.Id}
                    icon={'https://www.cryptocompare.com' + crypto.CoinInfo.ImageUrl}
                    name={crypto.CoinInfo.Name}
                    price={crypto.DISPLAY[cash].PRICE}
                />
            ))}
            </ScrollView>
            <BottomBar>
                <CashIcon cash={cash} name={'usd'} pressFn={() => handleIconOnPress('USD')} />
                <CashIcon cash={cash} name={'eur'} pressFn={() => handleIconOnPress('EUR')} />
                <CashIcon cash={cash} name={'gbp'} pressFn={() => handleIconOnPress('GBP')} />
            </BottomBar>
        </View>
    )
}

// class PriceScreen extends React.Component {
//     state = {
//         data: [],
//         isLoading: true,
//         refreshing: false,
//         error: false
//     }

    // onRefresh = () => {
    //     this.setState({refreshing: true});
    //     this.getData();
    // }

    // getData = () => {
    //     fetch(Url.fullCap('EUR'), {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(responseJSON => {
    //         this.setState({data : responseJSON.Data})
    //         this.setState({isLoading: false})
    //         this.setState({refreshing: false})
    //         this.setState({error: false})
    //     })
    //     .catch(() => {
    //         ToastAndroid.show('Server connection error!', ToastAndroid.LONG)
    //         this.setState({isLoading: false})
    //         this.setState({error: true})
    //     })
    // }

    // goBack = () => {
    //     BackHandler.exitApp()
    //     return true
    // }
    // componentDidMount(){
    //     BackHandler.addEventListener('goback', this.goBack)
    //     this.getData()
    // }
    // componentWillUnmount(){BackHandler.removeEventListener('goback', this.goBack)}
    // handleButtonOnPress = (name, fullName, icon) => {
    //     Data.name = name;
    //     Data.fullName = fullName;
    //     Data.icon = icon;
    //     this.props.navigation.navigate('CryptoDetailsEUR')
    // }

    
//         return(
//             <>
                
                
//                 <ScrollView
//                 refreshControl={
//                     <RefreshControl
//                         refreshing={this.state.refreshing}
//                         onRefresh={this.onRefresh}
//                     />
//                 }>
//                 {this.state.data.map(crypto => (
//                     <Item
//                         pressFn={() => this.handleButtonOnPress(
//                                 crypto.CoinInfo.Name,
//                                 crypto.CoinInfo.FullName,
//                                 'https://www.cryptocompare.com' + crypto.CoinInfo.ImageUrl
//                             )
//                         }
//                         key={crypto.CoinInfo.Id}
//                         icon={'https://www.cryptocompare.com' + crypto.CoinInfo.ImageUrl}
//                         name={crypto.CoinInfo.Name}
//                         price={crypto.DISPLAY.EUR.PRICE}
//                     />
//                 ))}
//             </ScrollView>
//             </>
//         )
// }

export default PriceScreen;