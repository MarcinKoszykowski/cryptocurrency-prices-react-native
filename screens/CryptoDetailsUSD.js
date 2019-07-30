import React from 'react';
import {ActivityIndicator, RefreshControl, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import Colors from '../constans/Colors';
import Url from '../constans/Url';
import Data from '../constans/Data';
import Text from '../components/Text';

const ScrollView = styled.ScrollView`
background-color: ${Colors.darkBlue};
`
const ViewHeader = styled.View`
position: relative;
background-color: ${Colors.white};
height: 80;
justify-content: center;
text-align: center;
`
const CryptoName = styled.Text`
position: absolute;
color: ${Colors.darkBlue};
font-size: 20;
font-weight: 500;
bottom: 15;
left: 20;
`
const CryptoIcon = styled.Image`
position: absolute;
height: 40;
width: 40;
resize-mode: center;
right: 20;
bottom: 10;
`
const LoadingView = styled.View`
height: 100%;
width: 100%;
z-index:1;
background-color: ${Colors.darkBlue};
justify-content: center;
`
const ErrorView = styled.View`
height: 100%;
width: 100%;
z-index:1;
align-items: center;
background-color: ${Colors.darkBlue};
justify-content: center;
`
const ErrorText = styled.Text`
font-size: 26;
font-weight: 500;
letter-spacing: 2;
color: ${Colors.lightCyan};
margin-top: 10;
`

class CryptoDetailsUSD extends React.Component {
    state = {
        data: [],
        isLoading: true,
        refreshing: false,
        error: false
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.getData();
    }

    getData = () => {
        fetch(Url.fullCryptoData(Data.name, 'USD'), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(responseJSON => {
            this.setState({data : responseJSON.DISPLAY[Data.name].USD})
            this.setState({isLoading: false})
            this.setState({refreshing: false})
            this.setState({error: false})
        })
        .catch(() => {
            ToastAndroid.show('Server connection error!', ToastAndroid.LONG)
            this.setState({isLoading: false})
            this.setState({error: true})
        })
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        return(
            <>
            <ViewHeader>
                <CryptoName>{Data.fullName}</CryptoName>
                <CryptoIcon source={{uri: Data.icon}} />
            </ViewHeader>
            {this.state.isLoading &&
                <LoadingView>
                    <ActivityIndicator size='large' color={Colors.lightCyan} />
                </LoadingView>
            }
            {this.state.error &&
            <ErrorView>
                <Icon
                    name={'bug'}
                    size={80}
                    color={Colors.magenta}
                />
                <ErrorText>ERROR</ErrorText>
            </ErrorView>
            }
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }>
                <Text title='PRICE' value={this.state.data.PRICE} />
                <Text title='MARKET CAP' value={this.state.data.MKTCAP} />
                <Text title='VOLUME 24H' value={this.state.data.TOTALTOPTIERVOLUME24HTO} />
                <Text title='OPEN 24H' value={this.state.data.OPEN24HOUR} />
                <Text title='LOW 24H' value={this.state.data.LOW24HOUR} />
                <Text title='HIGH 24H' value={this.state.data.HIGH24HOUR} />
                <Text title='CHANGE 24H' value={this.state.error ? '' : this.state.data.CHANGEPCT24HOUR + ' %'} />
                <Text title='OPEN DAY' value={this.state.data.OPENDAY} />
                <Text title='LOW DAY' value={this.state.data.LOWDAY} />
                <Text title='HIGH DAY' value={this.state.data.HIGHDAY} />
                <Text last title='CHANGE DAY' value={this.state.error ? '' : this.state.data.CHANGEPCTDAY + ' %'} />
            </ScrollView>
            </>
        )
    }
}

export default CryptoDetailsUSD;