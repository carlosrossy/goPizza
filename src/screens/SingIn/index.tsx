import React from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import * as S from './styles'

export function SingIn() {
    return (
        <S.Container>

            <Input
                placeholder='E-mail'
                type='secundary'
                autoCorrect={false}
                autoCapitalize='none'
            />
            <Input
                placeholder='Senha'
                type='secundary'
                secureTextEntry
            />

            <Button
                title='Entrar'
                type='secundary'
            />
        </S.Container>
    )
}