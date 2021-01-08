import React, { Component } from "react";
import { Route, Switch } from "react-router";

import Auth from "./containers/Auth/Auth";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import ContactData from "./containers/Checkout/ContactData/ContactData";
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
            <Route path="/auth" exact component={Auth} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/checkout/contact-data" component={ContactData} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
