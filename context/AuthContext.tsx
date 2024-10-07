import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { UserDataType } from '@/types/user'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/store'
import { getUserData } from '@/store/user/login'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IAuthValuesType {
  loading: boolean
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType) => void
}

const defaultProvider: IAuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider: FC<Props> = ({ children }) => {
  // Dispatch
  const dispatch = useDispatch<AppDispatch>()
  // const toast = useToast()
  // const { t } = useTranslation()

  // Selector
  const { token } = useAppSelector(state => state.login)

  // States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // Hooks
  const router = useRouter()

  // const config: UseToastOptions = {
  //   status: 'success',
  //   position: 'top-right',
  //   isClosable: true,
  //   variant: 'left-accent',
  // }

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      let tokenLocal = await AsyncStorage.getItem('perfume')
      if (token || tokenLocal) {
        setLoading(true)
        await axios({
          baseURL: `${
            window?.location?.hostname === 'localhost'
              ? 'http://localhost:5000/api/'
              : 'http://206.189.109.20:9090/api/'
          }users/profile`,
          headers: { Authorization: 'Bearer ' + tokenLocal },
        })
          .then(res => {
            setLoading(false)
            dispatch(getUserData(res.data.data))
            if (res.data.message) {
              // toast({ ...config, title: t(res.data?.message) })
            }
          })
          .catch(async error => {
            const data = error?.response?.data
            if (data?.message) {
              // toast({ ...config, title: t(data?.message) })
            }
            // await SecureStore.deleteItemAsync('perfume')
            await AsyncStorage.removeItem('perfume')
            setLoading(false)
            // if (!router.pathname.includes('login')) router.replace('/login')
          })
      } else setLoading(false)
    }

    initAuth()
  }, [token])

  const values = { user, loading, setUser, setLoading }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
