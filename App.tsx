import React from 'react';
import { useFonts, DMSans_400Regular } from "@expo-google-fonts/dm-sans"
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display"
import { StatusBar } from 'expo-status-bar'
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from "styled-components/native"

import theme from './src/global/theme/theme';
import { AuthProvider } from './src/hooks/auth';
import { Routes } from './src/routes';


export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='light' translucent backgroundColor='transparent' />

      <AuthProvider>
        <Routes />
      </AuthProvider>

    </ThemeProvider>
  );
}
