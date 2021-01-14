import React, { Component } from "react";
import { connect } from "react-redux";

import { auth } from "../../store/actions";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Forms/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router";

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignUp: true,
  };
  capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  checkFormValidity = (element, inputId) => {
    let isValid = true;
    if (element.validation.required) {
      isValid = element.value.trim() !== "" && isValid;
      element.errorMsg = `Please enter a valid ${this.capitalize(inputId)}`;
    }
    if (element.validation.minLength) {
      isValid = element.value.length >= element.validation.minLength && isValid;
    }

    if (element.validation.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(element.value) && isValid;
    }

    return isValid;
  };

  inputChangedhandler = (e, inputId) => {
    const newLoginForm = {
      ...this.state.controls,
    };
    const newFormElement = { ...newLoginForm[inputId] };
    newFormElement.value = e.target.value;
    newFormElement.touched = true;
    newFormElement.valid = this.checkFormValidity(newFormElement, inputId);

    newLoginForm[inputId] = newFormElement;
    let formIsValid = true;
    for (let inputId in newLoginForm) {
      formIsValid = newLoginForm[inputId].valid && formIsValid;
    }
    this.setState({ controls: newLoginForm, formIsValid });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };
  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  render() {
    const formsElementsArray = [];

    for (let key in this.state.controls) {
      formsElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formsElementsArray.map((el) => {
      return (
        <Input
          changed={(e) => this.inputChangedhandler(e, el.id)}
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

    if (this.props.loading) {
      form = <Spinner />;
    }
    let errMsg = null;
    if (this.props.error) {
      const stringMsg = this.props.error.message.split("_").join(" ");
      errMsg = <p>{this.capitalize(stringMsg)}</p>;
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errMsg}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>

        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          {this.state.isSignUp ? "SWITCH TO LOGIN" : "SWITCH TO REGISTER"}{" "}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, pass, isSignUp) => dispatch(auth(email, pass, isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
