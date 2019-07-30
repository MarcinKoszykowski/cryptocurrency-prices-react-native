import React from 'react';
import {ActivityIndicator, RefreshControl, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import Item from '../components/Item';
import Colors from '../constans/Colors';
import Url from '../constans/Url';
import Data from '../constans/Data';
import Icon from 'react-native-vector-icons/FontAwesome'

const ScrollView = styled.ScrollView`
position: relative;
background-color: ${Colors.darkBlue};
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

class PriceUSDScreen extends React.Component {
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
        fetch(Url.fullCap('USD'), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(responseJSON => {
            this.setState({data : responseJSON.Data})
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

    componentDidMount(){this.getData()}
    handleButtonOnPress = (name, fullName, icon) => {
        Data.name = name;
        Data.fullName = fullName;
        Data.icon = icon;
        this.props.navigation.navigate('CryptoDetailsUSD')
    }

    render(){
        return(
            <>
                {this.state.isLoading &&
                <LoadingView>
                    <ActivityIndicator size='large' color={Colors.lightCyan} />
                </LoadingView>}
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

                {this.state.data.map(crypto => (
                    <Item
                        pressFn={() => this.handleButtonOnPress(
                                crypto.CoinInfo.Name,
                                crypto.CoinInfo.FullName,
                                'https://www.cryptocompare.com' + crypto.CoinInfo.ImageUrl
                            )
                        }
                        key={crypto.CoinInfo.Id}
                        icon={'https://www.cryptocompare.com' + crypto.CoinInfo.ImageUrl}
                        name={crypto.CoinInfo.Name}
                        price={crypto.DISPLAY.USD.PRICE}
                    />
                ))}
            </ScrollView>
            </>
        )
    }
}

export default PriceUSDScreen;