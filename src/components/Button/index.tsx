import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import * as S from './styles'

type Props = TouchableOpacityProps & {
    title: string;
    type?: S.TypeProps;
    isLoading?: boolean;
}

export function Button({
    title,
    type = 'primary',
    isLoading = false,
    ...rest
}: Props) {
    return (
        <S.Container type={type} {...rest}>
            {isLoading ? <S.Load /> : <S.Title>{title}</S.Title>}
        </S.Container>
    )
}