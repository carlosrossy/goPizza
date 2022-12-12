import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native'

import BrandImg from '../../assets/brand.png'

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import * as S from './styles'

export function SingIn() {
    return (
        <S.Container>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

                <S.Content>

                    <S.Brand source={BrandImg} />

                    <S.Title>Login</S.Title>

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

                    <S.ForgotPasswordButton>
                        <S.ForgotPasswordLabel>Esqueci minha senha</S.ForgotPasswordLabel>
                    </S.ForgotPasswordButton>

                    <Button
                        title='Entrar'
                        type='secundary'
                    />
                </S.Content>

            </KeyboardAvoidingView>

        </S.Container>
    )
}