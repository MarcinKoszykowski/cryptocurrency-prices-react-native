import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import Colors from '../constans/Colors'

const View = styled.View`
height: 100%;
width: 100%;
z-index: 1;
background-color: ${Colors.darkBlue};
justify-content: center;
`

const Loading = () => (
    <View>
        <ActivityIndicator size='large' color={Colors.lightCyan} />
    </View>
)

export default Loading