import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export class Home extends Component {
  render () {
    return (
      <View>
        <Text style={ styles.text }>Root</Text>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  text: {
    backgroundColor: 'red',
  },
})

export default Home
