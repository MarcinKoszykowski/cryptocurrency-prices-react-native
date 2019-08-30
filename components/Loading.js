import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import colors from '../constans/colors';

const View = styled.View`
height: 100%;
width: 100%;
z-index: 1;
background-color: ${colors.darkBlue};
justify-content: center;
`

const Loading = () => (
    <View>
        <ActivityIndicator size='large' color={colors.lightCyan} />
    </View>
)

export default Loading;