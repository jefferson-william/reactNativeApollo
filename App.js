import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { MY_IP } from 'react-native-dotenv'
import { Platform, StyleSheet } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { withClientState } from 'apollo-link-state'
import Root from './src/pages/Root'
import Main from './src/pages/Main'

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
    new HttpLink({ uri: Platform.OS === 'ios' ? 'http://localhost:3333/graphql' : `http://${ MY_IP }:3333/graphql` })
  ])
})

// make client to rewrite the defaults every time the store resets
client.onResetStore(stateLink.writeDefaults)

export const App = () => {
  return (
    <ApolloProvider client={ client } style={ styles.container }>
      <Root />
      <Main />
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#e2e2e2',
    paddingTop: Platform.OS === 'ios' ? '20' : '0',
  },
  text: {
    backgroundColor: '#555',
  }
})

const stackNavigator = createStackNavigator({
  Home: Root,
  About: Main,
});

export default { stackNavigator }
