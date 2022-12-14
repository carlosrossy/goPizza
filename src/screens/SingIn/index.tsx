import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native'

import BrandImg from '../../assets/brand.png'

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import * as S from './styles'

export function SingIn() {
    const { SingIn, islogin, forgotPassword } = useAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSingIn() {
        SingIn(email, password);
    }

    function handleForgotPassword() {
        forgotPassword(email);
    }

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
                        onChangeText={setEmail}
                    />
                    <Input
                        placeholder='Senha'
                        type='secundary'
                        secureTextEntry
                        onChangeText={setPassword}
                    />

                    <S.ForgotPasswordButton onPress={handleForgotPassword}>
                        <S.ForgotPasswordLabel>Esqueci minha senha</S.ForgotPasswordLabel>
                    </S.ForgotPasswordButton>

                    <Button
                        title='Entrar'
                        type='secundary'
                        onPress={handleSingIn}
                        isLoading={islogin}
                    />
                </S.Content>

            </KeyboardAvoidingView>

        </S.Container>
    )
}