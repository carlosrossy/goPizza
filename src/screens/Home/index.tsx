import React, { useEffect, useState } from 'react';
import * as S from './styles'
import { useTheme } from 'styled-components/native'

import firestore from '@react-native-firebase/firestore'

import { MaterialIcons } from '@expo/vector-icons'
import HappyEmoji from '../../assets/happy.png'
import Search from '../../components/Search';
import ProductCard, { ProductProps } from '../../components/ProductCard';
import { Alert, FlatList } from 'react-native';

export default function Home() {
    const [pizzas, setPizzas] = useState<ProductProps[]>([]);
    const [search, setSearch] = useState('');
    const { COLORS } = useTheme();

    function fetchPizzas(value: string) {
        const formattedValue = value.toLocaleLowerCase().trim();

        firestore()
            .collection('pizzas')
            .orderBy('name_insensitive')
            .startAt(formattedValue)
            .endAt(`${formattedValue}\uf8ff`)
            .get()
            .then(response => {
                const data = response.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    }
                }) as ProductProps[];

                setPizzas(data);
            })
            .catch(() => Alert.alert('Consulta', 'Não foi possivel realizar a consulta'))

    }

    function handleSearch() {
        fetchPizzas(search);
    }

    function handleSearchClear() {
        setSearch('');
        fetchPizzas('');
    }

    useEffect(() => {
        fetchPizzas('');
    }, []);

    return (
        <S.Container>
            <S.Header>
                <S.Greeting>
                    <S.GreetingEmoji source={HappyEmoji} />
                    <S.GreetingText>Olá, Admin</S.GreetingText>
                </S.Greeting>

                <S.SingOut>
                    <MaterialIcons name='logout' color={COLORS.TITLE} size={24} />
                </S.SingOut>
            </S.Header>

            <Search
                onChangeText={setSearch}
                value={search}
                onClear={handleSearchClear}
                onSearch={handleSearch}
            />

            <S.MenuHeader>
                <S.Title>Cardápio</S.Title>
                <S.MenuItemsNumber>10 pizzas</S.MenuItemsNumber>
            </S.MenuHeader>

            <FlatList
                data={pizzas}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ProductCard data={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 125,
                    marginHorizontal: 24,
                }}
            />

        </S.Container>

    )
}