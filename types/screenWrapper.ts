import { ReactNode } from 'react'
import { ViewStyle } from 'react-native'

export type TScreenWrapper = {
  /**
   * default false
   */
  authGuard?: boolean
  /**
   * default false
   */
  guestGuard?: boolean
  children: ReactNode
  /**
   * default true
   */
  safeAreaView?: boolean
  /**
   * default headerShown = false
   */
  stackSreen?: ReactNode
  style?: ViewStyle
}
