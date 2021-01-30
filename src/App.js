import React, { Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Logout from "./containers/Auth/Logout/Logout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";
import { authCheckState } from "./store/actions";

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));

const App = ({ onSignUp, ...props }) => {
  useEffect(() => {
    onSignUp();
  }, [onSignUp]);

  let routes = (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );

  if (props.isAuthenticated) {
    routes = (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to={props.authRedirectPath} />
        </Switch>
      </Suspense>
    );
  }
  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: () => dispatch(authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
