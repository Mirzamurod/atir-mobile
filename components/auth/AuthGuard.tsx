import { Fragment, ReactElement, ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Stack, useRouter } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import { RootState } from '@/store'
import { Text } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactElement
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  const { user } = useSelector((state: RootState) => state.login)
  // console.log(user)

  useEffect(() => {
    if (!router) {
      return
    }

    const checkUser = async () => {
      const storedToken = await AsyncStorage.getItem('perfume')

      if (!user && !storedToken) {
        // if (router) {
        // } else {
        // }
        router.replace('/login')
      }
    }

    checkUser()
  }, [router])

  if (auth.loading || user === null) {
    return (
      fallback || (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading with Auth...</Text>
        </View>
      )
    )
  }

  if (user && user.block) router.replace('/payment')

  return (
    <Fragment>
      <Stack.Screen options={{ headerShown: false }} />
      {children}
    </Fragment>
  )
}

export default AuthGuard
