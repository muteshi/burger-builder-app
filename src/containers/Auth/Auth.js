import React, { Component } from "react";

import Input from "../../components/UI/Forms/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";

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

  render() {
    const formsElementsArray = [];

    for (let key in this.state.controls) {
      formsElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    const form = formsElementsArray.map((el) => {
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
    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType="Success">LOGIN</Button>
        </form>
      </div>
    );
  }
}

export default Auth;