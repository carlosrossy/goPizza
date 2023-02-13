import React from 'react';
import * as S from './styles'

import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'
import { TouchableOpacityProps } from 'react-native'

export default function ButtonBack({ ...rest }: TouchableOpacityProps) {
    const { COLORS } = useTheme();

    return (
        <S.Container {...rest}>
            <MaterialIcons name='chevron-left' size={18} color={COLORS.TITLE} />
        </S.Container>
    )
}