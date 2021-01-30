import React, { useState } from "react";

import Aux from "./Auxilliary/Auxilliary";
import classes from "./Layout.module.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import { connect } from "react-redux";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerToggledHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  return (
    <Aux>
      <Toolbar
        drawerToggled={sideDrawerToggledHandler}
        isAuth={props.isAuthenticated}
      />
      <SideDrawer
        closed={sideDrawerClosedHandler}
        isAuth={props.isAuthenticated}
        open={showSideDrawer}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
