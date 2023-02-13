import React from 'react';
import { Platform } from 'react-native'
import ButtonBack from '../../components/ButtonBack';
import * as S from './styles'

export function Product() {
    return (
        <S.Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

            <S.Header>
                <ButtonBack />

                <S.Title>Cadastrar</S.Title>

                <S.ButtonDelete>
                    <S.DeleteLabel>Deletar</S.DeleteLabel>
                </S.ButtonDelete>
            </S.Header>

        </S.Container>
    )
}