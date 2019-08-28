import React,  {useState, useEffect } from 'react';
import { RefreshControl, ToastAndroid } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../constans/Colors';
import Url from '../constans/Url';
import Text from '../components/Text';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';

const View = styled.View`
flex: 1;
background-color: ${Colors.darkBlue};
`
const ScrollView = styled.ScrollView`flex-grow: 1;`
const ViewHeader = styled.View`
position: relative;
background-color: ${Colors.white};
height: 80px;
justify-content: flex-start;
text-align: center;
`
const CryptoName = styled.Text`
position: absolute;
color: ${Colors.darkBlue};
font-size: 20px;
font-weight: 500;
bottom: 15px;
left: 20px;
`
const CryptoIcon = styled.Image`
position: absolute;
height: 40px;
width: 40px;
resize-mode: center;
right: 20px;
bottom: 10px;
`

function CryptoDetails({navigation}){
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState({})

    const onRefresh = () => {
        setRefreshing(true)
        getData()
    }

    const getData = () => {
        fetch(Url.fullCryptoData(
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
                <CryptoName>{navigation.state.params.fullName}</CryptoName>
                <CryptoIcon source={{uri: navigation.state.params.icon}} />
            </ViewHeader>
            {loading && <LoadingView />}
            {error && <ErrorView />}
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <Text title='PRICE' value={data.PRICE} />
                <Text title='MARKET CAP' value={data.MKTCAP} />
                <Text title='VOLUME 24H' value={data.TOTALTOPTIERVOLUME24HTO} />
                <Text title='OPEN 24H' value={data.OPEN24HOUR} />
                <Text title='LOW 24H' value={data.LOW24HOUR} />
                <Text title='HIGH 24H' value={data.HIGH24HOUR} />
                <Text title='CHANGE 24H' value={error ? '' : data.CHANGEPCT24HOUR + ' %'} />
                <Text title='OPEN DAY' value={data.OPENDAY} />
                <Text title='LOW DAY' value={data.LOWDAY} />
                <Text title='HIGH DAY' value={data.HIGHDAY} />
                <Text last title='CHANGE DAY' value={error ? '' : data.CHANGEPCTDAY + ' %'} />
            </ScrollView>
        </View>
    )
}

export default CryptoDetails;