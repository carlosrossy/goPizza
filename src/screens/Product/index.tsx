import React, { useState } from 'react';
import { Platform, ScrollView } from 'react-native'
import * as S from './styles'
import * as ImagePicker from 'expo-image-picker'

import ButtonBack from '../../components/ButtonBack';
import Photo from '../../components/Photo';
import InputPrice from '../../components/InputPrice';
import Input from '../../components/Input';
import { Button } from '../../components/Button';



export function Product() {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priceSizeP, setPriceSizeP] = useState('');
    const [priceSizeM, setPriceSizeM] = useState('');
    const [priceSizeG, setPriceSizeG] = useState('');
    const [isLoading, setIsLoading] = useState(false);


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
            <ScrollView showsVerticalScrollIndicator={false}>
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

                <S.Form>

                    <S.InputGroup>
                        <S.Label>Nome</S.Label>

                        <Input
                            onChangeText={setName}
                            value={name}
                        />

                    </S.InputGroup>

                    <S.InputGroup>
                        <S.InputGroupHeader>
                            <S.Label>Descrição</S.Label>
                            <S.MaxCharacteres>0 de 60 Characteres</S.MaxCharacteres>
                        </S.InputGroupHeader>

                        <Input
                            multiline
                            maxLength={60}
                            style={{ height: 80 }}
                            onChangeText={setDescription}
                            value={description}
                        />
                    </S.InputGroup>

                    <S.InputGroup>
                        <S.Label>Tamanhos e Preços</S.Label>

                        <InputPrice
                            size='P'
                            onChangeText={setPriceSizeP}
                            value={priceSizeP}
                        />
                        <InputPrice
                            size='M'
                            onChangeText={setPriceSizeM}
                            value={priceSizeM}
                        />
                        <InputPrice
                            size='G'
                            onChangeText={setPriceSizeG}
                            value={priceSizeG}
                        />
                    </S.InputGroup>

                    <Button title='Cadastrar pizza' isLoading={isLoading} />
                </S.Form>

            </ScrollView>
        </S.Container>
    )
}