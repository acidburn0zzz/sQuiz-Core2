import useHomeSocket from '@Src/utils/hooks/homeSocket';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { RecoilRoot, useSetRecoilState } from 'recoil';

import { CenterContainer } from './src/components/Containers';
import Theme from './src/constant/theme';
import userState, { User } from './src/global/userState';
import HomeStack from './src/navigation/HomeStack';
import { Linking } from './src/navigation/Linking';
import loadFonts from './src/utils/fonts';
import { getFromStore, StorageEnum } from './src/utils/storage';

registerRootComponent(App);

function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  async function loadResources() {
    await loadFonts();
    setFontLoaded(true);
  }

  useEffect(function mount() {
    if (Platform.OS !== 'web') {
      loadResources();
    }
  }, []);

  return (
    <>
      <RecoilRoot>
        {Platform.OS !== 'web' && !fontLoaded ? <ActivityIndicator /> : <AppWithProviders />}
      </RecoilRoot>
      <StatusBar
        // eslint-disable-next-line react/style-prop-object
        style="light"
      />
    </>
  );
}

function AppWithProviders() {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);
  useHomeSocket();

  useEffect(function mount() {
    getUser();
  }, []);

  async function getUser() {
    const user = await getFromStore<User>(StorageEnum.User);
    if (user) {
      setUser(user);
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <CenterContainer style={{ backgroundColor: '#212843' }}>
        <ActivityIndicator />
      </CenterContainer>
    );
  } else {
    return (
      <NavigationContainer linking={Linking} theme={Theme}>
        <HomeStack />
      </NavigationContainer>
    );
  }
}
