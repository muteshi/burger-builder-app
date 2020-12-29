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
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "input",
          placeholder: "Street name",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "input",
          placeholder: "Your country name",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
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
        value: "",
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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

  inputChangedhandler = (e, inputId) => {
    const newOrderForm = {
      ...this.state.orderForm,
    };
    const newFormElement = { ...newOrderForm[inputId] };
    newFormElement.value = e.target.value;
    newOrderForm[inputId] = newFormElement;
    this.setState({ orderForm: newOrderForm });
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
      <form>
        {formsElementsArray.map((el) => {
          return (
            <Input
              changed={(e) => this.inputChangedhandler(e, el.id)}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              key={el.id}
              value={el.config.value}
            />
          );
        })}

        <Button btnType="Success" clicked={this.orderHandler}>
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
