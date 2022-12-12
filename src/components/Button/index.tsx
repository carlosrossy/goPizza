import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import * as S from './styles'

type Props = RectButtonProps & {
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
        <S.Container type={type} enabled={!isLoading} {...rest}>
            {isLoading ? <S.Load /> : <S.Title>{title}</S.Title>}
        </S.Container>
    )
}