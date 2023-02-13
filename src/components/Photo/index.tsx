import React from 'react';

import * as S from './styles'

type Props = {
    uri: string | null;
}

export default function Photo({ uri }: Props) {
    if (uri) {
        return <S.Image source={{ uri }} />;
    }

    return (
        <S.Placeholder >
            <S.PlaceholderTitle>Nenhuma Foto {'\n'} Carrega</S.PlaceholderTitle>
        </S.Placeholder>
    )
}