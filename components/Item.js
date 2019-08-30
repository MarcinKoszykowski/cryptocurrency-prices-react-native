import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../constans/Colors'

const View = styled.View`
position: relative;
width: 100%;
height: 70px;
justify-content: center;
border-top-width: ${props => props.name === 'BTC' ? 0 : `1.5px`};
border-color: ${Colors.magenta};
`
const CryptoIcon = styled.Image`
position: absolute;
height: 35px;
width: 35px;
resize-mode: center;
left: 5%;
`
const Name = styled.Text`
position: absolute;
left: 20%;
font-size: 20px;
color: ${Colors.lightCyan};
`
const Price = styled.Text`
position: absolute;
left: 42.5%;
font-size: 20px;
color: ${Colors.lightBlue};
`
const Button = styled.TouchableHighlight`
position: absolute;
right: 7.5%;
`

const Item = ({icon, name, price, pressFn}) => (
    <View name={name}>
        <CryptoIcon source={{uri: icon}}/>
        <Name>{name}</Name>
        <Price>{price}</Price>
        <Button underlayColor={Colors.darkBlue} onPress={pressFn}>
            <Icon
                name={'arrow-circle-right'}
                size={35}
                color={Colors.magenta}
            />
        </Button>
    </View>
)

export default Item