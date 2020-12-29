import React, { Component } from "react";

import axiosIntance from "../../../axiosOrders";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Forms/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "input",
          placeholder: "Your name",
        },
        value: "",
        errorMsg: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 5,
          maxLength: 100,
        },
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "input",
          placeholder: "Street name",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: false,
        },
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "input",
          placeholder: "Your country name",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: false,
        },
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        errorMsg: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest",
            },
            {
              value: "cheapest",
              displayValue: "Cheapest",
            },
          ],
        },
        validation: {},
        value: "",
        valid: true,
      },
    },
    loading: false,
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      ordeData: formData,
    };
    axiosIntance
      .post("orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
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
    if (element.validation.maxLength) {
      isValid = element.value.length <= element.validation.maxLength && isValid;
    }
    return isValid;
  };

  inputChangedhandler = (e, inputId) => {
    const newOrderForm = {
      ...this.state.orderForm,
    };
    const newFormElement = { ...newOrderForm[inputId] };
    newFormElement.value = e.target.value;
    newFormElement.touched = true;
    newFormElement.valid = this.checkFormValidity(newFormElement, inputId);

    newOrderForm[inputId] = newFormElement;
    let formIsValid = true;
    for (let inputId in newOrderForm) {
      formIsValid = newOrderForm[inputId].valid && formIsValid;
    }
    this.setState({ orderForm: newOrderForm, formIsValid });
  };

  render() {
    const formsElementsArray = [];

    for (let key in this.state.orderForm) {
      formsElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formsElementsArray.map((el) => {
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
        })}

        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>

        {form}
      </div>
    );
  }
}

export default ContactData;
