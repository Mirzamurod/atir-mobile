import React, { useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import ScreenWrapper from '@/components/ScreenWrapper'
import { Button, Header, Icon, ListItem, Text, useTheme } from '@rneui/themed'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { useAppSelector } from '@/store'
import { i18n } from '@/context/LanguageContext'

const windowWidth = Dimensions.get('window')

const Main = () => {
  const { theme } = useTheme()
  const width = useSharedValue(windowWidth.width)
  const height = useSharedValue(windowWidth.height)
  const [isVisible, setIsVisible] = useState(false)
  const { user } = useAppSelector(state => state.login)

  console.log('windowWidth', windowWidth)
  console.log('width', width)
  console.log('height', height)

  const handlePress = () => {
    height.value = withSpring(height.value + 50)
  }

  return (
    <ScreenWrapper
      authGuard
      stackSreen={
        <Header
          leftComponent={<Icon name='menu' onPress={() => {}} />}
          centerComponent={<Text style={{ fontSize: 22 }}>{i18n.t('dashboard')}</Text>}
          rightComponent={<Icon name='user' type='feather' onPress={() => console.log('hello')} />}
        />
      }
    >
      <Text>Hello Test App</Text>
    </ScreenWrapper>
  )
}

export default Main

const styles = StyleSheet.create({ animatedView: { position: 'absolute', top: 0, zIndex: 2 } })
