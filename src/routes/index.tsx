import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { UserStackRoute } from './user.stack.routes'

export function Routes() {
    return (
        <NavigationContainer>
            <UserStackRoute />
        </NavigationContainer>
    )
}