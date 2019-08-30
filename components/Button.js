import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../constans/colors';

const View = styled.View`
margin: 5px 0 3px;
width: 33%;
justify-content: center;
align-items: center;
`
const TouchableHighlight = styled.TouchableHighlight`
width: 95%;
align-items: center;
z-index: 1;
`
const Text = styled.Text`
margin-top: 1px;
font-size: 12px;
color: ${props => props.cash === props.name ? colors.magenta : colors.darkBlue};
`

const Button = ({cash, pressFn, name}) => (
    <View>
        <TouchableHighlight
            underlayColor={colors.lightCyan}
            onPress={pressFn}
        >
            <Icon
                name={name}
                size={26}
                color={cash.toLowerCase() === name ? colors.magenta : colors.darkBlue}
            />
        </TouchableHighlight>
        <Text cash={cash.toLowerCase()} name={name}>{name.toUpperCase()}</Text>
    </View>
)

export default Button;