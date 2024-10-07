import React, { FC, Fragment, ReactNode, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@rneui/themed'
import GuestGuard from '@/components/auth/GuestGuard'
import AuthGuard from '@/components/auth/AuthGuard'
import Loading from '@/components/Loading'
import { TScreenWrapper } from '@/types/screenWrapper'

type GuardProps = {
  authGuard?: boolean
  guestGuard?: boolean
  children: ReactNode
}

const Guard = ({ children, authGuard = false, guestGuard = false }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Loading />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <Fragment>{children}</Fragment>
  } else {
    return <AuthGuard fallback={<Loading />}>{children}</AuthGuard>
  }
}

const ScreenWrapper: FC<TScreenWrapper> = props => {
  const {
    children,
    authGuard = false,
    guestGuard = false,
    safeAreaView = true,
    stackSreen,
    style,
  } = props
  const { theme } = useTheme()
  const [visible, setVisible] = useState(false)

  const SafeArea = ({ children }: { children: ReactNode }) => {
    return safeAreaView && !stackSreen ? (
      <SafeAreaView style={[{ flex: 1, backgroundColor: theme.colors.background }, style]}>
        {children}
      </SafeAreaView>
    ) : (
      <View style={[{ flex: 1, backgroundColor: theme.colors.background }, style]}>{children}</View>
    )
  }

  return (
    <SafeArea>
      {stackSreen}
      <Guard authGuard={authGuard} guestGuard={guestGuard}>
        <View>{children}</View>
      </Guard>
    </SafeArea>
  )
}

export default ScreenWrapper

const styles = StyleSheet.create({})
