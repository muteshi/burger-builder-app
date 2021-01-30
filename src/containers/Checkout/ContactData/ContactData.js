import React, { useState } from "react";

import axiosIntance from "../../../axiosOrders";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Forms/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { purchaseBurger } from "../../../store/actions";
import { checkFormValidity } from "../../../utility/utility";

const ContactData = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [orderForm, setOrderForm] = useState({
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
      value: "fastest",
      valid: true,
    },
  });

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementId in orderForm) {
      formData[formElementId] = orderForm[formElementId].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      ordeData: formData,
      userId: props.userId,
    };
    props.onOrderBurger(order, props.token);
  };

  const inputChangedhandler = (e, inputId) => {
    const newOrderForm = {
      ...orderForm,
    };
    const newFormElement = { ...newOrderForm[inputId] };
    newFormElement.value = e.target.value;
    newFormElement.touched = true;
    newFormElement.valid = checkFormValidity(newFormElement, inputId);

    newOrderForm[inputId] = newFormElement;
    let formIsValid = true;
    for (let inputId in newOrderForm) {
      formIsValid = newOrderForm[inputId].valid && formIsValid;
    }
    setOrderForm(newOrderForm);
    setFormIsValid(formIsValid);
  };

  const formsElementsArray = [];

  for (let key in orderForm) {
    formsElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formsElementsArray.map((el) => {
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
      })}

      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>

      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axiosIntance));
