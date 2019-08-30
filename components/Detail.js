import React from 'react'
import styled from 'styled-components/native'
import Colors from '../constans/Colors'

const View = styled.View`
position: relative;
width: 100%;
height: 60px;
justify-content: center;
border-bottom-width: ${props => props.last ? 0 : 1.5};
border-color: ${Colors.magenta};
`
const Title = styled.Text`
position: absolute;
left: 7.5%;
font-size: 18px;
color: ${Colors.magenta};
`
const Value = styled.Text`
position: absolute;
right: 7.5%;
font-size: 18px;
color: ${Colors.lightCyan};
`

const Detail = ({title, value, last}) => (
    <View last={last}>
        <Title>{title}</Title>
        <Value>{value}</Value>
    </View>
)

export default Detail