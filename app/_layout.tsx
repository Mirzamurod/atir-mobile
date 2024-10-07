import { ReactNode, useEffect } from 'react'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { ThemeProvider } from '@rneui/themed'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from '@/hooks/useColorScheme'
import theme from '@/constants/theme'
import { LanguageProvider } from '@/context/LanguageContext'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { AuthProvider } from '@/context/AuthContext'

import 'react-native-reanimated'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  const Layout = ({ children }: { children: ReactNode }) => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme(colorScheme)}>
          <AuthProvider>
            <LanguageProvider>
              <View style={{ flex: 1 }}>{children}</View>
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    )
  }

  return (
    <Layout>
      <StatusBar style='auto' />
      <Stack screenOptions={{ headerShown: false }} />
    </Layout>
  )
}

export default RootLayout
