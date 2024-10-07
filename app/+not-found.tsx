import ScreenWrapper from '@/components/ScreenWrapper'
import { Header, Text } from '@rneui/themed'
import { Link, Stack } from 'expo-router'
import { StyleSheet, useColorScheme, View } from 'react-native'

export default function NotFoundScreen() {
  const colorScheme = useColorScheme()

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text>This screen doesn't exist.</Text>
        <Link href='/' style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
})
