import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { withClientState } from 'apollo-link-state'

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  defaults: {
    testing: {
      __typename: 'testing',
      name: '',
      age: 0
    }
  }
})

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    new HttpLink({ uri: 'http://localhost:3333/graphql' })
  ])
})

// make client to rewrite the defaults every time the store resets
client.onResetStore(stateLink.writeDefaults)

export default App = () => {
  return (
    <ApolloProvider client={ client }>
      <View style={ styles.container }>
        <Text style={ styles.text }>Hi!</Text>
      </View>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#e2e2e2',
  },
  text: {
    backgroundColor: '#555',
  }
})
