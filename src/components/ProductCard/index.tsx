import React from 'react';
import * as S from './styles'

//teste
//teste 2

import { RectButtonProps } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons'

export type ProductProps = {
    id: string;
    photo_url: string;
    name: string;
    description: string;
}

type Props = RectButtonProps & {
    data: ProductProps;
}

export default function ProductCard({ data, ...rest }: Props) {
    const { COLORS } = useTheme();
    return (
        <S.Container>
            <S.Content {...rest}>
                <S.Image source={{ uri: data.photo_url }} />

                <S.Details>
                    <S.indentification>
                        <S.Name>{data.name}</S.Name>
                        <Feather name='chevron-right' size={18} color={COLORS.SHAPE} />
                    </S.indentification>

                    <S.Description>{data.description}</S.Description>
                </S.Details>
            </S.Content>

            <S.Line />
        </S.Container>
    )
}