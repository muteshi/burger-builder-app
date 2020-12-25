import React, { Component } from "react";
import { Route, Switch } from "react-router";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Layout from "./hoc/Layout/Layout";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" exact component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
