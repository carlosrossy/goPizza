import React, { useState } from 'react';
import { Alert, Platform, ScrollView } from 'react-native'
import * as S from './styles'
import * as ImagePicker from 'expo-image-picker'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import { useNavigation, useRoute } from '@react-navigation/native'
import { ProductNavigationProps } from '../../@Types/navigation';

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

    const route = useRoute();
    const { id } = route.params as ProductNavigationProps;
    console.log('ID PRODUCT', id)

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

    async function handleAdd() {
        if (!name.trim()) {
            return Alert.alert('Cadastro', 'Informe o nome da Pizza.')

        }

        if (!description.trim()) {
            return Alert.alert('Cadastro', 'Informe a descrição da Pizza.')

        }

        if (!image) {
            return Alert.alert('Cadastro', 'Selecione a imagem da Pizza.')

        }

        if (!priceSizeP || !priceSizeM || !priceSizeG) {
            return Alert.alert('Cadastro', 'Informe o preço de todos os tamanhos de Pizza.')
        }

        setIsLoading(true);

        const fileName = new Date().getTime();
        const reference = storage().ref(`/pizzas/${fileName}.png`)

        await reference.putFile(image)
        const photo_url = await reference.getDownloadURL();

        firestore()
            .collection('pizzas')
            .add({
                name,
                name_insensitive: name.toLowerCase().trim(),
                description,
                prices_sizes: {
                    p: priceSizeP,
                    m: priceSizeM,
                    g: priceSizeG
                },
                photo_url,
                photo_path: reference.fullPath
            })
            .then(() => Alert.alert('Cadastro', 'pizza cadastrada com sucesso'))
            .catch(() => Alert.alert('Cadastro', 'Não foi possivel cadastrar sua pizza.'))

        setIsLoading(false)
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

                    <Button title='Cadastrar pizza' isLoading={isLoading} onPress={handleAdd} />
                </S.Form>

            </ScrollView>
        </S.Container>
    )
}