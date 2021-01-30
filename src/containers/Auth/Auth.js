import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { auth, setAuthRedirectPath } from "../../store/actions";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Forms/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router";
import { capitalize, checkFormValidity } from "../../utility/utility";

const Auth = ({
  onSetAuthRedirectPath,
  buildingBurger,
  authRedirectPath,
  ...props
}) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your email address",
      },
      value: "",
      errorMsg: "",
      valid: false,
      touched: false,
      validation: {
        required: true,
        isEmail: true,
      },
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your password",
      },
      value: "",
      errorMsg: "",
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 7,
      },
    },
  });

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [onSetAuthRedirectPath, buildingBurger, authRedirectPath]);

  const inputChangedhandler = (e, inputId) => {
    const newLoginForm = {
      ...controls,
    };
    const newFormElement = { ...newLoginForm[inputId] };
    newFormElement.value = e.target.value;
    newFormElement.touched = true;
    newFormElement.valid = checkFormValidity(newFormElement, inputId);

    newLoginForm[inputId] = newFormElement;
    let formIsValid = true;
    for (let inputId in newLoginForm) {
      formIsValid = newLoginForm[inputId].valid && formIsValid;
    }
    setControls(newLoginForm);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };
  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const formsElementsArray = [];

  for (let key in controls) {
    formsElementsArray.push({
      id: key,
      config: controls[key],
    });
  }
  let form = formsElementsArray.map((el) => {
    return (
      <Input
        changed={(e) => inputChangedhandler(e, el.id)}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        shouldValidate={el.config.validation}
        errorMsg={el.config.errorMsg}
        key={el.id}
        touched={el.config.touched}
        invalid={!el.config.valid}
        value={el.config.value}
      />
    );
  });

  if (props.loading) {
    form = <Spinner />;
  }
  let errMsg = null;
  if (props.error) {
    const stringMsg = props.error.message.split("_").join(" ");
    errMsg = <p>{capitalize(stringMsg)}</p>;
  }
  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errMsg}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>

      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        {isSignUp ? "SWITCH TO LOGIN" : "SWITCH TO REGISTER"}{" "}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.burgerBuilding,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, pass, isSignUp) => dispatch(auth(email, pass, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
