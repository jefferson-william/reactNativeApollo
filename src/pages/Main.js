import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export class Main extends Component {
  static navigationOptions = {
    title: 'Main',
  }
  render () {
    const { data } = this.props

    return (
      <View>
        { data.loading
          ? <Text style={ styles.text }>Loading...</Text>
          : data.allUsers.map((item) => {
            return (
              <Text key={ item.id } style={ styles.text }>#{ item.id } - { item.username }</Text>
            )
          })
        }
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  text: {
    backgroundColor: 'yellow',
  },
})


export const QUERY = gql`
query {
  allUsers {
    id
    username
    email
    posts {
      id
      title
      slug
      content
    }
  }
}
`

export default graphql(QUERY)(Main)
