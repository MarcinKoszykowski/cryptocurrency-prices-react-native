import React from 'react'
import styled from 'styled-components/native'
import Colors from '../constans/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'

const View = styled.View`
height: 100%;
width: 100%;
z-index: 1;
align-items: center;
background-color: ${Colors.darkBlue};
justify-content: center;
`
const Text = styled.Text`
font-size: 26px;
font-weight: 500;
letter-spacing: 2px;
color: ${Colors.lightCyan};
margin-top: 10px;
`

const Error = () => (
    <View>
        <Icon
            name={'bug'}
            size={80}
            color={Colors.magenta}
        />
        <Text>ERROR</Text>
    </View>
)

export default Error