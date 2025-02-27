import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { TPerfume } from '@/types/middleware'
import { deleteUser } from './user/login'

const baseURL = process.env.BACKEND_URL

const middleware =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  (action: { type: string; payload: TPerfume }) => {
    if (action.type !== 'perfume') {
      next(action)
      return
    }

    next(action)

    const { url, method, params, data, onStart, onSuccess, onFail } = action.payload

    const token = SecureStore.getItemAsync('perfume_token')

    const headers = token ? { Authorization: `Bearer ${token}` } : null

    dispatch({ type: onStart })

    // @ts-ignore
    axios({
      baseURL:
        window?.location?.hostname === 'localhost'
          ? 'http://localhost:5000/api/'
          : 'http://206.189.109.20:9090/api/',
      method,
      data,
      url,
      params,
      headers,
    })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          dispatch({ type: onSuccess, payload: res.data })
          if (res.data.message) {
          }
          // toast({
          //   status: 'success',
          //   position: 'top-right',
          //   isClosable: true,
          //   variant: 'left-accent',
          //   title: i18n?.t(res.data?.message),
          // })
        } else dispatch({ type: onFail, payload: res })
      })
      .catch(error => {
        if (error?.response?.statusCode === 401) dispatch(deleteUser())
        else {
          const data = error?.response?.data
          if (data?.message) {
          }
          // toast({
          //   status: 'warning',
          //   position: 'top-right',
          //   isClosable: true,
          //   variant: 'left-accent',
          //   title: i18n?.t(data?.message),
          // })

          dispatch({ type: onFail, payload: error?.response?.data })
        }
      })
  }

export default middleware
