import React from 'react';
import * as S from './styles'
import { useTheme } from 'styled-components/native'

import { MaterialIcons } from '@expo/vector-icons'
import HappyEmoji from '../../assets/happy.png'

export default function Home() {
    const { COLORS } = useTheme();
    return (
        <S.Container>
            <S.Header>
                <S.Greeting>
                    <S.GreetingEmoji source={HappyEmoji} />
                    <S.GreetingText>Olá, Admin</S.GreetingText>
                </S.Greeting>

                <S.SingOut>
                    <MaterialIcons name='logout' color={COLORS.TITLE} size={24} />
                </S.SingOut>
            </S.Header>
        </S.Container>
    )
}