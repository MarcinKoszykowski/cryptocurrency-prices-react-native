import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../constans/Colors'

const View = styled.View`
margin: 5px 0 3px;
width: 33%;
justify-content: center;
align-items: center;
`
const Button = styled.TouchableHighlight`
width: 95%;
align-items: center;
z-index: 1;`
const Text = styled.Text`
margin-top: 1px;
font-size: 12px;
color: ${props => props.cash === props.name ? Colors.magenta : Colors.darkBlue};
`

const CashIcon = ({cash, pressFn, name}) => (
    <View>
        <Button
            underlayColor={Colors.lightCyan}
            onPress={pressFn}
        >
            <Icon
                name={name}
                size={26}
                color={cash.toLowerCase() === name ? Colors.magenta : Colors.darkBlue}
            />
        </Button>
        <Text cash={cash.toLowerCase()} name={name}>{name.toUpperCase()}</Text>
    </View>
)

export default CashIcon