import React from 'react';
import styled from 'styled-components/native';
import Colors from '../constans/Colors';

const Icon = styled.Image`
height: 35;
width: 35;
resize-mode: center;
tint-color: ${Colors.lightCyan};
`
const Button = styled.TouchableHighlight`
margin-left: 5%;
`

const CurrencyIcon = ({icon, pressFn}) => (
    <Button onPress={pressFn}>
        <Icon source={icon} />
    </Button>
)

export default CurrencyIcon;