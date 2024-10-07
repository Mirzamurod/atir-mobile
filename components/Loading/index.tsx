import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@rneui/themed'

const Loading = () => {
  return (
    <View style={styles.loadingText}>
      <Text>Loading...</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  loadingText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
