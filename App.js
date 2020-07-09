import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './navigation';

export default class App extends React.Component {

  render(){
    
    return (
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    );
  }
}
