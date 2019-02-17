/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native'
import { createAppContainer } from 'react-navigation'
import App from './App'
import { name as appName } from './app.json'

const AppContainer = createAppContainer(App.stackNavigator)

AppRegistry.registerComponent(appName, () => AppContainer)
