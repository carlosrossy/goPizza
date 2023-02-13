import React from 'react';
import { Platform } from 'react-native'
import * as S from './styles'

import ButtonBack from '../../components/ButtonBack';
import Photo from '../../components/Photo';



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

            <Photo uri='' />

        </S.Container>
    )
}