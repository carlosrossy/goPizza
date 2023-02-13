import styled from 'styled-components/native';

//teste

export const Container = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.COLORS.PRIMARY_100};
`;