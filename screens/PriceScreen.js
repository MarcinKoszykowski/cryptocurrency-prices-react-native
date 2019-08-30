import React, { useState, useEffect } from 'react';
import { RefreshControl, ToastAndroid } from 'react-native';
import styled from 'styled-components/native';
import Item from '../components/Item';
import colors from '../constans/colors';
import url from '../constans/url';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Error from '../components/Error';

const View = styled.View`
flex: 1;
background-color: ${colors.darkBlue};
`
const ScrollView = styled.ScrollView`flex-grow: 1;`
const BottomBar = styled.View`
justify-content: flex-end;
background-color: ${colors.lightCyan};
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
        navigation.navigate('Crypto', {
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
        fetch(url.fullCapUSD, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(responseJSON => {
            setUSD(responseJSON.Data)
            fetch(url.fullCapEUR, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(responseJSON => {
                setEUR(responseJSON.Data)
                fetch(url.fullCapGBP, {
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
            {loading && <Loading />}
            {error && <Error />}
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
                <Button cash={cash} name={'usd'} pressFn={() => handleIconOnPress('USD')} />
                <Button cash={cash} name={'eur'} pressFn={() => handleIconOnPress('EUR')} />
                <Button cash={cash} name={'gbp'} pressFn={() => handleIconOnPress('GBP')} />
            </BottomBar>
        </View>
    )
}

export default PriceScreen;