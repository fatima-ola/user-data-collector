import React from "react";
import "./App.css";
// import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
// import Tutorial from "./pages/Tutorial";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      {/* <Home /> */}
      <Welcome />
      {/* <Tutorial /> */}
    </Provider>
  );
}

export default App;
