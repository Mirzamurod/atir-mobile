import { createTheme } from '@rneui/themed'
import { ColorSchemeName } from 'react-native'

const theme = (colorScheme: ColorSchemeName) =>
  createTheme({
    mode: colorScheme as 'dark' | 'light',
    components: {
      Header: (props, theme) => ({
        backgroundColor: theme.colors.background,
        containerStyle: { borderBottomWidth: 0 },
      }),
      Button: { type: 'outline', radius: 'sm' },
    },
  })

export default theme
