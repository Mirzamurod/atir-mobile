// React Import
import { FC, Fragment, ReactElement, ReactNode, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Stack, useRouter } from 'expo-router'
import { Text } from '@rneui/themed'

interface GuestGuard {
  children: ReactNode
  fallback?: ReactElement
}

const GuestGuard: FC<GuestGuard> = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  // const { user } = useSelector((state: RootState) => state.login)

  useEffect(() => {
    if (!router) {
      return
    }

    // if (window.localStorage.getItem('token')) {
    //   router.replace('/')
    // }
  }, [router])

  if (auth.loading || (!auth.loading && auth.user !== null)) {
    // if (auth.loading) {
    return fallback ?? <Text>Loading as Guest...</Text>
  }

  return (
    <Fragment>
      <Stack.Screen options={{ headerShown: false }} />
      {children}
    </Fragment>
  )
}

export default GuestGuard
