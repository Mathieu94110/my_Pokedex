import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Pokemon from "../../pages/pokemon";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={Pokemon} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
