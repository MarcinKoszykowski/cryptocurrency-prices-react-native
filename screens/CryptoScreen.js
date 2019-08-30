import React,  {useState, useEffect } from 'react'
import { RefreshControl, ToastAndroid } from 'react-native'
import styled from 'styled-components/native'
import colors from '../constans/colors'
import url from '../constans/url'
import Detail from '../components/Detail'
import Loading from '../components/Loading'
import Error from '../components/Error';

const View = styled.View`
flex: 1;
background-color: ${colors.darkBlue};
`
const ScrollView = styled.ScrollView`flex-grow: 1;`
const ViewHeader = styled.View`
position: relative;
background-color: ${colors.white};
height: 80px;
justify-content: flex-start;
text-align: center;
`
const Name = styled.Text`
position: absolute;
color: ${colors.darkBlue};
font-size: 20px;
font-weight: 500;
bottom: 15px;
left: 20px;
`
const Icon = styled.Image`
position: absolute;
height: 40px;
width: 40px;
resize-mode: center;
right: 20px;
bottom: 10px;
`

function CryptoScreen({navigation}){
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState({})

    const onRefresh = () => {
        setRefreshing(true)
        getData()
    }

    const getData = () => {
        fetch(url.fullCryptoData(
            navigation.state.params.name,
            navigation.state.params.cash), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(responseJSON => {
            setData(responseJSON.DISPLAY[navigation.state.params.name][navigation.state.params.cash])

            setLoading(false)
            setRefreshing(false)
            setError(false)
        })
        .catch(() => {
            ToastAndroid.show('Server connection error!', ToastAndroid.LONG)
            setLoading(false)
            setError(true)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return(
        <View>
            <ViewHeader>
                <Name>{navigation.state.params.fullName}</Name>
                <Icon source={{uri: navigation.state.params.icon}} />
            </ViewHeader>
            {loading && <Loading />}
            {error && <Error />}
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <Detail title='PRICE' value={data.PRICE} />
                <Detail title='MARKET CAP' value={data.MKTCAP} />
                <Detail title='VOLUME 24H' value={data.TOTALTOPTIERVOLUME24HTO} />
                <Detail title='OPEN 24H' value={data.OPEN24HOUR} />
                <Detail title='LOW 24H' value={data.LOW24HOUR} />
                <Detail title='HIGH 24H' value={data.HIGH24HOUR} />
                <Detail title='CHANGE 24H' value={error ? '' : data.CHANGEPCT24HOUR + ' %'} />
                <Detail title='OPEN DAY' value={data.OPENDAY} />
                <Detail title='LOW DAY' value={data.LOWDAY} />
                <Detail title='HIGH DAY' value={data.HIGHDAY} />
                <Detail last title='CHANGE DAY' value={error ? '' : data.CHANGEPCTDAY + ' %'} />
            </ScrollView>
        </View>
    )
}

export default CryptoScreen