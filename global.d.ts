import type { ReactElement, ReactNode } from 'react'

declare module 'react' {
  export interface FunctionComponent<P = {}> {
    authGuard?: boolean
    guestGuard?: boolean
    getLayout?: (page: ReactElement) => ReactNode
  }
}
