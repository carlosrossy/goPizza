import React, { useState } from 'react';
import { Platform } from 'react-native'
import * as S from './styles'
import * as ImagePicker from 'expo-image-picker'

import ButtonBack from '../../components/ButtonBack';
import Photo from '../../components/Photo';



export function Product() {
    const [image, setImage] = useState('');

    async function handlePickerImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4]
            });

            if (!result.canceled) {
                setImage(result.uri);
            }
        }
    }



    return (
        <S.Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

            <S.Header>
                <ButtonBack />

                <S.Title>Cadastrar</S.Title>

                <S.ButtonDelete>
                    <S.DeleteLabel>Deletar</S.DeleteLabel>
                </S.ButtonDelete>
            </S.Header>

            <S.Upload>

                <Photo uri={image} />

                <S.PickerImageButton
                    onPress={handlePickerImage}
                    title='Carregar'
                    type='secundary' />
            </S.Upload>


        </S.Container>
    )
}