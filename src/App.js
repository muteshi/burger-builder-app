import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router";

import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import ContactData from "./containers/Checkout/ContactData/ContactData";
import Orders from "./containers/Orders/Orders";
import Layout from "./hoc/Layout/Layout";
import { authCheckState } from "./store/actions";

class App extends Component {
  state = {};
  componentDidMount() {
    this.props.onSignUp();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" exact component={Orders} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/checkout/contact-data" component={ContactData} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: () => dispatch(authCheckState()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
