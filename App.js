import React, { Component } from "react";
// redux
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
import { PersistGate } from "redux-persist/es/integration/react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

// import Loading from './screens/Loading';
// import SignUp from './screens/SignUp';
// import Login from './screens/Login';
// import Main from './screens/main';


const { persistor, store } = ConfigureStore();

import { getAppInfo } from "react-native/Libraries/LogBox/Data/LogBoxData";
import Main from "./components/MainComponent";
// import * as firebase from "firebase";
// import { firebaseConfig } from "./config/config";

// firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
      // <AppF/>
    );
  }
}
// const AppF = SwitchNavigator(
//   {
//     Loading,
//     SignUp,
//     Login,
//     Main
//   },
//   {
//     initialRouteName: 'Loading'
//   }
// )
export default App;


